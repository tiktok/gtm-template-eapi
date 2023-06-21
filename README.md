![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/f6054fb8-78f6-4ae4-8f56-ba5c1ffd69c5)
# gtm-template-eapi
# Pre-requisites
Before getting started, you should already have set up Google Tag Manager Server-side tagging. Specifically:
1. A tagging server
2. A frontend tag (gtag.js or Google Analytics 4) sending events to the tagging server
3. Triggers and variables configured in your server-side container.
If you haven't completed this setup, please refer to Google's server-side tagging instructions [here](https://developers.google.com/tag-platform/tag-manager/server-side).

# Setup
## 1. Install the Template
You can find our pixel from [Google Tag Manager Template Gallery](https://tagmanager.google.com/gallery/#/owners/tiktok/templates/gtm-template-pixel). Click "Add to workspace" to install it into your workspace.

## 2. Create Pixel & Events API Access Token
You'll need a Pixel ID and an API Access Token to use this template. To create these, follow the steps below: 
1. Go to TikTok Ads Manager
2. After logging in, hover over "Tools" on the navigation bar, and find "Management", then click on "Events"![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/f8e2e404-3416-4a41-9156-d7d01c87d604)

3. Click on "Web Events"
4. Click on "Setup Web Events", select "Events API", and click "Next"
5. Select "Manually Set Up Events API" and click "Next"
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/08897e84-3e9b-43e1-966c-3552954feabc)
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/cd662beb-fecc-4030-af56-5f498bbb41b0)

7. Click "Go to Settings" to return to the settings page of the Pixel you just created.
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/f89bce20-ee22-4e1e-8a22-171f16ac6777)

8. At the top, you will find your Pixel ID. Copy and save the Pixel ID
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/0e8941ca-2be9-4cae-8ec6-29ecb0c288a2)

9. Scroll down to click "Generate Access Token". Copy and save the token information shown
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/359a10b9-f5b4-4298-84d8-dcfbe888d068)
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/c84622bf-1c06-4f7a-b340-569069221d7f)

Now, you should have both your Pixel ID and Access Token. For example, they should look like the following:
- Pixel ID: IDCEV44IRC77UE3S4LF95G
- Access Token: 00c350fde1xxxxxxxxxxxxxxxxxxxxxxxx1991af

## 3. Use the Template
Back on Google Tag Manager, create a new Tag, then select the template you just created.
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/339804d9-a7d1-47bb-9d07-66660a1e8262)
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/2dea131e-e75a-4658-b449-1d5a7da6a6c5)

### 3.1 Event Configuration
1. Enter the Pixel ID and Access Token from the previous section.
(Note: You could also make these into Variables for easier reuse across tags. Click on the "+" sign beside each box to select from your Variables)
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/7469ded5-d8c7-4df7-8443-9096d5f1b70e)

2. Select an Event you'd like this tag to send. The Event should depend on what trigger you decide to associate with this tag. To learn more about TikTok's available event types, TikTok's Supported Pixel events, please visit our Business Help Center article [here](https://ads.tiktok.com/marketing_api/docs?rid=5ipocbxyw8v&id=1701890972233730)
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/30c2e5dc-5316-420b-b680-75d8cf0bf68d)

### 3.2 Advanced Matching
1. In the next section, you can configure sending Email, Phone, and External ID to TikTok. All Email, Phone, and External ID are hashed (with SHA256) before they're sent to TikTok in order to preserve anonymity.
It is IMPORTANT to fill out Advanced Matching as much as you can. Without it, TikTok cannot measure the effectiveness of your ads.
In the example below, two Variables defined by [Google Tag Manager](https://support.google.com/tagmanager/answer/7683056?hl=en) are used to fill out Email and Phone.
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/4a85bb7b-d043-42a5-88f9-599fb0251c59)

2. You can choose to send us the SHA256-encrypted information, or you can choose to send us the plain Email, Phone, and External ID. If you choose this option, we will hash it for you before sending it to TikTok.
  ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/ca4333eb-44a0-461b-9a6a-b930e526d996)


### 3.3 Product Info, Enhanced / Standard E-commerce
1. The following section is your product information. This is important if you're advertising a product sold on a site. Complete product information allows TikTok to do Shopping Ads, ROAS, and Value-based Optimization for you.
2. The easiest way to set this up is through Google Analytics Ecommerce Data Layers. Whether you're using gtag.js or GA4, Enhanced Ecommerce or Standard Ecommerce, as long as you're pushing product data to the datalayer, we can it pick up automatically.
(To learn more about Ecommerce Data Layers, see [Link1](https://developers.google.com/analytics/devguides/collection/ua/gtm/enhanced-ecommerce) [Link2](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#implementation) [Link3](https://support.google.com/tagmanager/answer/6107169?hl=en#standard-ecommerce))
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/e6b441b9-120d-4df4-9b14-bf8c5c740a50)

3. Alternatively, you can configure product data by filling them out manually. Select "Use Custom Data", and use your Variables to fill out the rest of the form.
Single Content: Associate this event with one product.
Multiple Contents: Associate this event with multiple products; the "contents" field must be filled with a JSON-encoded string of products.
Order Info Only: Only post back "value" and "currency" information to TikTok
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/7beea99e-de13-4fdc-8924-018ccdc8d0e3)


### 3.4 Deduplication
If you're also using the TikTok Pixel on your website, please configure Event ID to deduplicate web and server-to-server events. Learn more about Event Deduplication, visit our Business Help Center article [here](https://ads.tiktok.com/marketing_api/docs?rid=5ipocbxyw8v&id=1723170195197953).
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/b135f8e0-0128-454b-aa12-6d5b03dabe10)


### 3.5 Other Configurations
The tagging server will automatically fill in information in this section. Feel free to leave this section blank, unless you wish to override any field.
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/6eefe7cc-b78a-429e-bf0a-c0f42a8286de)


### 3.6 Choose a Trigger
Choose a GTM Trigger to associate with the tag, then click "Save".
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/881caf99-813e-4b65-a363-51b00858c280)


## 4. Test Server Tags
1. Click "Preview" to test out the new Tag. You may need to trigger it from your gtag.js or GA4 installation.
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/6d08bf8a-a559-4e4c-97b0-64db2b4a39a1)

2. After triggering a Tag created with the template, you can see the Events API call in the Console. Specifically, you should be able to see the API response body. When the response contains {"code": 0, "message": "OK"}, it means the request was sent successful.
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/89706eb6-d61b-4af8-967c-0b8a2615b15d)


## 5. Verify Setup
1. Get "Test Event Code" from Events Manager. Learn more instruction from this [article](https://ads.tiktok.com/marketing_api/docs?id=1739584863252481).
   Go to Events Manager, click on "Web Events", then click the pixel to view the pixel detail page. Click on "Test Events" Tab. Follow instructions to copy the test event code.
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/e355c126-6163-403a-8941-15f2ec64d671)
2. Fill in the "Test Event Code" field in the template. Then save the changes. ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/1cceb08c-8242-4e81-8d1f-a63883735631)
3. Repeat steps in section 4 "Test Server Tags" to trigger a test event.
4. In a few minutes, if you set up the server tag correctly, your event will be received from TikTok and displayed in "Test Events" Tab! Fix the event payload issues if necessary.
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/a07ac90f-2b91-456b-930c-65d04e23be79)






