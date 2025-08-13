---
title: 'Access Google APIs using OAuth2 with Nuxt and Auth0'
description: ''
slug: '/access-google-apis-using-oauth2-with-nuxt-auth0'
date_created: '2021-08-22'
date_modified: '2021-08-22'
author: 'RD'
is_published: true
show_in_recent: true
is_project: false

---
> ***This note is work in progress...***

This note is about my experiments done to access Google APIs using OAuth2 in a Nuxt(VueJs) Single Page App(SPA).

## Context

I am building a note taking 'Progressive Web App(PWA)', where I wanted to leverage the user's Google Drive in order to enable cross device syncing of the notes. Pretty simple requirement? eh!

Prima facie, it should be as follows:

1. User goes to sync settings in the app and click on the button, 'connect to drive'.
2. User is presented with Google's Consent Screen, where he/she will authorize the app to access the Google Drive on user behalf.
3. Application gets the token back and use it to interact with the Google Drive APIs.

~End of story?~

---Secure?---

Nope, not really. The access token that the application received in the step 2 above is returned as part of the URL while redirecting to your application. Therefore, its part of your browser history, your ISP is logging it and that free WIFI of your favorite coffee café could also be doing the logging(for sure). Thus, they all can also use that token to access your files in your Google Drive. Sounds scary!

---Expires!---

Thus to mitigate the risk a bit, most OAuth servers provide a short lived token, which means the token you got back has an expiration time attached to it. Which is 3599 seconds ~ 1hour(in case of Google APIs) and after that the token is invalid and can not be used to access the user's resources, Drive's content in our case.

---Implicit flow---

So you need to get a new token after it expires, which means repeat the process of acquiring the token. Which is fine if your application needs to access the resources once or couple of times. 
And there is a term for this type of flow in OAuth2 specification. It is called OAuth Implicit Grant Flow.

---offline access?---

But in our case, the application should be able to do the syncing frequently, daily and sometimes in the background when user is not even accessing the app. This type of access requires a special permission(scope) to be mentioned while requesting the authorization to access the protected resources, Google Drive.
This scope is called 'offline-access', which simply means the client/app can access your data even when you are not online, means you are offline. Thus offline access.

Having offline-access means that you can get a new access token any time without the user interaction. For this, you send a request to the Google's server for access token and it gives you back one. 

---secret key---

Notice there is no consent screen involved this time in the flow. Thus Google server raises two important questions to the client app:
a) Who are you? Why should I trust you?
b) If, at all, I trust you, which end-user are you asking the access token for?

To answer first question  i.e. client application provides a special key, while requesting the access token to prove its authenticity. This proof of authenticity is known as Secret Key. Which should only be known to the client server and Google servers. This key is generated once, when you create OAuth credentials in the Google Cloud project.
The secret key establishes a trust relationship between Google servers and the client server.

---refresh token---

To answer second question that is how would Google servers know about which end-user, the access token needs to be generated. This is solved via a separate token called Refresh Token. This token is shared with the client when the user authorizes the app for the very first time using the consent screen. Client app then stores it somewhere securely possibly a database and sends it along the call to request a new access token.

---auth code flow---

Here's how all this happens step by step:

1. User clicks a button to start the authorization flow
2. User is presented with Google Consent screen with offline access permission mentioned explicitly and user authorizes the application.
3. Application gets a code back.
4. Application sends this code to its backend, where it is exchanged for the refresh token and access token from the Google API server.
5. Application backend stores the refresh token securely in its database and uses the access token to interact with the Google Drive APIs
6. In future, backend can get a new access token by presenting the same refresh token again to the Google servers along with the secret key.

This whole flow is called OAuth Auth Code Grant Flow. Because it involves an auth code exchange thus the name.

---backend?---

But why do we need to send the code to the backend, when that exchange call can be made from the browsers too?
True, it can be made. But its not the secure way. Because that call results in the generation of a refresh token which a long lived token in comparison to the short lived access token. If any hacker gets its hands on the refresh token, then he/she can use that refresh token to get new access token. Thus access the user's data any time without user knowledge. So its dangerous to exchange the auth code for refresh token on browser.



---



Video notes:

Title: Access Google APIs using OAuth 2.0 | Nuxt (VueJs) | Auth0

- First screen, agenda and clear expectations
  - This is in the context of authorization not authentication for which you would use identity token not access token.
  - We'll use Nuxt(VueJs), but once you understand the steps involved, you can replicate that with any tech stack.

---

Resources:

- Create file in Google Drive using REST API
  https://stackoverflow.com/questions/34905363/create-file-with-google-drive-api-v3-javascript/44527113?noredirect=1#answer-35182924
  - Create folder
    https://stackoverflow.com/questions/34905363/create-file-with-google-drive-api-v3-javascript

Google Drive

- JS quickstart
  https://developers.google.com/drive/api/v3/quickstart/js#step_1_set_up_the_sample
- Store application specific data
  https://developers.google.com/drive/api/v3/appdata#node.js
- GAPI to create file in folder
  https://developers.google.com/drive/api/v3/folder#create
- Mime types
  https://developers.google.com/drive/api/v3/mime-types
- Token info
  https://developers.google.com/identity/sign-in/web/backend-auth
- Use refresh token to get access token
  https://developers.google.com/identity/protocols/oauth2/web-server#httprest_7

Auth0

- Auth0 access tokens
  https://auth0.com/docs/tokens/access-tokens/get-access-tokens
- Auth0 refresh tokens
  https://auth0.com/docs/tokens/refresh-tokens
- Identity Provider Access Tokens
  https://auth0.com/docs/tokens/identity-provider-access-tokens
- Management API tokens for SPA and its limitations
  https://auth0.com/docs/tokens/management-api-access-tokens/get-management-api-tokens-for-single-page-applications
- Add scopes to call IDP APIs
  https://auth0.com/docs/connections/adding-scopes-for-an-external-idp
- Management API tokens for SPA
  https://auth0.com/docs/tokens/management-api-access-tokens/get-management-api-tokens-for-single-page-applications
- 

