# Buddhadeb Mondal — Portfolio

Personal site for **Buddhadeb Mondal**, AI Architect.

**Live:** [https://buddhadeb33.github.io/](https://buddhadeb33.github.io/)

## Local preview

```bash
cd buddhadeb33.github.io
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

## Site map

| Path | Purpose |
|------|---------|
| `index.html` | Homepage — hire-me funnel |
| `work.html` + `work/` | Case studies |
| `blog/` | Writing (SEO) |
| `about.html` | Bio + references (merged) |
| `resume.html` | Resume (print/PDF) |
| `portfolio-roadmap.md` | Gaps vs top-grade portfolio (source) |
| `portfolio-roadmap.html` | On-site viewer for the roadmap |
| `robots.txt` / `sitemap.xml` | Search indexing |

Drop your PDF at `assets/resume/Buddhadeb_Mondal_Resume.pdf` so the Download PDF button works.

See **[portfolio-roadmap.md](portfolio-roadmap.md)** (or [/portfolio-roadmap.html](https://buddhadeb33.github.io/portfolio-roadmap.html)) for what still needs your metrics, WhatsApp, Calendly, etc.

## Discoverability checklist (hire-me)

Do these after you push to GitHub Pages:

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://buddhadeb33.github.io/`
3. Verify ownership (HTML tag or DNS)
4. Submit sitemap: `https://buddhadeb33.github.io/sitemap.xml`
5. Use URL Inspection on the homepage and one case study

### LinkedIn (fastest hire traffic)

1. Headline example: `AI Architect | GenAI · LLMs · RAG | IIT Hyderabad`
2. Featured → add link to `https://buddhadeb33.github.io/`
3. About section → short pitch + link to Work and Contact
4. Pin 1–2 posts that link to a case study or blog post
5. Keep experience dates aligned with the site

### Content distribution

- Cross-post blog articles to Medium with **canonical URL** set to your `buddhadeb33.github.io` post
- Share case studies when you change roles or ship something public
- Optional later: custom domain (stronger brand for hiring)

### Contact

- Email: buddhadeb33@gmail.com
- Calendly: [calendly.com/buddhadeb33/30min](https://calendly.com/buddhadeb33/30min)
- WhatsApp: [wa.me/917501385296](https://wa.me/917501385296)
- Form on homepage uses Formcarry (existing endpoint)
- LinkedIn: [linkedin.com/in/buddhadeb33](https://www.linkedin.com/in/buddhadeb33)

## Design notes

Static HTML/CSS/JS (no build step). Visual system in `assets/css/site.css`. Particles, dual Bootstrap nav, and template SEO copy were removed in favor of a compact editorial layout.

## Archive

The previous portfolio (particles / Bootstrap template) is preserved under [`archive/pre-redesign/`](archive/pre-redesign/). See [`archive/README.md`](archive/README.md) to preview it on another port.
