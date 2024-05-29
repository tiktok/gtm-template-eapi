![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/8e1864d9-8af1-48a1-a33d-e6be99bb24ee)

# TikTok Events API Template


## About TikTok Events API
TikTok Events API is designed to give our advertisers a reliable connection between TikTok and advertiser marketing data (servers, website, app, or CRM) while also providing the flexibility for advertisers to customize the information they share with TikTok. Sharing these events with TikTok helps marketing teams measure ad performance on TikTok, optimize ad delivery, and create target audiences. [Learn more](https://ads.tiktok.com/help/article/events-api) about Events API.
<br><br>

## About Events API x GTM Integration
You can leverage Google Tag Manager's [server-side tagging](https://developers.google.com/tag-platform/tag-manager/server-side/intro) to send website events to TikTok through a server-to-server connection. This template parses events received by your tagging server, converts them to TikTok events and sends to TikTok Events API.
<br><br>

## Template Installation
### (Recommended) Install using Events Manager interactive setup flow
We recommend setting up Events API x GTM Integration using TikTok Events Manager's interactive setup flow. The interactive flow guides you in configuring the integration and automatically installs this template as well as all other necessary tags, triggers, and variables to help simply the integration. To get started, see our [developer document](https://business-api.tiktok.com/portal/docs?id=1799004052020225).

### Install from GTM Template Gallery
If you prefer to install the template and configure your integration manaully, you can find this template in [GTM Template Gallery](https://tagmanager.google.com/gallery/#/owners/tiktok/templates/gtm-template-eapi) and add it into your GTM workspace. Note that the template can only be applied to a Server container.

![image](https://github.com/tiktok/gtm-template-eapi/assets/143729589/437076fa-4b40-4f45-9f52-2a4b1e957cde)
<br><br>

## Set up TikTok Events
After installing the template, you will then configure the events and parameters you want to send to TikTok Events API. 
  * The template recognizes [Google Analytics 4 (GA4) standard events and schema](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm), and will convert those to TikTok events and send to Events API. Follow the developer document on [Set up TikTok events with GTM data layer](https://business-api.tiktok.com/portal/docs?id=1799004097478658) to complete the setup.
  * You can also use the <i>Parameter Override</i> section in this template to manually set up TikTok events/parameters or override specific events/parameters parsed from GA4 events. See the developer document on [Set up TikTok events manually](https://business-api.tiktok.com/portal/docs?id=1799004110681154).
<br><br>

## Verify Events API x GTM Integration
See <i>Verify TikTok Events API Setup</i> section in this [developer document](https://business-api.tiktok.com/portal/docs?id=1799004129683458). <br>
If you have any feature requests / issues, please file a issue in this [Github repository](https://github.com/tiktok/gtm-template-eapi/issues).
