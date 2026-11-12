# WhatsApp enquiry delivery

The enquiry API is server-side. Do not add WhatsApp credentials to `VITE_*`
variables, React code, or any file served from `public/`.

## Configure Meta Cloud API

1. Register a separate sender phone number in the Meta WhatsApp Business
   Platform and create a permanent/system-user access token with the
   `whatsapp_business_messaging` permission.
2. Set `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_BUSINESS_ACCOUNT_ID`, and
   `WHATSAPP_ACCESS_TOKEN` on the server environment.
3. Set `WHATSAPP_RECIPIENT_NUMBER` to the international-format number that
   should receive owner notifications. For this setup, the desired recipient
   is `+919718548522`; it is server-only and is never returned to the browser.
   The notification recipient must be able to receive WhatsApp messages from
   the configured sender. During Meta development mode, add it as a permitted
   test recipient. Use a distinct sender number and notification recipient.
4. Create and obtain approval for a utility message template, then set
   `WHATSAPP_TEMPLATE_NAME`, `WHATSAPP_TEMPLATE_LANGUAGE`, and the current
   `WHATSAPP_API_VERSION`.

The approved template body must include the six body parameters in this order:

```text
NEW WEBSITE ENQUIRY – TECHBERRY

Name: {{1}}

Email: {{2}}

Contact Number: {{3}}

Interested Service: {{4}}

Project Query:
{{5}}

Source: TechBerry Website

Submission Date: {{6}}
```

The website consent checkbox covers use of the submitted contact details to
respond to the enquiry. Follow Meta's policy for any WhatsApp recipient
opt-in, approved templates, and permitted messaging.

Copy `.env.example` to `.env` for local server configuration. The `.env` file
is ignored by git. Local development uses the Vite API middleware with `npm
run dev`. For production, build the frontend with `npm run build`, then run
`npm start` and route both the website and `/api` requests to this Node server.
The deployment must provide persistent server-side environment variables and
HTTPS. If deployed behind a reverse proxy, set `TRUST_PROXY` only to the
verified numeric proxy hop count for that hosting setup.

The status endpoint returns only whether the required server configuration is
present. Missing settings keep the form in an explicit awaiting-configuration
state; no enquiry is reported as delivered unless Meta returns a message ID.
