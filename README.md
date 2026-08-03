<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/f4eb2737-b0e6-4596-9467-56a685e889c5

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Contact Form (Resend)

The contact form sends submissions to your inbox through [Resend](https://resend.com). The Express server (`server.js`) exposes `POST /api/contact`, which validates the payload and emails the message via Resend. The API key stays server-side and is never exposed to the browser.

**Setup:**

1. Create a free account at https://resend.com and copy an API key (`re_...`).
2. Copy `.env.example` to `.env.local` and set:
   - `RESEND_API_KEY` — your Resend API key.
   - `CONTACT_TO_EMAIL` — the inbox that receives submissions (defaults to `shahmeertalib5960@gmail.com`).
   - `CONTACT_FROM_EMAIL` — sender address. Use `onboarding@resend.dev` while testing (Resend only delivers to your own verified email). For production, verify a domain in Resend and use e.g. `contact@yourdomain.com`.

**Run:**

- Frontend only: `npm run dev` (Vite on port 3000; `/api` is proxied to the backend).
- Backend only: `npm run dev:server` (Express on port 8080).
- Production: `npm run build && npm start` — the server serves `dist/` and the API together.

Deploying on Cloud Run/AI Studio: set `RESEND_API_KEY` (and `CONTACT_FROM_EMAIL`) as secrets/environment variables and use `npm start` as the start command.
