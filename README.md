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
- **Sign-ups:** create a free form at formspree.io, paste its URL into `VITE_FORM_ENDPOINT`. Each sign-up (name, email, address) is emailed to you. Without it, the form opens an email to you instead.
- **Venmo:** set `VITE_VENMO_HANDLE`. Payments are manual: when a Venmo payment arrives, add the person to your mailing list. Venmo has no recurring-payment tool, so ask subscribers to send $10 every other month (or switch to Stripe later).
- **Paywall:** set `SUBSCRIBER_CODE` and `ISSUE_1_PDF`, `ISSUE_2_PDF` (links to the PDFs) as Netlify environment variables. The code is checked on the server (`netlify/functions/archive.js`), and the PDF links are only sent after it's right. Give the code to subscribers. Note: the story excerpts on the issue pages are public; only the PDFs are protected. Host the PDFs somewhere private, not linked elsewhere.
- **Placeholders to fill in:** Instagram handle (`.env`), Issue 1 date and the artist credits (`src/data.js`, `src/pages/Community.jsx`), Douglas Tsui's bio, sliding-scale tiers (`src/pages/Subscribe.jsx`), how contributors are paid (`src/pages/Community.jsx`).
