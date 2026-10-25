# Hostinger deployment

Repository: https://github.com/PrajaktaAdlytica/LeakEvidence

- `main`: editable source, committed assets and generated `dist`.
- `hostinger`: only the contents of `dist`, with `index.html` at branch root.

## First deployment

1. hPanel → Websites → Create website → Custom PHP/HTML → empty website.
2. Assign `leakevidence.com`. You need an active web/cloud hosting plan with an available ordinary website slot; domain registration alone is not hosting.
3. Open this website's Dashboard → Advanced → Git → Connect with GitHub.
4. Grant Hostinger access to this repository, then select it.
5. Choose branch **hostinger**, deployment directory **public_html**. Do not select main or a public_html/dist subdirectory. Generic Git does not build the site.
6. Back up any existing files in that destination before deploying. For a new site, remove only its default placeholder after confirming no wanted content exists.
7. Click Deploy. Git auto-deployment follows pushes to hostinger where offered; otherwise use Redeploy.
8. Follow hPanel's domain connection prompt and exact DNS values. Preserve email MX/TXT records. If nameservers are external, edit DNS with that provider. Allow up to 24 hours for propagation.
9. Verify the website SSL certificate is active and enable HTTPS in hPanel. Check root and www, a product route, the synthetic demo and a nonexistent URL.

## Archive fallback

Upload `LeakEvidence-Hostinger-Upload.zip` through File Manager and extract its contents directly into public_html. The resulting file must be public_html/index.html, not public_html/dist/index.html. This zip contains the deployment files only.

## Update workflow

Run from the repository root:

```sh
SITE_ORIGIN=https://leakevidence.com python3 src/build.py
python3 src/check_site.py
node --test src/demo.test.mjs
git add src dist docs README.md HOSTINGER.md .gitignore package.json
git commit -m "Update LeakEvidence website"
git push origin main
git subtree split --prefix=dist -b hostinger-next
git push origin hostinger-next:hostinger
git branch -D hostinger-next
```

No force push is needed. Hostinger serves committed files; it does not run Python. Existing media, fonts and identity assets are committed in dist; keep those assets when rebuilding.

## Current scope

Forms, sign-in and analytics remain local previews. PHP hosting does not connect them to email or a database. Search indexing remains disabled for the concept preview. Some final interactive QA checks are pending; see docs/Final-QA-Review.html. No Hostinger/DNS changes were made as part of the repository push.

## Official references

- https://docs.hostinger.com/websites/git
- https://www.hostinger.com/support/1583214-how-to-add-a-website-in-hostinger/
- https://docs.hostinger.com/getting-started/creating-your-first-website
