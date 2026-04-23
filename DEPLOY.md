# Deploy Life Proof AI to lifeproofai.com

## 1. Build the site

```bash
cd lifeproof-ai
npm install
npm run build
```

The built files will be in the `dist` folder.

---

## 2. Deploy (pick one)

### Option A: Vercel (recommended)

1. Push this project to a **GitHub** repo (create one at github.com if needed).
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New** → **Project** and import your repo.
4. Leave the default settings (Vite is auto-detected). Click **Deploy**.
5. You’ll get a URL like `your-project.vercel.app`. Test it on your phone.

**Add your domain:**

6. In the Vercel project, go to **Settings** → **Domains**.
7. Add **lifeproofai.com** (and **www.lifeproofai.com** if you want).
8. Vercel will show the DNS records you need.

### Option B: Netlify

1. Push this project to a **GitHub** repo.
2. Go to [netlify.com](https://netlify.com) and sign in with GitHub.
3. **Add new site** → **Import an existing project** → choose your repo.
4. Build command: `npm run build`. Publish directory: `dist`. Deploy.
5. You’ll get a URL like `random-name.netlify.app`. Test it.

**Add your domain:**

6. **Site settings** → **Domain management** → **Add custom domain** → **lifeproofai.com**.
7. Follow Netlify’s steps to point your domain (DNS) to Netlify.

---

## 3. Point lifeproofai.com to your host

You need to **own** the domain (e.g. buy it at Namecheap, Google Domains, Cloudflare, etc.).

- **Vercel:** In your domain registrar’s DNS, add the A/CNAME records Vercel gives you.
- **Netlify:** Same idea — add the DNS records Netlify shows for your custom domain.

After DNS updates (can take a few minutes to 48 hours), **lifeproofai.com** will open your site. You can then open it on your phone at **https://lifeproofai.com**.
