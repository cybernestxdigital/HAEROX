---
name: HAEROX cache busting
description: Why and how to bump asset version query strings on the static HAEROX site
---

Rule: whenever `css/style.css` or `js/script.js` changes, bump the `?v=N` query on their `<link>`/`<script>` tags across ALL html pages before verifying or pushing. Same for replaced images (e.g. `office.jpg?v=2`).

**Why:** Both the live Hostinger site and the screenshot-tool browser aggressively cache assets. Twice a correct CSS fix appeared "not applied" (invisible black-on-black social icons on live; portfolio grid unchanged in screenshots) purely because the old versioned file was cached.

**How to apply:** one-liner node script replacing `css/style.css\?v=\d+` and `js/script.js\?v=\d+` across `artifacts/haerox/*.html`, then screenshot-verify, then push both GitHub branches (`source` = workspace, `main` = orphan static deploy).
