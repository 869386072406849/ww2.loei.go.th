Logo
Search
Introduction
Change Log
Quotation ID
Quotation Validity Period
Price Breakdown
Distance
Change Driver
Route Optimization
Authentication
Order Flow
Available Markets
Service Types & Special Requests
New Order ID Specifications
Get Quotation
Quotation Details
Place Order
Order Details
Driver Details
Add Priority Fee
Edit Order
Cancel Order
Change Driver
Get City Info
Webhook
Errors
Getting on Board
Tutorial
Support
Sign up for a Developer Key
Lalamove API - System Status
 Our developer guide is now also available in Japanese. You can download it here.
 We just released a Node.js client libray to make integration 10x easier.Try it now here 👏👏
Or if you prefer to check on the sample codes, you can find it here!
 To our valued clients interested for a postpaid plan, please contact partner.support@lalamove.com to inquire for the requirements and how to implement to your integration
Introduction
In v3, we have made substantial improvements in several fronts ranging from guaranteed quotation validity period to detailed price breakdown to route optimization to provide the best API in the region.

Now you can place orders easier and cheaper. Retrieve any order's granular information to build a more robust and transparent system. Easily track and change orders via API without contacting Customer Support. Here's a short list of key improvements.

Features	Description
Quotation ID	Unique identifier that encapsulates each quotation and its delivery information
Quotation Validity Period	Guaranteeing quotation to be valid for a period even when price has changed
Price Breakdown	Retrieve how Lalamove delivery price is calculated
Distance	Retrieve distance between the pick-up and drop-off points
Change Driver	Change to another driver if there's any problem and save yourself from hassle
Route Optimization	Optimize your drop-off routes and deliver cheaper
Retrieve POD information	Retrieve photo proof of your delivery
 Simply set your hostname to
- Sandbox: rest.sandbox.lalamove.com/v3 or
- Production: rest.lalamove.com/v3

No additional credentials or approvals are required. Try it now!
As always, if you have any suggestions or feedbacks, please reach out to partner.support@lalamove.com. We would love to hear how we can server you better.

Change Log
Month	Feature	Description
Aug 2026	Available Markets	API support is extended to more markets
April 2026	Webhook	Added new update on existing structure and new webhook event
Nov 2025	Price Breakdown	Added a new price breakdown item in the Philippines
Sep 2025	Available Markets	API is now available in Japan
Sep 2025	Order Details	Added remarks array to get order details end point
Aug 2025	Price Breakdown	Updated price breakdown precision length in Malaysia to 1
Apr 2025	New Order ID Specifications	Updated the order ID length from 12 digits to 19 digits
Mar 2025	City Name	Updated city name for Penang
Jan 2025	Driver rejection	Updated logic for driver rejection
Sep 2024	Expired Orders	Updated logic for order expiry
Sep 2024	Order Flow	Cleaned up the order flow by separating different scenarios
Apr 2024	API	Deprecate API v2
Oct 2023	City Info	Update on API response structure and specialRequest keys
Aug 2023	City Name	Updated city names for Vietnam and Philipines
May 2023	Webhook	Added information related to ORDER_EDITED message in the documentation
Apr 2023	API	Added Time Display section to specifiy the timezone used in Lalamove API
Mar 2023	Webhook	Extracted webhook setup information and available message types from the PDF documentation
Mar 2023	API	Added clarifications on the scheduled order arrangments
Mar 2023	API	Added the sample codes link and updated the error message
Nov 2022	API	Update order expiration time from 1 hour to 2 hours
Sep 2022	SDK	Released new SDK version
Sep 2022	API	Updated v3/cities specialRequest field name to be 'name' instead of 'key'
Sep 2022	API	Updated v3/cities specialRequest field name to be 'name' instead of 'key'
Sep 2022	Webhook	Include steps to setup webhook using API in the PDF Tutorial file
Sep 2022	API	Add clarification on maximum request for POST v3/orders API call
Aug 2022	SDK	On-going maintenance on Lalamove SDK. We'll be back soon!
Jun 2022		Update the section header name from 'Go-Live' to become 'Getting On Board' to make it more informative
Jun 2022	ALL	Add API support SLA table
May 2022	API	Add Order Edit API specification, add new fields in Quotation and Order request and response payloads, and add Rate Limit Table
May 2022	API	Updated tutorial PDF files and added Order Edit and Change Driver Endpoints to the Postman Collection
Apr 2022	API	Add metadata objects to Place Order and Order Detail APIs
Mar 2022	SDK	Node.js client libary released
Quotation ID
Previously, API users had no good way of handling quotations that they received from Lalamove. They had to manually extract price from each quotation, store it separately, and map that to relevant pick-up and drop-off locations with vehicle types and special requests.

To solve this, in v3, we are introducing UUID based unique identifier for each quotation that can encapsulate all the necessary information for each delivery. Lalamove users can now just use this Quotation ID (quotationId) to submit orders and store conveniently on the client side.

{
    "data": {
        "quotationId": "1471722666401517645",
        "scheduleAt": "2020-09-01T14:30:00.00Z",
        "serviceType": "MOTORCYCLE",
        "specialRequests": ["LALABAG"],
        "expiresAt": "2020-09-01T14:35:00.00Z",
        "priceBreakdown": {...},
        "stops": [...],
        "item": {...}
    }
}
 Sample response from Lalamove after you POST quotation in v3. Note that all of service type, special requests, and stop information are now attached to the ID. So when you place an order, your quotationId is all you need
Quotation Validity Period
To provide the best price for both users and drivers at a given time, Lalamove adjusts deliver price on a real-time basis. While it optimizes prices for both parties, it also made previously valid quotation invalid. As a consequence, API users often couldn't place orders in a timely manner and had to re-submit new quotations.

 To solve this, leverage new Quotation ID in v3, Lalamove will honor the quotations for 5 minutes even when the price has changed. So even when the price has increased, Lalamove will still place users' order with the previous price that Lalamove has provided to the user.
While this may hurt Lalamove's revenue in short-term, API team has decided to offer the feature since we believe that it's very important to provide stable, consistent, and transparent pricing to our users. Even better, if price has decreased, we will place orders with the now lower price to provide the best price.

However note that, if the quotation has been created more than 5 minutes ago, Lalamove will not be able place orders (even if the price happened to be the same) and you will have to create another quotation.

Price Breakdown
Lalamove has always strived towards transparency for our users. We are happy to announce that we are now finally able to apply our principle to our price breakdown as well.

"priceBreakdown": {
    "base": "100",
    "extraMileage": "10",
    "surcharge": "20",
    "adminFee": "2", //applicable to PH only
    "...": "",
    "totalBeforeOptimization": "130",
    "totalExcludePriorityFee": "130",
    "total": "130",
    "currency": "THB"
},
All price items within the price breakdown object (e.g., base, total, etc.) are returned as decimal numbers. The number of decimal points varies by market, reflecting local currency conventions and system configurations. Please refer to the table below for the specific decimal precision. Unless mentioned explicitly in the table, assume no decimal in price item values.

Market	Price decimal precision	Example
SG	1	10.5
MY	1	50.5
 For exact details on what each component is and how they are calculated, please reach out to your local AMs or check out our local websites.
