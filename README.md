# Code Quality Management

A Docusaurus-based knowledge base for the **Automotive Embedded Software Code Quality Assurance** document set — framework, management procedure, engineering guidelines, assurance and release checklists.

- Dark-first, refined documentation theme
- Served locally on **port 3020**
- Ready to deploy to **GitHub Pages** and **Cloudflare Pages**
- Custom-domain ready

## Local development

```bash
npm install
npm start          # dev server on http://localhost:3020
```

## Production build

```bash
npm run build      # outputs static files to ./build
npm run serve      # preview the production build on http://localhost:3020
```

## Configuration

Edit the deployment constants at the top of `docusaurus.config.ts`:

```ts
const GITHUB_USER = 'your-github-username';        // your GitHub username
const GITHUB_REPO = 'code-quality-management';     // repository name
const CUSTOM_URL  = 'https://codequality.yourdomain.com'; // your personal domain
```

`baseUrl` is `'/'`, which is correct once a custom domain is attached to either host.
If you serve from `https://<user>.github.io/<repo>/` without a custom domain, set
`baseUrl: '/<repo>/'`.

The custom domain for GitHub Pages is declared in `static/CNAME`
(change it to your real domain).

---

## Option A — Deploy to GitHub Pages

### A1. Automated (GitHub Actions, recommended)

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Code Quality Management site"
   git branch -M main
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and deploys on every
   push to `main`.

### A2. Manual from the CLI

```bash
# set organizationName/projectName in docusaurus.config.ts first
npm run build
npm run deploy:gh
```

### A3. Attach your personal domain (GitHub Pages)

1. Put the domain in `static/CNAME` (already present as a placeholder).
2. **Settings → Pages → Custom domain**, add e.g. `codequality.yourdomain.com`.
3. Create DNS records with your registrar:
   - Apex domain (`example.com`): `A` records to GitHub Pages IPs
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Subdomain (`codequality.example.com`): `CNAME` to `<user>.github.io`
4. Enable **Enforce HTTPS** after the certificate is issued.

---

## Option B — Deploy to Cloudflare Pages

### B1. Git-connected (recommended)

1. Push the repository to GitHub (or GitLab).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build settings:
   - **Framework preset:** Docusaurus
   - **Build command:** `npm run build`
   - **Build output directory:** `build`
   - **Environment variable:** `NODE_VERSION = 20`
4. Deploy. Every push to `main` is published automatically.

### B2. Direct CLI deploy

```bash
npm run build
npx wrangler login
npx wrangler pages deploy build --project-name=code-quality-management
# or, once wrangler is installed:
npm run deploy:cf
```

`wrangler.jsonc` already declares `pages_build_output_dir = "build"`.

### B3. Attach your personal domain (Cloudflare Pages)

1. **Pages → your project → Custom domains → Set up a custom domain**.
2. Enter `codequality.yourdomain.com` and follow the DNS prompt (one click if the
   domain is managed in the same Cloudflare account).
3. Cloudflare issues and renews the TLS certificate automatically.

> Hosting the same domain on both providers simultaneously is not possible (DNS
> points to one origin). The configuration supports either host; you can stage on
> GitHub Pages and serve production on Cloudflare using different subdomains.

---

## Content structure

```
docs/
├── index.mdx                     Overview / landing
├── governance/                   Framework & management procedure
├── guidelines/                   Coding rules, static analysis, review,
│                                 unit testing, robustness, OSS
└── assurance/                    Defect escalation, QA/audit, release, dashboard
static/img/                       Logo, favicon and document diagrams
```

## Tech stack

[Docusaurus 3](https://docusaurus.io/) · React 19 · TypeScript · MDX
