# Tuan Kiet Retreat Audit Report

## Executive opinion

The project has a strong visual foundation and a believable booking journey. The frontend feels intentional, calm, and differentiated from a generic hotel template. The backend is appropriately small for a prototype, but the original starter test and schema setup needed maintenance before the project could be considered deployment-ready.

After this review, the project is in good prototype shape: the site builds, its booking API validates input, its family dashboard uses platform authentication, D1 migration history is current, and the test suite reflects the real product rather than the starter skeleton.

It is not yet a production hotel commerce system. It still needs payment processing, real availability/inventory rules, email notifications, observability, and a deliberate data-retention/privacy policy.

## What I inspected

- public homepage, booking form, room deep links, gallery, FAQ, map, and responsive CSS
- booking API route and D1/Drizzle schema
- private `/admin/bookings` dashboard and ChatGPT/Sites authentication helper
- Vite, vinext, Cloudflare Worker, Sites hosting metadata, and migrations
- package scripts, lint configuration, build output, and rendered-product tests

## Changes made

### Frontend

- Removed stale starter-preview test assumptions and replaced them with real product checks.
- Preserved the existing editorial visual system and responsive layouts.
- Added a visible sign-out path to the private family dashboard.
- Kept accessible navigation labels, form labels, headings, image alt text, and reduced-motion rules.
- Added validation for room deep-link selection through the existing `room` query parameter.

### Backend and data

- Tightened booking validation for exact ISO calendar dates.
- Restricted booking room names to the three rooms presented by the UI.
- Added maximum lengths for names, email, phone, and notes to reduce malformed or abusive payloads.
- Added D1 indexes for booking creation time and status because the admin view sorts and will commonly filter by those fields.
- Generated and inspected a new Drizzle migration for the indexes.

### Authentication

- Kept the existing platform-provided Sign in with ChatGPT flow for the private family dashboard.
- Added an explicit sign-out link that safely returns to `/admin/bookings`.
- Confirmed authorization is checked server-side with `requireChatGPTUser`, not only in the UI.

### DevOps and quality

- Added a public health endpoint through the platform's existing site/runtime path: the hosting platform can verify the deployment without exposing booking data.
- Updated README commands and test descriptions to match the actual site.
- Added `AUDIT_REPORT.md` as project documentation.
- Replaced starter loading-skeleton tests with four product-level checks.

## Validation results

```text
npm run build  PASS
npm run lint   PASS with 2 non-blocking image warnings
npm test       PASS — 4 tests
git diff --check PASS
```

The two lint warnings are about remote `<img>` tags and potential image optimization. They are not runtime failures. They can be addressed later by moving the image set to a configured image pipeline or converting the layout to `next/image` with explicit remote image configuration.

## Recommended next improvements

1. Add real room inventory and overlap checks before confirming availability.
2. Add booking confirmation email and an admin status update workflow.
3. Add payment through a provider only after the booking and cancellation rules are defined.
4. Add rate limiting and bot protection to the public booking endpoint.
5. Add privacy/consent language and a retention policy for guest contact information.
6. Add error monitoring and structured logs before real guest traffic.
7. Keep the Sites D1 binding as the production source of truth; do not introduce browser storage for bookings.
