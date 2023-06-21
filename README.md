![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/8e1864d9-8af1-48a1-a33d-e6be99bb24ee)

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
2. After logging in, hover over "Tools" on the navigation bar, and find "Management", then click on "Events" ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/a74e185a-3985-493d-9714-0101bad3ccce)


3. Click on "Web Events"
4. Click on "Setup Web Events", select "Events API", and click "Next"
5. Select "Manually Set Up Events API" and click "Next"
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/436588cf-0fb6-4b2c-a4db-c5a805ca5ea3)

   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/77fd0be9-2ea8-41e1-9da0-9455e28c9a68)


7. Click "Go to Settings" to return to the settings page of the Pixel you just created.
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/3e93a087-1ed7-44dc-9ea0-b0fbee533e07)


8. At the top, you will find your Pixel ID. Copy and save the Pixel ID
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/e29582a4-b4b9-4a23-a07f-fc4a893e7e13)


9. Scroll down to click "Generate Access Token". Copy and save the token information shown
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/32623af2-571d-40e0-9283-bf0a17849ab4)
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/433e5a95-db41-4e90-bd8c-6a793de47929)


Now, you should have both your Pixel ID and Access Token. For example, they should look like the following:
- Pixel ID: IDCEV44IRC77UE3S4LF95G
- Access Token: 00c350fde1xxxxxxxxxxxxxxxxxxxxxxxx1991af

## 3. Use the Template
Back on Google Tag Manager, create a new Tag, then select the template you just created.
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/d44b75a0-a8f3-4ca6-862b-d91d6a2956a4)
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/24c764d9-4eb7-4e8c-a4d6-0a5aa9fc5f05)


### 3.1 Event Configuration
1. Enter the Pixel ID and Access Token from the previous section.
(Note: You could also make these into Variables for easier reuse across tags. Click on the "+" sign beside each box to select from your Variables)
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/46bfba0c-b154-453c-b4b3-a69ef459fd93)


2. Select an Event you'd like this tag to send. The Event should depend on what trigger you decide to associate with this tag. To learn more about TikTok's available event types, TikTok's Supported Pixel events, please visit our Business Help Center article [here](https://ads.tiktok.com/marketing_api/docs?rid=5ipocbxyw8v&id=1701890972233730)
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/d52c0016-75b4-442c-995e-cf485273ef47)


### 3.2 Advanced Matching
1. In the next section, you can configure sending Email, Phone, and External ID to TikTok. All Email, Phone, and External ID are hashed (with SHA256) before they're sent to TikTok in order to preserve anonymity.
It is IMPORTANT to fill out Advanced Matching as much as you can. Without it, TikTok cannot measure the effectiveness of your ads.
In the example below, two Variables defined by [Google Tag Manager](https://support.google.com/tagmanager/answer/7683056?hl=en) are used to fill out Email and Phone.

![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/d3f1e49a-2d2e-4d43-a6ab-708c8dd046cb)


3. You can choose to send us the SHA256-encrypted information, or you can choose to send us the plain Email, Phone, and External ID. If you choose this option, we will hash it for you before sending it to TikTok.

  ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/df4e6984-f16a-4e5b-9db6-002797e563ca)



### 3.3 Product Info, Enhanced / Standard E-commerce
1. The following section is your product information. This is important if you're advertising a product sold on a site. Complete product information allows TikTok to do Shopping Ads, ROAS, and Value-based Optimization for you.
2. The easiest way to set this up is through Google Analytics Ecommerce Data Layers. Whether you're using gtag.js or GA4, Enhanced Ecommerce or Standard Ecommerce, as long as you're pushing product data to the datalayer, we can it pick up automatically.
(To learn more about Ecommerce Data Layers, see [Link1](https://developers.google.com/analytics/devguides/collection/ua/gtm/enhanced-ecommerce) [Link2](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#implementation) [Link3](https://support.google.com/tagmanager/answer/6107169?hl=en#standard-ecommerce))
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/aae28269-4a4d-4cdc-918f-ac022945d554)


3. Alternatively, you can configure product data by filling them out manually. Select "Use Custom Data", and use your Variables to fill out the rest of the form.
Single Content: Associate this event with one product.
Multiple Contents: Associate this event with multiple products; the "contents" field must be filled with a JSON-encoded string of products.
Order Info Only: Only post back "value" and "currency" information to TikTok
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/3cb0dbd1-f5c7-4822-b5bd-471211691a98)


### 3.4 Deduplication
If you're also using the TikTok Pixel on your website, please configure Event ID to deduplicate web and server-to-server events. Learn more about Event Deduplication, visit our Business Help Center article [here](https://ads.tiktok.com/marketing_api/docs?rid=5ipocbxyw8v&id=1723170195197953).
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/30b0583f-f505-4e48-83d7-3ddc3ab8e59c)



### 3.5 Other Configurations
The tagging server will automatically fill in information in this section. Feel free to leave this section blank, unless you wish to override any field.
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/1d378eef-76d1-4cd1-b4e6-1a423c9fdb92)



### 3.6 Choose a Trigger
Choose a GTM Trigger to associate with the tag, then click "Save".
![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/d533c48b-96ff-4f0f-a897-a824de3f8e37)



## 4. Test Server Tags
1. Click "Preview" to test out the new Tag. You may need to trigger it from your gtag.js or GA4 installation.
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/2d1514ca-956c-4d60-bf13-f42411191a34)


2. After triggering a Tag created with the template, you can see the Events API call in the Console. Specifically, you should be able to see the API response body. When the response contains {"code": 0, "message": "OK"}, it means the request was sent successful.
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/c854c6b2-5b0d-4c2b-a6b7-4a362cb3d102)

   

## 5. Verify Setup
1. Get "Test Event Code" from Events Manager. Learn more instruction from this [article](https://ads.tiktok.com/marketing_api/docs?id=1739584863252481).
   Go to Events Manager, click on "Web Events", then click the pixel to view the pixel detail page. Click on "Test Events" Tab. Follow instructions to copy the test event code.
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/93e82cf7-df9c-460f-b10b-3c442381836b)

2. Fill in the "Test Event Code" field in the template. Then save the changes. ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/4ed83366-d672-4003-80bb-a68b143e6dd2)

3. Repeat steps in section 4 "Test Server Tags" to trigger a test event.
4. In a few minutes, if you set up the server tag correctly, your event will be received from TikTok and displayed in "Test Events" Tab! Fix the event payload issues if necessary.
   ![image](https://github.com/tiktok/gtm-template-eapi/assets/131811467/fc3718fc-4c23-4f77-ab35-bedbe089c224)







