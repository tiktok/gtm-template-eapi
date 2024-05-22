/*
 * Copyright 2022 ByteDance Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const getAllEventData = require("getAllEventData");
const sendHttpRequest = require("sendHttpRequest");
const JSON = require("JSON");
const logToConsole = require("logToConsole");
const sha256Sync = require("sha256Sync");
const parseUrl = require("parseUrl");
const decodeUriComponent = require("decodeUriComponent");
const getCookieValues = require("getCookieValues");
const setCookie = require("setCookie");
const makeNumber = require("makeNumber");
const getContainerVersion = require('getContainerVersion');
const getRequestHeader = require('getRequestHeader');
const getTimestampMillis = require("getTimestampMillis");
const Math = require("Math");

const gtmVersion = "s2s_0_2_01";
const eventData = getAllEventData();

const isLoggingEnabled = determinateIsLoggingEnabled();
const traceId = isLoggingEnabled ? getRequestHeader('trace-id') : undefined;

const TTEventMap = {
  'add_payment_info': 'AddPaymentInfo',
  'add_to_cart': 'AddToCart',
  'add_to_wishlist': 'AddToWishlist',
  'begin_checkout': 'InitiateCheckout',
  'page_view': 'Pageview',
  'purchase': 'CompletePayment',
  'search': 'Search',
  'sign_up': 'CompleteRegistration',
  'view_item': 'ViewContent',
};

function isHashed(val) {
  return val && val.match("^[A-Fa-f0-9]{64}$") != null;
}

function hash(val, lowerCase) {
  if (!val) {
    return undefined;
  }

  if (isHashed(val)) {
    return val;
  }

  if (lowerCase) {
    val = val.toLowerCase();
  }

  val = val.trim();
  if (!val) {
    return undefined;
  }

  return sha256Sync(val, { outputEncoding: 'hex' });
}

function getTtclidFromUrl() {
  const locationData = getDataFromUrl(eventData.page_location);
  if (locationData.ttclid) {
    return decodeUriComponent(locationData.ttclid);
  }

  const referrerData = getDataFromUrl(eventData.page_referrer);
  if (referrerData.ttclid && referrerData.hostname === locationData.hostname) {
    return decodeUriComponent(referrerData.ttclid);
  }
  return null;
}

function getDataFromUrl(url) {
  const result = {};
  if (!url) {
    return result;
  }

  const parsed = parseUrl(url);
  if (!parsed) {
    return result;
  }

  if (parsed.searchParams && parsed.searchParams.ttclid) {
    result.ttclid = parsed.searchParams.ttclid;
  }
  result.hostname = parsed.hostname;
  return result;
}

function getTtclidCookie() {
  return getCookieValues("ttclid")[0];
}

function setTtclidCookie(cookie) {
  if (cookie) {
    setCookie("ttclid", cookie, {
      domain: "auto",
      httpOnly: false,
      "max-age": 2592000, // 30 days
      path: "/",
      secure: true,
      samesite: "none",
    });
  }
}

function getTtpCookie() {
  return getCookieValues("_ttp")[0];
}

function getTtclid() {
  return (
    getTtclidFromUrl() || getTtclidCookie() || data.ttclid || eventData.ttclid
  );
}

function getTtp() {
  return getTtpCookie();
}

function makeGAContent(item) {
  const price = makeNumber(item.price);
  const quantity = makeNumber(item.quantity || 1);
  const category = item.item_category || item.item_category1 || item.item_category2;

  const content = {};
  content.content_type = eventData.tt_content_type || 'product';

  if (item.item_id) content.content_id = item.item_id;
  if (item.item_name) content.content_name = item.item_name;
  if (price) content.price = price;
  if (quantity) content.quantity = quantity;
  if (category) content.content_category = category;
  if (item.item_brand) content.brand = item.item_brand;

  return content;
}

function _getGaContents(items) {
  // Standard Ecommerce: https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm
  // Enhanced Ecommerce: https://developers.google.com/analytics/devguides/collection/ua/gtm/enhanced-ecommerce#details
  // Both formats are normalized by the server-side "GA4 Client" or "UA Client"
  if (!items) {
    return undefined;
  }

  const contents = [];
  for (const item of items) {
    const content = makeGAContent(item);
    if (content) {
      contents.push(content);
    }
  }
  return contents;
}

function makeDataContent(data) {
  const price = makeNumber(data.price);
  const quantity = makeNumber(data.quantity || 1);
  const content = {};
  content.content_type = eventData.tt_content_type || data.content_type || 'product';

  if (data.content_id) content.content_id = data.content_id;
  if (data.content_name) content.content_name = data.content_name;
  if (price) content.price = price;
  if (quantity) content.quantity = quantity;
  if (data.content_category) content.content_category = data.content_category;
  if (data.brand) content.brand = data.brand;

  return content;
}

function getContents(items) {
  const gaContents = _getGaContents(items);

  if (data.object_property_source == "ga") {
    return gaContents;
  }

  if (data.single_multi_product == "multiple") {
    // Note: JSON.parse returns undefined if the string is not valid.
    const contents = JSON.parse(data.contents);
    if (contents) {
      for (const c of contents) {
        if (!c.content_type) c.content_type = eventData.tt_content_type || 'product';
      }
      return contents;
    }
    return data.contents;
  }

  if (data.single_multi_product == "single") {
    const content = makeDataContent(data);
    return [content];
  }

  // Backup
  if (gaContents && gaContents.length > 0) {
    return gaContents;
  }

  return undefined;
}

function getValue(contents) {
  var val = makeNumber(data.value) || makeNumber(eventData.value);
  if (val) {
    return val;
  }

  if (contents && contents.length > 0) {
    var totalValue = 0;
    for (const content of contents) {
      if (content.price !== undefined && content.quantity !== undefined) {
        totalValue += content.price * content.quantity;
      }
    }
    return totalValue;
  }

  return undefined;
}

function getCurrency(items) {
  if (data.currency || eventData.currency) {
    return data.currency || eventData.currency;
  }

  if (items) {
    for (const item of items) {
      if (item && item.currency !== undefined) {
        return item.currency;
      }
    }
  }

  return undefined;
}

function getItems() {
  if (eventData.items) {
    return eventData.items;
  }

  if (eventData.tt_contents) {
    const contents = JSON.parse(eventData.tt_contents);
    if (contents) {
      return contents;
    }
  }

  return undefined;
}

function getBody(ttclid, ttp) {
  const _external_id = data.external_id || data.sha256_external_id || eventData.tt_external_id || eventData.user_id;
  const _phone = data.phone ||
    data.sha256_phone ||
    (eventData.user_data && (eventData.user_data.phone_number || eventData.user_data.sha256_phone_number));
  const _email = data.email ||
    data.sha256_email ||
    (eventData.user_data && (eventData.user_data.email_address || eventData.user_data.sha256_email_address)) ||
    eventData.email;
  const _ip = eventData.ip_override || eventData.ip;
  const _event = data.event || eventData.event_name;

  const body = {
    event_source: "web",
    partner_name: "GoogleTagManagerServer",
  };
  const bodyData = {
    event_time: Math.floor(getTimestampMillis() / 1000),
  };

  if (data.pixel_code) body.event_source_id = data.pixel_code;
  if (_event) bodyData.event = TTEventMap[_event] || _event;
  if (data.event_id || eventData.event_id) bodyData.event_id = data.event_id || eventData.event_id;
  if (data.test_event_code) body.test_event_code = data.test_event_code;

  const page = {};
  if (eventData.page_location) page.url = eventData.page_location;
  if (eventData.page_referrer) page.referrer = eventData.page_referrer;
  bodyData.page = page;

  const user = {};
  if (ttclid) user.ttclid = ttclid;
  if (_external_id) user.external_id = hash(_external_id, false);
  if (_phone) user.phone = hash(_phone, true);
  if (_email) user.email = hash(_email, true);
  if (ttp) user.ttp = ttp;
  if (_ip) user.ip = _ip;
  if (eventData.user_agent) user.user_agent = eventData.user_agent;
  bodyData.user = user;

  const device = {};
  if (eventData.client_hints) {
    const ch = eventData.client_hints;
    if (ch.architecture) device.architecture = ch.architecture;
    if (ch.bitness) device.bitness = ch.bitness;
    if (ch.full_version_list) device.browser_version_list = ch.full_version_list;
    if (ch.mobile != undefined) device.mobile = ch.mobile;
    if (ch.model) device.model = ch.model;
    if (ch.platform) device.platform = ch.platform;
    if (ch.platform_version) device.platform_version = ch.platform_version;
  }
  bodyData.device = device;

  const properties = {};
  const items = getItems();
  const contents = getContents(items);
  const currency = getCurrency(items);
  const value = getValue(contents);
  const description = data.description;
  const query = data.query || eventData.query || eventData.search_term;
  if (contents) properties.contents = contents;
  if (currency) properties.currency = currency;
  if (value) properties.value = value;
  if (description) properties.description = description;
  if (query) properties.query = query;
  // Additional Object Properties
  if (data.custom_properties && data.custom_properties.length > 0) {
    for (let i = 0; i < data.custom_properties.length; i++) {
      let objectParam = data.custom_properties[i];
      properties[objectParam.key] = objectParam.value;
    }
  }
  properties.gtm_version = gtmVersion;
  properties.event_trigger_source = 'GoogleTagManagerServer';
  bodyData.properties = properties;

  body.data = [bodyData];
  return body;
}

function send(accessToken, requestBody, onSuccess, onFailure) {
  const url = "https://business-api.tiktok.com/open_api/v1.3/event/track/";
  const headers = {
    "Content-Type": "application/json",
    "Access-Token": accessToken,
  };
  if (isLoggingEnabled) {
    logToConsole(
      JSON.stringify({
        Name: 'TikTok',
        Type: 'Request',
        TraceId: traceId,
        EventName: requestBody.event,
        RequestMethod: 'POST',
        RequestUrl: url,
        RequestBody: requestBody,
      })
    );
  }
  sendHttpRequest(
    url,
    (statusCode, headers, body) => {
      if (isLoggingEnabled) {
        logToConsole(
          JSON.stringify({
            Name: 'TikTok',
            Type: 'Response',
            TraceId: traceId,
            EventName: requestBody.event,
            ResponseStatusCode: statusCode,
            ResponseHeaders: headers,
            ResponseBody: body,
          })
        );
      }
      if (statusCode >= 200 && statusCode < 400) {
        onSuccess();
      } else {
        onFailure();
      }
    },
    {
      headers: headers,
      method: "POST",
    },
    JSON.stringify(requestBody)
  );
}

function main() {
  const ttclid = getTtclid();
  const ttp = getTtp();
  setTtclidCookie(ttclid);

  const body = getBody(ttclid, ttp);
  const accessToken = data.access_token;

  send(accessToken, body, data.gtmOnSuccess, data.gtmOnFailure);
}

main();

function determinateIsLoggingEnabled() {
  const containerVersion = getContainerVersion();
  const isDebug = !!(
    containerVersion &&
    (containerVersion.debugMode || containerVersion.previewMode)
  );

  if (!data.logType) {
    return isDebug;
  }

  if (data.logType === 'no') {
    return false;
  }

  if (data.logType === 'debug') {
    return isDebug;
  }

  return data.logType === 'always';
}
