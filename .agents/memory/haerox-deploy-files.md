---
name: HAEROX deploy file list
description: Which files must be copied to the Hostinger deploy branch, and how SEO meta blocks are maintained.
---
Deploy (force-push to HAEROX repo `main`) must copy: `*.html css js images favicon.ico sitemap.xml robots.txt llms.txt .htaccess` (and 404.html is covered by *.html).
**Why:** SEO pack (Aug 2026) added non-HTML root files; forgetting them silently breaks sitemap/robots on the live site.
**How to apply:** every deploy uses the /tmp/deploy fresh-git-init flow — keep the cp list in sync when new root files are added.
Also: every page head has an injected `<!-- SEO --> ... <!-- /SEO -->` block — regenerate by stripping between markers, never hand-edit duplicates. JSON-LD lives in index (LocalBusiness), contact (FAQPage), services (ItemList/Service).
