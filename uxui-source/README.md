# PET NIKA UX/UI source

This directory contains the canonical UX/UI source for PET NIKA.

## Canonical file

Publish the approved HTML prototype here under the stable name:

`uxui-source/pet-nika-uxui-source.html`

The currently approved source is the uploaded PET NIKA v28 HTML prototype. It is the **single source of truth for UX/UI**.

## Relationship to production `index.html`

`public/index.html` must be produced from the canonical source by an exact byte-for-byte copy. Do not manually redesign, optimize, reformat, minify, externalize images, replace embedded assets, or otherwise alter the UX/UI while creating `public/index.html` unless a separate change is explicitly approved.

Use:

```bash
npm run uxui:sync
```

The sync script:

1. requires `uxui-source/pet-nika-uxui-source.html` to exist;
2. validates that it is an HTML document;
3. copies it directly to `public/index.html`;
4. verifies that source and target bytes are identical;
5. prints SHA-256 for auditability.

The source file itself should remain in this directory so future changes can always be compared against the approved UX/UI baseline.
