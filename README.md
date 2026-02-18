# Travel With Zaheer — Eleventy + Decap CMS

A professional image-first travel blog. Built with Eleventy (11ty) static site generator and Decap CMS for content management.

---

## Quick Deploy (5 Steps)

### 1. Push to GitHub
Create a new repository and push ALL these files.

### 2. Connect to Netlify
- Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
- Select your repository
- Build settings are auto-detected from `netlify.toml`:
  - **Build command:** `npm run build`
  - **Publish directory:** `_site`
- Click **Deploy**

### 3. Enable Netlify Identity
In your Netlify dashboard:
- **Integrations** → Search "Identity" → Enable
- Under Identity settings → **Registration** → Set to **Invite only**
- Under Identity settings → **Services** → Enable **Git Gateway**

### 4. Invite Yourself
- In Identity → **Invite users** → Enter your email
- Accept the invite email and set a password

### 5. Start Writing
- Go to `yoursite.com/admin`
- Log in with your email/password
- Click **New Journal Post** and start creating!

---

## Folder Structure

```
/
├── .eleventy.js           ← Eleventy config (filters, collections, paths)
├── netlify.toml           ← Netlify build + redirect config
├── package.json           ← Dependencies (just Eleventy)
│
├── admin/
│   ├── index.html         ← Decap CMS interface
│   └── config.yml         ← CMS field definitions
│
└── src/                   ← All source files
    ├── _data/
    │   └── site.json      ← Global site settings
    │
    ├── _includes/
    │   ├── layouts/
    │   │   ├── base.njk   ← Shared HTML shell
    │   │   └── post.njk   ← Blog post layout
    │   └── partials/
    │       ├── nav.njk    ← Navigation
    │       └── footer.njk ← Footer
    │
    ├── content/
    │   ├── journal/       ← Blog posts (Markdown) — CMS writes here
    │   │   ├── journal.json        ← Default front matter for posts
    │   │   └── 2024-06-15-*.md    ← Sample posts
    │   └── uploads/       ← CMS image uploads go here
    │
    ├── css/
    │   └── style.css      ← All styles
    │
    ├── index.njk          ← Homepage
    └── journal.njk        ← Journal listing page
```

---

## How Posts Work

1. You write a post in the Decap CMS at `/admin`
2. CMS saves a `.md` file to `src/content/journal/`
3. Netlify detects the Git change and triggers a build
4. Eleventy converts the Markdown into HTML pages
5. The new post appears on `/journal/` and gets its own URL like `/journal/2024-06-15-istanbul/`

**No manual work needed after you publish in CMS.**

---

## Customising the Design

All styling is in `src/css/style.css`.

To change colours, edit the CSS variables at the top of the file:

```css
:root {
  --gold:        #b8923a;   /* Change accent colour */
  --ink:         #18110e;   /* Change text colour */
  --cream:       #faf8f4;   /* Change background colour */
  --serif: 'Cormorant Garamond', ...;   /* Change heading font */
  --sans:  'DM Sans', ...;              /* Change body font */
}
```

---

## Replacing Placeholder Images

The site uses Unsplash placeholder images. To use your own:

1. Upload photos via the CMS admin panel (they go to `src/content/uploads/`)
2. Or edit the `src/index.njk` and `src/journal.njk` files to point to your own image URLs
3. For the hero images on the homepage, journal, and post pages — update the `src=""` attributes directly in the template files

**Best image dimensions:**
- Hero: 1800×1000px minimum, landscape
- Cards: 900×600px minimum
- Inline post images: 1400px wide

---

## Local Development

```bash
npm install
npm start
# Opens at http://localhost:8080
```

---

## Adding a Custom Domain

In Netlify: **Domain settings** → Add custom domain → Follow the DNS instructions.