Distance
Similar to price breakdown, we will now share how we compute distance between the pick-up point and drop-off points for each delivery so that our API clients can independently verify and re-use the distance for their end-clients if needed.

"distance": {
    "value": "16200",
    "unit": "m"
},
Field	Description
Value	Full integer value of the distance, rounded up to tenth decimal before 0 (ex: 0.1)
Unit	Unit of the distance.
Change Driver
Drivers are late or unresponsive? While we try our best to always match orders with quality drivers, things do happen. In that case, rather than cancelling, you can always change the driver and have your delivery fulfilled with little hassle. No need to cancel and re-submit your orders 😀

For more details, please jump to Change Driver

Route Optimization
Have multiple drop-off locations? But can't decide which stops you want to go first? We're happy to announce that we're finally bringing route optimization to API as well.

Simply add isRouteOptimized: true when you create quotation, find the best route, and save your delivery cost

For more details, please jump to Quotation

Authentication
Lalamove API uses HMAC (SHA256) as its authentication mechanism.

You will be provided with an API KEY, and an API SECRET from Developers tab of the Partner Portal that you can use to generate a HMAC signature (SIGNATURE).

# With shell, you can just pass the correct header with each request
curl 'https://rest.sandbox.lalamove.com/v3/quotations' \
  -H 'Authorization: hmac {}' \
  -H 'Content-Type: application/json' \
  -H 'Market: HK'

Sandbox & Production API keys
 Please keep your API KEY and API SECRET in a secret and secure manner. DO NOT store them in publicly accessible places like GitHub, client-side code and so on.
All API requests must be made over HTTPS. Calls made over plain HTTP will fail.

As seen in the table below, each API key and secret will have a prefix that signifies their corresponding environment. Please be reminded that you need to top up your Lalamove Wallet in order to get your Production API key and secret. Credentials for different environments can be retrieved by selecting the correct environment on the top right corner of your Partner Portal page.

Environment	Prefix
Sandbox	pk_test or sk_test
Production	pk_prod or sk_prod
Signature
Example in JavaScript

const SECRET = 'sk_test_Lalamove'; 
const time = new Date().getTime().toString(); // => `1545880607433`

const method = 'POST';
const path = '/v3/quotations';
const body = JSON.stringify({...}); // => the whole body for '/v3/quotations'

const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n${body}`;
//const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n`; if the method is GET
// => '1546222219293\r\nPOST\r\n/v3/quotations\r\n\r\n{\n"data":{...}'


const SIGNATURE = CryptoJS.HmacSHA256(rawSignature, SECRET).toString();
// => '5133946c6a0ba25932cc18fa3aa1b5c3dfa2c7f99de0f8599b28c2da88ed9d42'
 A unique Signature Hash has to be generated for EVERY API call at the time of making such call.
SIGNATURE = HmacSHA256ToHex(<TIMESTAMP>\r\n<HTTP_VERB>\r\n<PATH>\r\n\r\n<BODY>, <SECRET>)

SIGNATURE is in lowercase hex (base 16) encoding.

SECRET	Your API secret
TIMESTAMP	Unix timestamp in milliseconds eg. 1545880607433
METHOD	Method (GET, POST, PUT, DELETE , PATCH) of the specific API call
PATH	The pathname of the specific API call including version. eg. /v3/quotations
BODY	The request body in JSON string
Useful links

Examples of creating base64 hashes using HMAC SHA256 in different languages
SHA256 HMAC in different languages (both hex & base64 encoding)
Headers
Example in JavaScript (cont.)

const API_KEY = 'pk_test_Lalamove' 
const TOKEN = `${API_KEY}:${time}:${SIGNATURE}`
Every call MUST include the following headers.
Authorization: hmac <TOKEN> 
Market: <YOUR_MARKET> 
Request-ID: <NONCE> 
Example

Authorization: hmac 914c9e52e6414d9494e299708d176a41:1545880607433:5133946c6a0ba25932cc18fa3aa1b5c3dfa2c7f99de0f8599b28c2da88ed9d42
Market: TH
Request-ID: 211b9d85-a2cc-476f-8675-b61ec923cc27
Authorization
TOKEN = <KEY>:<TIMESTAMP>:<SIGNATURE>

KEY	Your API key
TIMESTAMP	MUST be identical to TIMESTAMP in SIGNATURE
SIGNATURE	As described in Signature in lowercase hex (base 16)
Market
Please specify the market you are placing orders in UN/LOCODE format. For example, Indonesia will be listed as ID. See Available Markets for details.

Request-ID
Provide a Nonce to be used as a unique Request ID. If you are having trouble with any request, sharing the Request ID with us will be the fastest way.

Order Flow
Here's a sample of happy order flow. Click the diagram below to enlarge

order-flow

Order Status
Dotted lines in the following diagram indicates possible status transition.

status

