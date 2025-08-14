---
title: 'Create WebSocket API using AWS API Gateway | HTTP & Lambda Integration'
description: 'Lets implement a WebSocket API using AWS API Gateway and integrate it with HTTP API and lambda backend.'
slug: '/create-websocket-api-using-api-gateway'
date_created: '2022-09-24'
date_modified: '2022-09-24'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false
tags: aws, api-gateway, websocket, lambda
---

![AWS Kinesis Stream | Producer & Consumer hands on with Experiments using Java +  @LocalStack](/images/yt_thumb_websocket_gateway_api.png)

---


# Steps to follow for WebSocket API creation

1. Build API and give 
    1. API name
    2. Route selection expression  —>  `request.body.action` 
2. Add routes
    1. Add $connect route
    2. Add $disconnect route
3. Attach integrations
    1. $connect
        1. Type → HTTP
        2. Method → POST
        3. URL → *\<enter api-endpoint here>*/connect 
    2. $disconnect
        1. Type → HTTP
        2. Method → POST
        3. URL → *\<enter api-endpoint here>*/disconnect 
4. Add stages
    1. name → prod
5. Create and deploy

---
</br>
</br>

# Edit $disconnect route

Open ‘Integration Request’

- Uncheck ‘Use HTTP Proxy integration'
- Click ‘Save’
- Edit ‘Request Templates’
    - Template Selection Expression → `\$default`  → click ‘check’ button
    

---

</br>
</br>

# Edit $connect route

Open Integration Request

- Uncheck ‘Use HTTP Proxy integration'
- Click ‘Save’
- Edit ‘Request Templates’
    - Template Selection Expression → `\$default`  → click ‘check’ button

Add integration response

- Open integration response
    - Response Selection Expression will be `${integration.response.statuscode}`
- Add Response
    - Response Key → `$default`  → click ‘check’ button
    - Edit ‘Template Selection Expression’ → `\$default` → click ‘check’ button
    

---

# Authorizers

Click ‘Create New Authorizer’

- Name → ****`lambda-authorizer`****
- Lambda Function → `lambda-authorizer (us-east-1)`
- Identity Sources
    - Query String →  token
- Click ‘Create’ → ‘Grant & Create’

Attach the authorizer to `$connect` route

- Open ‘Route Request’
- Click ‘Pencil icon’ of Authorization
- Select the configured Lambda Authorizer and save
    - If you don’t see the lambda → refresh the page once

---

# Update `$connect` Route using AWS CLI

### First gather some information

1. `API ID`
    - Note down API ID from URL of the API page of AWS Console
2. `RouteId` and `IntegrationId`
    1. Execute below command
        - `aws apigatewayv2 get-routes --api-id bnzlep5vqk`
    - Note down `RouteId` and `Target` from response of below command, 
    where `RouteKey` is `$connect`
    - ‘Integration Id’ is the alphanumeric part after the slash in `Target` value. 
    Eg: `f3m2883` is the ‘Integration Id’ in the`"Target": "integrations/f3m2883"`

### Now update the route as follows

<aside>
⚠️ Do replace the values of `api-id` and `route-id`

</aside>

```bash
aws apigatewayv2 update-route \
--api-id bnzlep5vqk \
--route-id ik7cvjt \
--request-parameters '
{
    "route.request.querystring.stocks":{"Required":true}
}'
```

### Update `$connect` Integration using AWS CLI

<aside>
⚠️ Do replace the values of `api-id` and `integration-id`

</aside>

```bash
aws apigatewayv2 update-integration \
--integration-id f3m2443 \
--api-id bnzlep5vqk \
--request-parameters 'integration.request.querystring.stocks'='route.request.querystring.stocks'

aws apigatewayv2 update-integration \
--integration-id f3m2443 \
--api-id bnzlep5vqk \
--request-parameters 'integration.request.querystring.connectionId'='context.connectionId'

aws apigatewayv2 update-integration \
--integration-id f3m2443 \
--api-id bnzlep5vqk \
--request-parameters 'integration.request.querystring.userId'='context.authorizer.userId'

aws apigatewayv2 update-integration \
--integration-id f3m2443 \
--api-id bnzlep5vqk \
--request-parameters 'integration.request.querystring.orgId'='context.authorizer.orgId'
```

You can confirm the updates by fetching the integration details as below

```bash
aws apigatewayv2 get-integration \
--integration-id f3m2443 \
--api-id bnzlep5vqk
```

---

---

# Update `$disconnect` Integration using AWS CLI

### First gather some information

1. `API ID` remains same from the previous step
2. `RouteId` and `IntegrationId`
    1. Execute below command
        - `aws apigatewayv2 get-routes --api-id bnzlep5vqk`
    - Note down `RouteId` and `Target` from response of below command, 
    where `RouteKey` is `$disconnect`
    - ‘Integration Id’ is the alphanumeric part after the slash in `Target` value. 
    Eg: `f3m2883` is the ‘Integration Id’ in the`"Target": "integrations/f3m2883"`

### Update `$disconnect` Integration using AWS CLI

<aside>
⚠️ Do replace the values of `api-id` and `integration-id`

</aside>

```bash
aws apigatewayv2 update-integration \
--integration-id 478fpcf \
--api-id bnzlep5vqk \
--request-parameters 'integration.request.querystring.connectionId'='context.connectionId'
```

---

# Deploy & Test

Refresh the console page once and **DEPLOY** 🚀

To test use below command (make sure the tool is installed)

```bash
wscat -c "wss://ojp5zwbo3k.execute-api.ap-southeast-1.amazonaws.com/prod?stocks=aapl,goog"
```

---

# Configure API

After deployment, the API endpoint should be configured in the `backend` project as an environment variable like below

| WS_API_ENDPOINT | https://bnzlep5vqk.execute-api.ap-southeast-1.amazonaws.com/prod |
| --- | --- |

<aside>
⚠️ When copied ‘Connection URL’ from API Gateway, `/@connections` should be removed from the endpoint if going to us with API Gateway Management SDK

</aside>




---


|  HIH  
|  Take care  
~ @raevilman