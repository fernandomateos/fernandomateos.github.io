# CLAUDE.md — fernandomateos.github.io

## Proyecto
Web personal de **Dr. Fernando Mateos-González** — biólogo de campo, científico, guía de expediciones.

## Estructura del repositorio
```
fernandomateos.github.io/          ← repo GitHub Pages
├── index.html                     ← web antigua (HTML5 UP "Dimension" template, NO tocar)
├── assets/ images/ CNAME          ← assets de la web antigua
└── next-app/                      ← NUEVA WEB (Next.js 14 + TypeScript)
    ├── app/
    │   ├── page.tsx               ← home EN
    │   ├── layout.tsx
    │   ├── globals.css
    │   ├── blog/page.tsx + [slug]/page.tsx
    │   ├── te-ayudo/page.tsx
    │   └── es/                    ← versión española
    │       ├── page.tsx           ← home ES
    │       ├── blog/...
    │       └── te-ayudo/page.tsx
    ├── components/BodyWithPreload.tsx
    ├── lib/
    │   ├── posts.ts               ← 12 posts (5 ES, 7 EN) hardcoded
    │   └── i18n.ts
    └── public/images/
```

## Stack técnico
- **Framework:** Next.js 14 (App Router, TypeScript)
- **Deploy objetivo:** Vercel — Root Directory = `next-app`
- **Dominio:** fernandomateos.com (CNAME, actualmente apunta a GitHub Pages)
- **Repo:** https://github.com/fernandomateos/fernandomateos.github.io

## Idiomas
- `/` → English
- `/es` → Español
- Blog, Te Ayudo/Mentoring disponible en ambos idiomas

## Blog
- Posts en `next-app/lib/posts.ts` (hardcoded — sin CMS)
- 5 posts ES (de bioblogia.net) + 7 posts EN (3 propios + 4 de bioblogia.net)
- Rutas: `/blog/[slug]` y `/es/blog/[slug]`

## Páginas disponibles
| Ruta | Contenido |
|------|-----------|
| `/` | Home EN con modal About |
| `/es` | Home ES con modal Sobre mí |
| `/blog` | Lista blog EN |
| `/es/blog` | Lista blog ES |
| `/blog/[slug]` | Post individual EN |
| `/es/blog/[slug]` | Post individual ES |
| `/te-ayudo` | Mentoring page EN |
| `/es/te-ayudo` | Página ¿Te ayudo? ES |

## Booking / Contacto
- TidyCal: https://tidycal.com/fernandomateos/sesion1on1
- Email: fernando@bioblogia.net

## Social
- LinkedIn: /in/fernandomateosgonzalez/
- Twitter/X: @Bioblogo
- Instagram: @bioblogo
- GitHub: /fernandomateos

## Notas importantes
- La web antigua (`index.html`) debe mantenerse intacta — sirve como backup/referencia
- El directorio `next-app/` es el que se despliega en Vercel (configurar Root Directory)
- Los posts del blog son arrays en `posts.ts`, no archivos markdown
- Las "etapas" del blog conectan con contenido de bioblogia.net
