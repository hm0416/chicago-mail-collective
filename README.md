# The Chicago Mail Collective: website

React (Vite) + React Router. Pages: Home, About, Community & Artists, Subscribe, Past Issues (and an issue reader).

## Run it locally
    npm install
    npm run dev          # http://localhost:5173
(The archive unlock needs the Netlify function, so use `npx netlify dev` to test that locally.)

## Put it online (Netlify, free)
1. Push this folder to GitHub, then "Add new site → Import from Git" in Netlify. Build settings are already in `netlify.toml`.
2. In Site settings → Environment variables, add the values from `.env.example`.

## Make the pieces real
- **Paywall:** set `SUBSCRIBER_CODE` and `ISSUE_1_PDF`, `ISSUE_2_PDF` (links to the PDFs) as Netlify environment variables. The code is checked on the server (`netlify/functions/archive.js`), and the PDF links are only sent after it's right. Give the code to subscribers. Note: the story excerpts on the issue pages are public; only the PDFs are protected. Host the PDFs somewhere private, not linked elsewhere.
- **Placeholders to fill in:** Instagram handle (`.env`), Issue 1 date and the artist credits (`src/data.js`, `src/pages/Community.jsx`), Douglas Tsui's bio, how contributors are paid (`src/pages/Community.jsx`).

## Stripe (how people pay)
Subscribers pay by card on Stripe's checkout page. Card subscribers are charged the sliding-scale amount they pick ($5, $10 or $15) every 2 months, and you get an email at hifamousou@gmail.com only after Stripe confirms the payment.
1. Create a Stripe account (stripe.com). Stay in **Test mode** first.
2. Developers → API keys: copy the **Secret key** into Netlify as `STRIPE_SECRET_KEY`.
3. Developers → Webhooks → Add endpoint: URL `https://YOUR-SITE.netlify.app/.netlify/functions/stripe-webhook`, event `checkout.session.completed`. Copy its **Signing secret** into Netlify as `STRIPE_WEBHOOK_SECRET`.
4. Sign up at resend.com **with hifamousou@gmail.com**, create an API key, and add it as `RESEND_API_KEY`. (Resend's free starter sender only delivers to the email you signed up with. To send elsewhere, verify a domain.)
5. Redeploy (Deploys → Trigger deploy). Test with card `4242 4242 4242 4242`, any future date, any CVC.
6. When it works, switch Stripe to **Live mode** and replace the two Stripe keys with the live ones.
To let subscribers cancel, turn on the Customer portal in Stripe (Settings → Billing → Customer portal).