ASSIGNING_DRIVER	Trying to match the delivery with a driver.
ON_GOING	A driver has accepted the order.
PICKED_UP	The driver has picked up the order.
COMPLETED	The order has been delivered successfully and transaction has concluded.
CANCELED	User has canceled the order.
REJECTED	The order was matched and rejected twice by two drivers in a row, see Order Flow.
EXPIRED	The order expired as no drivers accepted the order.
Stop Level Status
These statuses denote more granular per stop level status, not the overall delivery status from above. It will be shared in the payload once the client has enabled Proof of Delivery(#proof-of-delivery).

status in POD	Description
PENDING	The driver hasn't completed the delivery to the stop yet
DELIVERED	The driver has completed the order and has taken a photo at the stop
SIGNED	The driver has completed the order and received recipient's signature
FAILED	The driver couldn't complete the delivery to the stop
 Please be reminded that this will not prevent the driver to pick up the order earlier than the scheduled time upon agreement with the user. Similar to immediate order, the order status will change from ON_GOING to PICKED_UP if such action is effective. This also applies to the status change function in our Partner Portal.
Immediate vs Scheduled
Quotation for Immediate Order

Quotation for Scheduled Order

Depending on your delivery needs, you can place an immediate order or a schedule order.

Immediate order (scheduleAt was skipped at the time when placing the order.)
Driver will go to the pick-up point once he accepts the order.
Scheduled order (scheduleAt was specified at the time, up to 30 days in advance, when placing the order.)
Driver will arrive at the pick-up point by the time specified in scheduleAt.
User Cancellation
An order can only be cancelled either:

An order with the status ASSIGNING_DRIVER; or
An order is matched less than 5 minutes - order status changed from ASSIGNING_DRIVER to ON_GOING less than 5 minutes ago. This holds regardless of the actual scheduleAt.
This is a sample of user cancellation scenarios.

Driver Rejection
Orders can be rejected by a driver after they are matched. When this happens, the order status will revert from ON_GOING/ PICKED_UP to ASSIGNING_DRIVER. Lalamove system will try to match it again with a different driver. If an order has reached its rejection limit, the order status will change to REJECTED. Lalamove system will no longer broadcast this order to the driver pool.

At this point, API users can treat REJECTED order similarly with CANCELLED order and re-submit after double checking all the delivery information

This is a sample of order rejection scenarios.

 Important Update: To increase chances of order fulfillment, we've updated the rejection limit. Now multiple drivers will have the option to accept your order.
Expired Orders
An order will be expired if it is not accepted by any driver for a period of time. Depending on the order type (immediate vs scheduled), order expiry time varies.

If the order is accepted by a driver who then rejects the order shortly after, the order expiration time will reset and start counting 2 hours from when the order is "REJECTED" for the first time. If the order is not accepted by a second driver, it will be "Expired". This is applicable to both immediate and scheduled orders.

Immediate order - 2 hours after the order is placed
Scheduled order - 2 hours after the scheduleAt time
If the order is accepted by a driver who then rejects the order shortly after, the order expiration time will reset and start counting 2 hours from when the order is "REJECTED" for the first time. If the order is not accepted by a second driver, it will be "Expired". This is applicable to both immediate and scheduled orders.

Sample scenarios:

Immediate order: If an immediate order is placed at 10:00AM and it was matched to a driver at 10:30AM who then rejects the order at 11:00AM, the order's new expiration time will be now be reset at 1:00PM instead.
Scheduled order: If the order is placed at 10:00AM and scheduleAt time is 11:00AM, and it was matched to a driver at 11:30AM who then rejects the order at 12:00PM, the order's new expiration time will be now reset at 2:00PM instead.
This is a sample of order expiration scenarios.

Available Markets
Lalamove API is currently available in the following markets.

Market	Market Code	Language Keys (for address)
Japan	JP	en_JP,ja_JP
Brasil	BR	en_BR,pt_BR
Hong Kong SAR	HK	en_HK, zh_HK
Indonesia	ID	en_ID, id_ID
Malaysia	MY	en_MY, ms_MY
Mexico	MX	en_MX, es_MX
Philippines	PH	en_PH
Singapore	SG	en_SG
Taiwan Region	TW	zh_TW
Thailand	TH	th_TH, en_TH
Vietnam	VN	en_VN, vi_VN
United Arab Emirates	AE	en_AE
Saudi Arabia	SA	en_SA, ar_SA
Available Cities
Japan
City	Pricing Details
Kanto	https://www.lalamove.com/ja-jp/all-vehicle-pricing-detail?&city=kanto
Kansai	https://www.lalamove.com/ja-jp/all-vehicle-pricing-detail?&city=kansai
Brasil
City	Pricing / Preços
Belo Horizonte	https://www.lalamove.com/pt-br/detalhes/sao-paulo?&city=belo-horizonte
Rio de Janeiro	https://www.lalamove.com/pt-br/detalhes/sao-paulo?&city=rio-de-janeiro
São Paulo	https://www.lalamove.com/pt-br/detalhes/sao-paulo?&city=sao-paulo
Porto Alegre	https://www.lalamove.com/pt-br/detalhes/sao-paulo?&city=porto-alegre
Brasília	https://www.lalamove.com/pt-br/detalhes/sao-paulo?&city=brasilia
Curitiba	https://www.lalamove.com/pt-br/detalhes/sao-paulo?&city=curitiba
Fortaleza	https://www.lalamove.com/pt-br/detalhes/sao-paulo?&city=fortaleza
Salvador	https://www.lalamove.com/pt-br/detalhes/sao-paulo?&city=salvador
Florianópolis	https://www.lalamove.com/pt-br/detalhes/sao-paulo?&city=florianopolis
Hong Kong SAR
City	Pricing
Hong Kong	https://www.lalamove.com/en-hk/all-vehicle-pricing-detail
Indonesia
City	Pricing / Harga
Bandung	https://www.lalamove.com/en-id/delivery-fee?&city=bandung
Jakarta	https://www.lalamove.com/en-id/delivery-fee?city=jakarta
Surabaya	https://www.lalamove.com/en-id/delivery-fee?city=surabaya
Malaysia
City	Pricing / Harga
Kuala Lumpur	https://www.lalamove.com/en-my/all-vehicle-pricing-detail
Johor Bahru	https://www.lalamove.com/en-my/all-vehicle-pricing-detail?city=johor
Penang & Nearby States	https://www.lalamove.com/en-my/all-vehicle-pricing-detail?&city=penang
Mexico
City	Pricing Details
Mexico City / Ciudad de México	https://www.lalamove.com/es-mx/todos-vehiculos-tarifa-detalles
Philippines
City	Pricing Details
Cebu Islandwide	https://www.lalamove.com/en-ph/all-delivery-pricing-detail?&city=cebu-islandwide
Manila NCR & South Luzon	https://www.lalamove.com/en-ph/all-delivery-pricing-detail?&city=manila-ncr-and-south-luzon
North & Central Luzon	https://www.lalamove.com/en-ph/all-delivery-pricing-detail?&city=north-and-central-luzon
Singapore
City	Pricing Details
Singapore	https://www.lalamove.com/en-sg/all-vehicle-pricing-detail
Taiwan Region
City	Pricing Details
Taipei	https://www.lalamove.com/zh-tw/all-vehicle-pricing-detail
Taichung	https://www.lalamove.com/zh-tw/all-vehicle-pricing-detail
Tainan	https://www.lalamove.com/zh-tw/all-vehicle-pricing-detail
Kaohsiung	https://www.lalamove.com/zh-tw/all-vehicle-pricing-detail
Thailand
City	Pricing Details
Bangkok	https://www.lalamove.com/en-th/all-vehicle-pricing-detail
Chonburi	https://www.lalamove.com/en-th/all-vehicle-pricing-detail
Vietnam
City	Pricing Details
Hanoi and Nearby Regions	https://www.lalamove.com/en-vn/all-vehicle-pricing-detail?&city=hanoi
Ho Chi Minh City and Nearby Regions	https://www.lalamove.com/en-vn/all-vehicle-pricing-detail?&city=hochiminhcity
United Arab Emirates
City	Pricing Details
Dubai	https://www.lalamove.com/en-ae/all-vehicle-pricing-detail?&city=dubai
Sharjah	https://www.lalamove.com/en-ae/all-vehicle-pricing-detail?&city=sharjah
Abu Dhabi	https://www.lalamove.com/en-ae/all-vehicle-pricing-detail?&city=abudhabi
Saudi Arabia
City	Pricing Details
Riyadh	https://www.lalamove.com/en-sa/all-vehicle-pricing-detail
Phone Validation
We accept E.164 standard format and use below regex rule as our core validation logic. We further validate by using Google's Lib Phone Number library.

Markets	Sample	Regex
All Markets	+6512345678	^\+[1-9]\d{1,14}$
Time Display
All timestamp information in Lalamove API are presented in UTC timezone.

Service Types & Special Requests
Lalamove provides a range of vehicles to cater different needs.

Kindly note that shipping service terminologies listed in Lalamove Website are different from the serviceType values included in your payload. Kindly check the Get City Endpoint for the serviceType values for your city!

On top of that, you can also add special requests to your order! Kindly ensure that you are using valid special request keys in your quotations by periodically checking the available specialRequest values by calling the Get City Endpoint.

 Kindly ensure that you are using valid service type and special request keys in your quotations by periodically checking the corresponding city configurations through our Get City Info endpoint
New Order ID Specifications
Starting September 2nd, 2025 Lalamove Order Number will be extended from 12 digits to 19 digits. Please be advised that this adjustment may impact your system if the order number is currently declared as 'int' or stored as a fixed 12-digit format. While your order placement via API will continue to be successful, your system may encounter parsing issue and fail to process the order correctly due to the increased digits in the order number format. Kindly ensure that your integration is up to date by the corresponding effective time.

Market	Effective timezone
Hong Kong	September 2, 2025 20:00 HKT
Mexico	September 2, 2025 01:00 MXT
Indonesia	September 9, 2025 19:00 JKT
Malaysia	September 9, 2025 20:00 MYT
Philippines	September 9, 2025 20:00 PHT
Vietnam	September 9, 2025 19:00 VNT
Taiwan	September 16, 2025 20:00 TWT
Thailand	September 16, 2025 19:00 THT
Singapore	September 23, 2025 20:00 SGT
Brazil	September 23, 2025 04:00 BRT
Get Quotation
POST 

Sandbox: https://rest.sandbox.lalamove.com/v3/quotations
Production: https://rest.lalamove.com/v3/quotations
> Body

{
    "data": {
        "scheduleAt": "2020-09-01T14:30:00.00Z", // optional
        "serviceType": "MOTORCYCLE",
        "specialRequests": ["TOLL_FEE_10", "PURCHASE_SERVICE_1"], // optional
        "language": "en_HK",
        "stops": [<DeliveryStop>],
        "item": { // Recommended
          "quantity": "3",
          "weight": "LESS_THAN_3KG",
          "categories": ["FOOD_DELIVERY","OFFICE_ITEM"],
          "handlingInstructions": ["KEEP_UPRIGHT"] 
        },
        "isRouteOptimized": true, // optional
    }
}
Responses

201 Quotation Created

{
    "data": {
        "quotationId": "1514140994227007571",
        "scheduleAt": "2022-04-13T07:18:38.00Z",
        "expiresAt": "2022-04-13T07:23:39.00Z",
        "serviceType": "MOTORCYCLE",
        "specialRequests": [
            "TOLL_FEE_10",
            "PURCHASE_SERVICE_1"
        ],
        "language": "EN_HK",
        "stops": [
            {
                "stopId": "1514140995971838016",
                "coordinates": {
                    "lat": "22.3354735",
                    "lng": "114.1761581"
                },
                "address": "Innocentre, 72 Tat Chee Ave, Kowloon Tong"
            },
            {
                "stopId": "1514140995971838017",
                "coordinates": {
                    "lat": "22.2812946",
                    "lng": "114.1598610"
                },
                "address": "Statue Square, Des Voeux Rd Central, Central"
            }
        ],
        "isRouteOptimized": false,
        "priceBreakdown": {
            "base": "90",
            "specialRequests": "13",
            "vat": "21",
            "totalBeforeOptimization": "124",
            "totalExcludePriorityFee": "124",
            "total": "124",
            "currency": "HKD"
        },
        "item": {
            "weight": "LESS_THAN_3_KG",
            "categories": [
                "OFFICE_ITEM",
                "OTHERS"
            ]
        },
        "distance": {
            "value": "5836",
            "unit": "m"
        }
    }
}
422 Not enough stops, number of stops should be between 2 and 16

{ "message": "ERR_INSUFFICIENT_STOPS" }
422 Reached maximum number of stops (including the pick-up point), should be between 2 and 17

{ "message": "ERR_TOO_MANY_STOPS" }
422 Invalid market, getting a quotation from a market not supported

{ "message": "ERR_INVALID_MARKET" }
422 Invalid phone number, refer to Phone Validation

{ "message": "ERR_INVALID_PHONE_NUMBER" }
422 scheduleAt datetime is in the past

Be reminded that scheduleAt is in UTC timezone.
{ "message": "ERR_INVALID_SCHEDULE_TIME" }
422 No such service type, make sure to stick to Service types in each markets

{ "message": "ERR_INVALID_SERVICE_TYPE" }
422 No such special request(s), make sure that special requests match with selected Service types

{ "message": "ERR_INVALID_SPECIAL_REQUEST" }
422 Out of service area

{ "message": "ERR_OUT_OF_SERVICE_AREA" }
422 Fail to reverse from address to location, provide lat and lng

{ "message": "ERR_REVERSE_GEOCODE_FAILURE" }
POST /v3/quotations

Request a quotation.

Will return an object containing quotationId, stops, special requests, price and currency based on information provided.

Body

serviceType	string	The type of vehicle. Please check our Get City Info Endpoint available in each market
stops	DeliveryStop[]	Array of DeliveryStops (minimum 2, maximum 16)
language	string	Language for addresses in stops, see Language
Optional fields		
scheduleAt	string	Pick up time in UTC timezone and ISO 8601 format; omit this if you are placing an immediate order
specialRequests	string[]	See special requests available in each market
isRouteOptimized	boolean	
item	Object	Object of delivery item's information
scheduleAt

IMPORTANT: scheduleAt is in UTC timezone.
Our API will interpret the scheduleAt time in UTC format (Coordinated Universal Time) only. Therefore please make sure you submit your requests factoring this in. Please see the example below.

You would like to place an order with a scheduleAt time of 2020-07-10 15:00, local time in Singapore. Singapore is UTC +8 timezone. Therefore your scheduleAt time entry should be 2020-07-10T07:00:00.000Z. Please find below your current timezone compared side-by-side with UTC.

Your Local Time	UTC Time
2026-09-01T06:44:01.185+07:00	2026-08-31T23:44:01.185Z
ISO 8601 format
Delivery Stop
Delivery Stop

{
    "coordinates": {
        "lat": "22.3353139",
        "lng": "114.1758402"
    },
    "address": "Jl. Perum Dasana"
}
coordinates.lat	string	Latitude - up to 15 decimal value
coordinates.lng	string	Longitude - up to 15 decimal value
address	string	Street address in plain text
Item Information
Information about the delivered item. This will help Lalamove drivers deliver more reliably and efficiently.

 Please note that this service is only available in Thailand, Vietnam, and Hong Kong China at the moment. The supported values for weight, categories, handlingInstructions differ by cities and vehicle types. So, please check the deliveryItemSpecification field inside Get City Info endpoint for the exact values.
Item Information

{
    "item":{
      "quantity":"12",
      "weight":"LESS_THAN_3_KG",
      "categories":[
         "FOOD_DELIVERY",
         "OFFICE_ITEM"
      ],
      "handlingInstructions":[
         "KEEP_UPRIGHT",
         "FRAGILE"
      ]
    }
}
quantity	string	Number of items
weight	string	Weight of items in ENUM
categories	Array	Categories of the items
handlingInstructions	Array	Handling instructions for items
Quotation Details
GET

Sandbox: https://rest.sandbox.lalamove.com/v3/quotations/{quotationId}
Production: https://rest.lalamove.com/v3/quotations/{quotationId}
Retrieve a quotation's information

Responses

200

{
    "data": {
        "quotationId": "1514140994227007571",
        "scheduleAt": "2022-04-13T07:18:38.00Z",
        "expiresAt": "2022-04-13T07:23:39.00Z",
        "serviceType": "MOTORCYCLE",
        "specialRequests": [
            "TOLL_FEE_10",
            "PURCHASE_SERVICE_1"
        ],
        "language": "EN_HK",
        "stops": [
            {
                "stopId": "1514140995971838016",
                "coordinates": {
                    "lat": "22.3354735",
                    "lng": "114.1761581"
                },
                "address": "Innocentre, 72 Tat Chee Ave, Kowloon Tong"
            },
            {
                "stopId": "1514140995971838017",
                "coordinates": {
                    "lat": "22.2812946",
                    "lng": "114.1598610"
                },
                "address": "Statue Square, Des Voeux Rd Central, Central"
            }
        ],
        "isRouteOptimized": false,
        "priceBreakdown": {
            "base": "90",
            "specialRequests": "13",
            "vat": "21",
            "totalBeforeOptimization": "124",
            "totalExcludePriorityFee": "124",
            "total": "124",
            "currency": "HKD"
        },
        "item": {
            "weight": "LESS_THAN_3_KG",
            "categories": [
                "OFFICE_ITEM",
                "OTHERS"
            ]
        }
}
Place Order
POST 

Sandbox: https://rest.sandbox.lalamove.com/v3/orders
Production: https://rest.lalamove.com/v3/orders
cURL --location --request POST 'https://rest.sandbox.lalamove.com/v3/orders' \
-H 'Content-Type: application/json' \
-H 'Authorization: hmac {API_KEY}:{timestamp}:{Signature}' \
-H 'MARKET: HK' \
-H 'Request-ID: cd8c5259-5719-4efc-8431-eecf02a66238' \
--data-raw '{"data"...}'
Body

{
    "data": {
        "quotationId": "1471722666401517645",
        "sender": {
            "stopId": "112345623",
            "name": "Michal",
            "phone": "11955555555"
        },
        "recipients": [
            {
                "stopId": "112345678",
                "name": "Karen",
                "phone": "+660923447537",
                "remarks": "YYYYYY" // optional
            }
        ],
        "isPODEnabled": true, // optional
        "partner": "Lalamove Partner 1", // optional 
        "metadata": {
            "restaurantOrderId": "1234",
            "restaurantName": "Rustam's Kebab"
        }
    }
}
IMPORTANT: Note that you no longer need to repeat all the delivery information that you sent to quotation. You can simply pass the corresponding `quotationId`, `stopId`, and contact information.

Responses

201 Order Created

{
    "data": {
        "orderId": "107900701184",
        "quotationId": "1471722666401517645",
        "priceBreakdown": {
            "base": "100",
            "extraMileage": "10",
            "surcharge": "20",
            "...": "",
            "totalExcludePriorityFee": "130",
            "total": "150",
            "currency": "THB",
            "priorityFee":"20"
        },
        "driverId": "33522",
        "shareLink": "https://share.lalamove.com/?TH1234556&lang=th_TH&version=2",
        "status": "COMPLETED",
        "distance": {
            "value": "16200", 
            "unit": "m"
        },
        "stops": [
            {
                "coordinates": {
                    "lat": "22.3353139",
                    "lng": "114.1758402"
                },
                "address": "Jl. Perum Dasana",
                "name": "dodo",
                "phone": "+660923447537"
            },
            {
                "stopId": "1231231231",
                "coordinates": {
                    "lat": "22.3203648",
                    "lng": "114.169773"
                },
                "address": "Jl. Kartini, Ruko No. 1E",
                "name": "dodo",
                "phone": "+660923447537",
                "POD": {
                    "status": "DELIVERED",
                    "image": "POD_IMAGE_URL",
                    "deliveredAt": "2022-01-20T06:26:39.721Z"
                } 
            }
        ],
        "metadata": {
            "restaurantOrderId": "1234",
            "restaurantName": "Rustam's Kebab"
        }
    }
}

 IMPORTANT: Following the Quotation Validity Period of 5 minutes, any valid quotation will be accepted and be able to place an order even when the price has changed .
402 You have insufficient credit. Please top up your wallet

{ "message": "ERR_INSUFFICIENT_CREDIT" }
429 Too Many Requests


{ "message": "ERR_RATE_LIMIT_EXCEEDED" }

POST /v3/orders

Provide the quotationID and stopId received from /quotations and add contact information for both the sender and recipients. In order to ensure a smooth transaction, kindly ensure that you are sending 2 orders per second at maximum.

(Partners ONLY) Please specify your name in the partner field to effectively track and manage your orders
Body

quotationId	string	quotationId from /quotations
sender.name	string	Name of the sender. This information will be displayed to the driver.
sender.phone	string	Phone number of the sender. This information will be displayed to the driver.
recipients	DeliveryDetails[]	An array of DeliveryDetails, containing recipient contact and instruction per stop
Optional Fields		
isPODEnabled	boolean	Request driver to carry out "Proof Of Delivery" for all stops in the order. Default to false. See Proof Of Delivery for details.
partner	string	Specify Partner's name for effective tracking and organization. This field is only applicable for channel partners. Please contact partner.support@lalamove.com if you would like to request for your Partner ID
metadata	key-value pair	An object with key-value pairs containing client-specific information
For Recipient SMS to be sent, please first check with your account manager for details.
Response

orderId	Lalamove Order ID
quotationId	Used Quotation ID
priceBreakdown	Breakdown of the delivery price
priorityFee	Priority fee if it exists
driverId	Driver ID once the order is matched. Default value will be ""
shareLink	Sharelink of the order. See 'Sharelink' for more details
status	Latest status of the order
distance	Distance between the pick-up and drop-off locations. See Distance for more details
stops	An array of combined object of stop & delivery details
metadata	An object with key-value pairs containing client-specific information. This object will only be available if you include it in your order request payload
DeliveryDetails
DeliveryDetails

{
    "stopId": "11841184218725152",
    "name": "Sachin",
    "phone": "+6600000000",
    "remarks": "ORDER#94\r\n1. Tshirt จำนวน 1\r\n2. Hoodie จำนวน 1\r\n"
}
Contact person, mobile phone number and remarks for each Delivery Stop excluding the pick-up point.

stopId	number	Identifier for each stop returned from Lalamove.
name	string	Name of the given stop's recipient
phone	string	Phone number of the given stop's recipient, check out Phone Number Validation for exact validation logic. Must be a valid number with region code (ex: +65)
Optional fields		
remarks	string	Additional info about the delivery. eg. building, floor and flat. Use newline \r\n for better readability. Up to 1500 characters.
Order Details
GET 

Sandbox: https://rest.sandbox.lalamove.com/v3/orders/{id}
Production: https://rest.lalamove.com/v3/orders/{id}
GET /v3/orders/{id}

Params

id	<orderId> (returned by /v3/orders/)
Responses

200

{
    "data": {
        "orderId": "107900701184",
        "quotationId": "1471722666401517645",
        "priceBreakdown": {...},
        "driverId": "33522",
        "shareLink": "https://share.lalamove.com/?TH1234556&lang=th_TH&version=2",
        "status": "COMPLETED",
        "distance": {
            "value": "16200", 
            "unit": "m"
        },
        "stops": [
            {
                "coordinates": {
                    "lat": "22.3353139",
                    "lng": "114.1758402"
                },
                "address": "Jl. Perum Dasana",
                "name": "dodo",
                "phone": "+660923447537"
            },
            {
                "coordinates": {
                    "lat": "22.3203648",
                    "lng": "114.169773"
                },
                "address": "Jl. Kartini, Ruko No. 1E",
                "name": "dodo",
                "phone": "+660923447537",
                "POD": {
                    "status": "DELIVERED",
                    "image": "POD_IMAGE_URL",
                    "deliveredAt": "2022-01-20T06:26:39.721Z"
                } 
            }
        ],
        "metadata": {
            "restaurantOrderId": "1234",
            "restaurantName": "Rustam's Kebab"
        },
        "remarks": ["handle with care", "hoodie"] 
    }
}
Response

orderId	Lalamove Order ID
quotationId	Used Quotation ID
priceBreakdown	Breakdown of the delivery price. See Price Breakdown
priorityFee	Priority fee if it exists
driverId	Driver ID once the order is matched. Default value will be ""
shareLink	Sharelink of the order. See 'Sharelink' for more details
status	Latest status of the order
distance	Distance between the pick-up and drop-off locations. See Distance for more details
stops	An array of combined object of stop & delivery details
metadata	An object with key-value pairs containing client-specific information. This object will only be available if you include it in your order request payload
remarks	An array of strings containing user-provided notes or comments for each individual stop
Share Link
Share link is meant to be used for sharing delivery information with a 3rd party personnel. The returned link is the same as if a user press "Share" in the Lalamove app. No login is required to view the sharelink.

IMPORTANT: Please do NOT expect patterns form the shareLink. Please kindly take the value as-is.
status

 We only support getting orders created in the last 60 days. Our system will return 403 if you make such requests.
Proof Of Delivery
Proof Of Delivery (POD) is a request that you can put when you placed the order. If you submit an order requesting POD, the driver will be notified to get signature(s) from the recipient(s) or take photos as a proof of a success delivery.

If you want to enable POD for your delivery, please include "isPODEnabled":true in the request body.

status in POD	Description
PENDING	The driver hasn't completed the delivery to the stop yet
DELIVERED	The driver has completed the order and has taken a photo at the stop
SIGNED	The driver has completed the order and received recipient's signature
FAILED	The driver couldn't complete the delivery to the stop
Metadata
Metadata enables you to attach your include your specific information into the order. This will be useful in populating your company-specific information that you want to use as a reference in our order.

In order to do so, add your metadata as key-value pairs inside metadata object

Kindly check on the code examples on the side for reference.

Driver Details
GET 

Sandbox: https://rest.sandbox.lalamove.com/v3/orders/{orderId}/drivers/{id}
Production: https://rest.lalamove.com/v3/orders/{orderId}/drivers/{id}
Responses: 200

{
    "data": {
        "driverId": "33522",
        "name": "David",
        "phone": "37013701",
        "plateNumber": "**LAM0V*",
        "photo": "<PROFILE_PHOTO_URL>",
        "coordinates": {
            "lat": "13.740167",
            "lng": "100.535237",
            "updatedAt": "2021-12-01T14:30.00Z"
        } 
    }
}
GET /v3/orders/{orderId}/drivers/{driverId}

Retrieve driver's information.

This information is available starting 1 hour prior to datetime specified in scheduleAt datetime or once the driver arrived at the pick up location, whichever is earlier. It will remain accessible until the order is completed. Attempts made outside of this time window will get 403 Forbidden response.

URL Params

orderId	<LALAMOVE_ORDER_ID>
driverId	driverId from /orders or /orders/{id} response
Response

driverId	<LALAMOVE_DRIVER_ID>
name	Name of the driver
phone	Phone number of the driver. To be encrypted in the future for privacy
plateNumber	License plate of the driver's vehicle. First two digits and the last digit is masked with asterisk for privacy
coordinates	Last updated location of the driver
 Driver's location is updated every 10 seconds and calling it more than the update interval will return the previous location
Add Priority Fee
POST 

https://rest.sandbox.lalamove.com/v3/orders/{orderId}/priority-fee
https://rest.lalamove.com/v3/orders/{orderId}/priority-fee
Body

{
    "data": {
        "priorityFee": "20"
    }
}
POST /v3/orders/{orderId}/priority-fee

Priority fees (commonly known as tips) are often used by customers to encourage drivers to accept an order.

Priority fees can only be added before the driver accepts the order. This is the same logic as our user mobile and web app.
Priority fees can be added to the same order on multiple occasions. However, please note the amount added subsequently must be greater than the previous one.
The amount added as a priority fee each time will replace the previous amount. For example, if you were to add HKD10 the first time, followed by a subsequent priority fee of HKD20, the total amount of the priority fee would be HKD20 (as the second request supersedes the first request).
This is a sample of add priority fee scenario.

Responses

200

See /orders or /orders/{orderId} for more details on the response

{
    "data": {
        "orderId": "107900701184",
        "quotationId": "1471722666401517645",
        "priceBreakdown": {
            ...
            "priorityFee": "20"
        }, 
        "driverId": "33522",
        "shareLink": "https://share.lalamove.com/?TH1234556&lang=th_TH&version=2",
        "status": "COMPLETED",
        "distance": {...},
        "stops": [...]
    }
}

402 You do not have enough credits for the action, please top-up your wallet.

{ "message": "ERR_INSUFFICIENT_CREDIT" }
422 The amount you attempted to add does not reach the minimum amount allowed..

{ "message": "ERR_EXCEED_MIN_TIPS" }
422 The amount you attempted to add exceed the maximum amount allowed.

{ "message": "ERR_EXCEED_MAX_TIPS" }
422 The amount is invalid, e.g. trying to add HKD20.001 while 0.1 cent is not supported in Hong Kong OR you attempted to add an amount lower than or equal to previous requests.

{ "message": "ERR_INVALID_TIPS" }
422 You are trying to add priority fee beyond allowable order status(es).

{ "message": "ERR_INVALID_ORDER_STATUS" }
URL Params

orderId	<LALAMOVE_ORDER_ID>
Edit Order
PATCH 

Sandbox: https://rest.sandbox.lalamove.com/v3/orders/{orderId}
Production: https://rest.lalamove.com/v3/orders/{orderId}
> Body

{
    "data": {
        "stops": [
            {
                "coordinates": {
                    "lat": "22.3354735",
                    "lng": "114.1761581",
                },
                "address": "Innocentre, 72 Tat Chee Ave, Kowloon Tong",
                "name": "Michal",
                "phone": "+85238485765",
                "remarks": "please call when you have arrived"
            },
            {
                "coordinates": {
                    "lat": "22.26308035863828",
                    "lng": "114.13081794602759",
                },
                "address": "Telegraph Bay, Cyberport Rd, 薄扶林 Cyberport 1",
                "name": "Michal",
                "phone": "+85212345679",
                "remarks": "please leave the package on the porch"
            },
        ],
    },
};
Responses

201 Created

{
    "data": {
        "orderId": "152610308320",
        "quotationId": "1526094807863316502",
        "priceBreakdown": {
            "base": "10",
            "extraMileage": "10",
            "surcharge": "11",
            "specialRequests": "3",
            "priorityFee": "20",
            "totalExcludePriorityFee": "34",
            "total": "54",
            "currency": "HKD"
        },
        "driverId": "79973",
        "shareLink": "https://share.sandbox.lalamove.com?HK100220516145738561910010013603412&lang=en_HK&sign=3b87850928c11309d26b6785d3e65336&source=api_wrapper",
        "status": "ON_GOING",
        "distance": {
            "value": "14417",
            "unit": "m"
        },
        "stops": [
            {
                "stopId": "1526094809054498905",
                "coordinates": {
                    "lat": "22.3354735",
                    "lng": "114.1761581"
                },
                "address": "Innocentre, 72 Tat Chee Ave, Kowloon Tong",
                "name": "Michal",
                "phone": " 85238485765"
                "remarks": "please call when you have arrived"
            },
            {
                "stopId": "1526094809054498906",
                "coordinates": {
                    "lat": "22.2630804",
                    "lng": "114.1308179"
                },
                "address": "Telegraph Bay, Cyberport Rd, 薄扶林 Cyberport 1",
                "name": "Michal",
                "phone": " 85212345679",
                "remarks": "please leave the package on the porch",
                "POD": {
                    "status": "PENDING"
                }
            }
        ],
        "item": {
            "weight": "LESS_THAN_3_KG",
            "categories": [
                "OFFICE_ITEM",
                "OTHERS"
            ]
        }
    }
}
422 Cancellation Forbidden

{ "message": "Cannot edit order, editing times exceeded" }
422 Unprocessable Entity

{ "message": "Cannot edit order" }
PATCH /v3/orders/{orderId}

We only allow each particular order to be edited ONCE. Edit Order is only available wherein the Delivery Status is ONGOING - which means the order was matched to a driver and before it's been picked up. The only information that can be edited are the drop-off details, the available edit options are either:

Editing existing drop-off locations; or
Adding new drop-off points; or
Remove existing drop-off points but must retain a minimum of 1
You must provide coordinate(s) and address(es) for editing order. The Pick-up details must be in exact values as originally placed, otherwise the Edit Order will fail. Should there be any price changes resulting from Order Edit, it will be reflected immediately. Kindly note that you need to include all the remarks that you submitted when you place the order, otherwise the remarks will be removed.

URL Params

orderId	<LALAMOVE_ORDER_ID>
This is a sample of the edit order scenarios.

Cancel Order
DELETE

https://rest.lalamove.com/v3/orders/{orderId}
Responses

204

409 Cancellation Forbidden

{ "message": "ERR_CANCELLATION_FORBIDDEN" }
DELETE /v3/orders/{orderId}

Please refer to our cancellation policy here.

Attempts to cancel an order that does not comply with our cancellation policy will get ERR_CANCELLATION_FORBIDDEN as response.

URL Params

orderId	<LALAMOVE_ORDER_ID>
Change Driver
DELETE

https://rest.lalamove.com//v3/orders/{orderId}/drivers/{driverId}
Responses

204

422 Cancellation Forbidden

{ "message": "ERR_CHANGE_DRIVER" }
DELETE /v3/orders/{orderId}/drivers/{driverId}

If the driver is not moving or not responsive, you will be able to change driver after 15 minutes of matching and before order is picked up by the driver. No additional fee would be incurred.

URL Params

orderId	<LALAMOVE_ORDER_ID>
driverId	<LALAMOVE_DRIVER_ID>
Body

reason	Reason for changing the driver. Must pass valid reasons.
See below values for more details
Reasons

Value	Description
DRIVER_LATE	Driver is late for delivery
DRIVER_ASKED_CHANGE	Driver requested the user to change
DRIVER_UNRESPONSIVE	Driver is not responding
DRIVER_RUDE	Driver is rude
This is a sample of the change driver scenario.

Get City Info
GET

Sandbox: https://rest.sandbox.lalamove.com/v3/cities
Production: https://rest.lalamove.com/v3/cities
Responses

200

{
    "data": [
        {
            "locode": "TH BKK",
            "name": "Bangkok",
            "services": [
                {
                    "key": "CAR",
                    "description": "Ideal for small to medium goods requiring extra care",
                    "dimensions": {
                        "length": {
                            "value": "0.9",
                            "unit": "m"
                        },
                        "width": {
                            "value": "1",
                            "unit": "m"
                        },
                        "height": {
                            "value": "0.7",
                            "unit": "m"
                        }
                    },
                    "load": {
                        "value": "100",
                        "unit": "kg"
                    },
                    "specialRequests": [
                        {
                            //this example shows an upcoming new key with 2 available specifications 
                            "name": "EXTRA_LENGTH_2",
                            "description": "Extra Length of 2.5 M (standard 1.8 M)",
                            "parent_type": "Extra Length",
                            "max_selection": 1,
                            "effective_time": "2023-10-20T06:26:39.721Z", 
                            "offline_time": ""
                        },
                        {
                            "name": "EXTRA_LENGTH_1",
                            "description": "Extra Length of 2.1 M (standard 1.8 M)",
                            "parent_type": "Extra Length",
                            "max_selection": 1,
                            "effective_time": "2023-10-20T06:26:39.721Z",
                            "offline_time": ""
                        },
                        {
                            // this example shows an active key an upcoming offline date 
                            "name": "DOOR_TO_DOOR",
                            "description": "Door to Door by Driver",
                            "max_selection": 1,
                            "effective_time": "",
                            "offline_time": "2023-10-20T06:26:39.721Z" 
            },
                        },
                        {
                            // this example shows an active key which doesn't have any scheduled offline date
                            "name": "ROUND_TRIP",
                            "description": "Round Trip",
                            "max_selection": 1,
                            "effective_time": "",
                            "offline_time": ""
                        }
                    ]
        },...
     }]
    }
}
GET /v3/cities

Adjust the "Market" value in your request header to retrieve information on supported configuration for all cities in the specified market. Please periodically query this endpoint to receive the latest configuration. The information provided in the API response are as follows:

Cities: city name and its corresponding location code (locode), i.e: Bangkok --> TH BKK
Services: available vehicles (services) along with its specification
Special requests: different special requests are provided for each service type.
 IMPORTANT UPDATE: If you are currently using any special requests, kindly check this endpoint to ensure that you are using the most updated service keys
Special Requests Object Components

Field	Description
name	Name of the special request. Use this value in your order payload if you want to use the additional service
description	Description of the special request
parent_type	Some special requests are structured in parent-child association with single or multi-selection capabilities. This is to indicate which special requests belong to the same parent.
max_selection	The maximum number of special requests under the same parent_type that can be applied for 1 quotation request. You can still choose special requests of different parent_type values can still be placed without complying with the max_selection criteria.
effective_time	The time when a new special request key will be available for use. The value of this field is only available before the key is online. This time stamp is displayed in UTC timezone.
offline_time	The time when an existing special request key will be disabled. The value of this field is only available before the key is disabled. This time stamp is displayed in UTC timezone.
Webhook
PATCH 

Sandbox: https://rest.sandbox.lalamove.com/v3/webhook
Production: https://rest.lalamove.com/v3/webhook
Automatically receive your order status updates using our webhook!

Body

{
    "data": {
        "url": "YOUR_WEBHOOK_URL"
    }
}
Responses

200

{
    "data": {
        "url": "YOUR_WEBHOOK_URL"
    }
}
422

{
    "errors": {
        "id": "ERR_INVALID_RESPONSE"
        "message": "Non-200 response received",
        "detail": "'url' validation failed: value is not a valid url"
    }
}
There are 2 options to setup the webhook:

Via API
Make sure your Webhook URL is sending 200 to our requests. For best practices, please refer to our deck.

Call the following endpoint to setup your webhook URL: PATCH /v3/webhook

Params

url	URL for Lalamove to send Webhook responses
Via Partner Portal
Configure your webhook URL and webhook version through the Webhook section under Developers tab in our Partner Portal. Once you succesfully set up your webhook URL, you can start seeing the webhook messages under Webhook Attempts section of this page.
 Make sure that you are selecting the correct environment through the toggle on the top right corner in the Partner Portal before configuring your webhook!


Webhook Update Types

You will receive a webhook push if any of the followings happen to your orders:
1. Status change (ORDER_STATUS_CHANGED)
Kindly refer to the Order Status section for the list of applicable order statuses.
2. Driver assigned (DRIVER_ASSIGNED)
3. Order amount changed when priority fee / tips to driver is added. (ORDER_AMOUNT_CHANGED)
4. Order replaced due to information changes by our customer service (ORDER_REPLACED)
In this case, the initial orderID will be replaced with the new one.
5. Wallet balance change for either addition / deduction to the balance. (WALLET_BALANCE_CHANGED)
6. For any changes via Order Edit through API. (ORDER_EDITED)
7. Event that tracks proof-of-delivery status. (POD_STATUS_CHANGED)
Kindly refer to the Stop Level Status section for the list of applicable POD statuses.
8. Event that tracks proof-of-pickup image URL and pickup DateTime.(POP_STATUS_CHANGED)
9. Event for the delivery code value and delivery code status. (DELIVERY_CODE_STATUS_CHANGED)
10. Event that tracks orders placed via API. (ORDER_CREATED)


Please refer to the following deck for further details and best practices on using our Webhook.

tutorial

Errors
The Lalamove API uses the following error codes and format.

{
    "errors": [
        { 
            "id": "ERR_REQUIRED_FIELD",
            "message": "Please verify your field.",
            "detail": "'name' validation failed: value cannot be null or empty."
        }, 
        { 
            "id": "ERR_REQUIRED_FIELD",
            "message": "Please verify your field.",
            "detail": "'market' validation failed: value cannot be null or empty."
        },
        ...
    ]
}
 For every error, Lalamove will return an errors payload that can contain several helpful error messages. It will always include requestId under meta that clients can use as a unique identifier for their request.
If you are having trouble understanding the errors, providing the requestId to our team will probably help you the fastest
Error Code	Meaning
400 -- Bad Request	Your request is invalid. Make sure the body is a valid JSON string.
401 -- Unauthorized	Your authorization token is incorrect. Make sure to follow instructions in Authentication.
402 -- Payment Required	You do not have sufficient credit for the action, please top-up your wallet.
403 -- Forbidden	Request has been blocked for security reasons.
404 -- Not Found	The specified order or driver could not be found.
422 -- Unprocessable Entity	There are a list of possible reasons, please refer to error id, message, detail section for details. Another possible cause is access to the targeted order or driver details is unauthorized. Some of the common errors related to this error code are:
- ERR_INSUFFICIENT_STOPS: Number of stops are less than 2 OR the request body structure is incorrect. I.e: {data: {...}}
- ERR_ORDER_NOT_FOUND: The requested Lalamove Order ID does not exist.
- ERR_INVALID_FIELD: The field(s) in the request body is incorrect or written in wrong format. Kindly check the error message for further details.
- ERR_MISSING_FIELD: The required field(s) has not been included in the request body. Kindly check the error message for further details.
- ERR_TOO_MANY_STOPS: The number of stops requested is exceeded the allowable number of stops (1 pickup and 15 drop-offs).
- ERR_INVALID_QUOTATION_ID: The requested Lalamove Quotation ID is either wrong or expired.
429 -- Too Many Requests	You're sending in too many requests.
Rate limit for each API can be found on the table below
Please check your RateLimit-Limit-Postxxx and RateLimit-Remaining-Postxxx in your header and wait accordingly until the RateLimit-Reset-Postxxx if there's no remaining rates left. ('xxx' represents the name of corresponding API)
500 -- Internal Server Error	We had a problem with our server. Try again later.
API	Sandbox Rate Limit (Requests per Minute)	Production Rate Limit (Requests per Minute)
Get Quotation	30	100
Get Quotation Details	50	300
Place Order	30	100
Get Order Details	50	300
Get Driver Details	50	300
Change Driver	30	100
Cancel Order	30	100
Add Priority Fee	30	100
Get City Info	50	300
Getting on Board
Customers have their own use case scenarios - we do not mandate customers to use all of our APIs. However, please make sure your integration includes both /v3/quotations and /v3/orders.
API testing in our Sandbox environment is not mandatory. However, it's recommended that you can test your intended business flow in this environment.
Before rolling out the integration to production (or commonly known as "Go-Live"), make sure to top up your Production wallet in order to retreive your Production API credentials in Partner Portal.
If applicable, ensure that your webhook URL has been configured correctly in Partner Portal. More details on Webhook setup can be found in Webhook section.
Once you are ready, drop us a note at partner.support@lalamove.com
You are set! Start submitting orders immediately.
Note: kindly check on the Authentication section for more detailed steps to retrieve your Sandbox and Production API Keys and Secrets.

Tutorial
To help you kick-start, you can check out this deck. It is a step-by-step walkthrough of how to make API calls using POSTMAN.

tutorial

Postman Configurations
Markets	City	POSTMAN Environment	POSTMAN Collection
Hong Kong SAR	Hong Kong (HK)	Environment	Collection
Support
Drop us an email at partner.support@lalamove.com with your questions or feedbacks. Your input is much appreciated! We will get back to you as soon as possible. Kindly refer to the table below on our Support SLA.

Environment	Impacting Services?	Response SLA	Resolution SLA
Production	Impacted	2 hour	8 hour
Production	Not Impacted	3 hour	1 day
Sandbox	Impacted	5 hour	2 days
Sandbox	Not Impacted	8 hour	3 days
Kindly note that the SLAs are bound to changes depending on the severity of the issue

In use of the Lalamove API and the Lalamove Services, this means you will be governed by and shall be subject to the API Terms & Conditions. You also acknowledged that before you use the Lalamove API and services, you have read, understood and voluntarily agreed to the relevant Terms & Conditions and Privacy Policy.

shellnode.js
