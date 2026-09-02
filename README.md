# Tuan Kiet Retreat

A family-run hotel booking website for Tuan Kiet Hotel in Gia Lai province, Vietnam,
built on [vinext](https://github.com/cloudflare/vinext) with Cloudflare D1 and
Drizzle for booking storage.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Booking Features

- Hero, quick-availability widget, and a room gallery with pricing and tags
  (breakfast included, crib on request, free cancellation, etc.)
- A full booking request form (`app/booking-form.tsx`) that validates dates,
  guest count, and contact details client-side, then posts to
  `app/api/bookings/route.ts`, which stores the request in D1 via the
  `bookings` table (`db/schema.ts`) and returns a booking reference number
- Photo gallery, guest reviews, an FAQ accordion (check-in/out, cancellation,
  children, pets, breakfast, parking), and a location/contact section with an
  embedded map
- A private family dashboard at `/admin/bookings` that lists every booking
  request. It's protected by Sign in with ChatGPT (`requireChatGPTUser`), so
  only the signed-in site owner can see guest contact details

## Included Shape

- edit site code under `app/`
- `.openai/hosting.json` declares the Sites D1 binding (`DB`) used for bookings
- `vite.config.ts` simulates declared bindings for local development
- `db/schema.ts` defines the `bookings` table
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed — run
  `npm run db:generate` again after changing `db/schema.ts`

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the starter and verify its rendered loading skeleton
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
