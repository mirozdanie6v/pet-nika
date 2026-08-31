# PET NIKA

Production-oriented migration of the approved PET NIKA HTML prototype to **Next.js + TypeScript + React App Router**, prepared for **Cloudflare Workers via vinext**.

## UX/UI source of truth

The approved standalone HTML prototype is the canonical UX/UI reference for PET NIKA.

Canonical source:

`uxui-source/pet-nika-uxui-source.html`

Generate the production static HTML with:

```bash
npm run uxui:sync
```

This command copies the canonical source directly to `public/index.html` and verifies that both files are byte-identical. The sync step must preserve the approved UX/UI exactly: no redesign, minification, optimization, image externalization, asset replacement, or other visual/content transformation. See `uxui-source/README.md` for the rule set.

The canonical source is committed to the repository. CI verifies that `uxui-source/pet-nika-uxui-source.html` and `public/index.html` remain byte-identical, so every approved UX/UI change should be followed by `npm run uxui:sync` before commit.

## What is included

- Client Mini App: Home, Services, Booking, Pet, Profile
- Explicit **ПРОФИЛЬ КЛИЕНТА** mode
- Explicit **ДЕМО-АДМИНКА** mode
- Persistent navigation on mobile and desktop
- Editable pet profiles, local image upload, multiple pets
- Shared client/admin state persisted in `localStorage`
- Demo requests and request status updates
- Schedule, clients, pets, reminders, broadcasts, analytics
- RU / EN / VI language state
- Mobile-first safe-area layout and 16px form controls for iOS

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
npm run check:vinext
npm run build:vinext
npm run uxui:sync
git diff --exit-code -- uxui-source/pet-nika-uxui-source.html public/index.html
```

CI additionally performs a byte-for-byte comparison of the canonical UX/UI source and `public/index.html`.

## Cloudflare Workers

Cloudflare currently recommends vinext as the default path for new Next.js applications on Workers.

```bash
npm run preview
npm run deploy
```

For a local interactive login use `npx wrangler login`. In CI use Cloudflare build secrets / account configuration; never commit tokens.

## Deployment configuration

- Worker: `pet-nika`
- Config: `wrangler.jsonc`
- App Router Worker entry: `vinext/server/app-router-entry`
- Static client assets: `dist/client`
- `nodejs_compat` enabled

No D1/KV/R2 bindings are added yet because the current product is demo-first and uses browser state only.

## Future production integrations

- real auth / staff roles
- persistent database (D1 or external CRM)
- R2 for pet documents/images
- Telegram / WhatsApp / Zalo notifications
- real appointment availability and clinic staff
- audit logs and consent/privacy layer
