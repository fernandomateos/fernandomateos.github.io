# CLAUDE.md — fernandomateos.github.io

_Última actualización: mayo 2026_

## Proyecto
Web personal de **Dr. Fernando Mateos-González** — biólogo de campo, científico, guía de expediciones, y creador de Bioblogia.net.

## Estructura del repositorio
```
fernandomateos.github.io/
├── index.html                     ← WEB ANTIGUA (HTML5 UP "Dimension" — NO tocar)
├── assets/ images/ CNAME          ← assets de la web antigua
└── next-app/                      ← NUEVA WEB (Next.js 14 + TypeScript)
    ├── app/
    │   ├── page.tsx               ← home EN (Home + modal About)
    │   ├── layout.tsx
    │   ├── globals.css
    │   ├── blog/page.tsx + [slug]/page.tsx   ← EXISTE pero NO está en la nav home
    │   ├── te-ayudo/page.tsx                 ← EXISTE pero NO está en la nav home
    │   └── es/                    ← versión española
    │       ├── page.tsx           ← home ES
    │       ├── blog/...
    │       └── te-ayudo/page.tsx
    ├── components/BodyWithPreload.tsx
    ├── lib/
    │   ├── posts.ts               ← 12 posts hardcoded en arrays TypeScript (no markdown)
    │   └── i18n.ts
    └── public/images/             ← bg.jpg, tanganyika.jpg, cuzco.JPG, palo.JPG, ICON.png
```

## Estado actual (mayo 2026)

### Lo que está LIVE
- **fernandomateos.com** → GitHub Pages → `index.html` (web antigua, HTML estático)
- El CNAME apunta a GitHub Pages, no a Vercel todavía

### La nueva web (next-app/)
- Código completo y funcional, con build de Next.js presente (`.next/`)
- Bilingual: EN (`/`) y ES (`/es`)
- **Blog y Te Ayudo existen** con contenido real, pero **no aparecen en la nav de la home** (quitados temporalmente en commit "quito blog y te ayudo, por ahora")
- Fotos propias: `tanganyika.jpg` (foto principal del About), `cuzco.JPG`, `palo.JPG`
- ~50 archivos modificados sin commitear (git status: all modified, nothing staged)
- NO hay `vercel.json` — no hace falta, se configura Root Directory en Vercel UI

### Pasos para hacer el deploy a Vercel
1. Commitear todos los cambios pendientes: `git add . && git commit -m "descripción"`
2. En Vercel: importar repo, Root Directory = `next-app`, framework = Next.js
3. Cambiar DNS de `fernandomateos.com`: quitar el registro que apunta a GitHub Pages y añadir el CNAME/A records de Vercel

## Stack técnico
- **Framework:** Next.js 14 (App Router, TypeScript)
- **Deploy objetivo:** Vercel — Root Directory = `next-app`
- **Dominio:** fernandomateos.com (CNAME, actualmente → GitHub Pages)
- **Repo:** https://github.com/fernandomateos/fernandomateos.github.io

## Idiomas
- `/` → English
- `/es` → Español
- Blog y Te Ayudo disponibles en ambos idiomas

## Blog
- Posts en `next-app/lib/posts.ts` — **arrays hardcoded en TypeScript, no hay markdown ni CMS**
- 12 posts: 5 ES + 7 EN (3 propios + 9 de bioblogia.net)
- Para añadir un post: agregar objeto al array `posts` en `posts.ts`
- Tipo Post: `{ slug, title, date, summary, content, lang, originalSource? }`
- Rutas: `/blog/[slug]` y `/es/blog/[slug]`

## Páginas disponibles
| Ruta | Contenido | Visible en nav home |
|------|-----------|---------------------|
| `/` | Home EN con modal About | ✅ |
| `/es` | Home ES con modal Sobre mí | ✅ |
| `/blog` | Lista blog EN | ❌ oculta |
| `/es/blog` | Lista blog ES | ❌ oculta |
| `/blog/[slug]` | Post individual EN | — |
| `/es/blog/[slug]` | Post individual ES | — |
| `/te-ayudo` | Mentoring page EN | ❌ oculta |
| `/es/te-ayudo` | Página ¿Te ayudo? ES | ❌ oculta |

## Hoja de ruta
1. **Inmediato:** Commitear cambios pendientes → deploy a Vercel → cambiar DNS
2. **Corto plazo:** Añadir Blog y Te Ayudo a la nav de la home (una línea en `page.tsx`)
3. **Medio plazo:** Subir artículos del blog (editar `posts.ts`; valorar migrar a MDX/markdown)
4. **Ambición:** CV creciente, actualizable y descargable en PDF (página `/cv` con datos en JSON/TS + `react-pdf` para generar el PDF)

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
- Para añadir un post al blog: añadir objeto al array `posts` en `lib/posts.ts` (no se generan archivos, todo está en memoria)
- Para migrar a markdown en el futuro: crear `content/blog/*.mdx` y actualizar `posts.ts` para leerlos con `fs.readFileSync`
- El CV descargable: opción limpia es `/cv` con datos estructurados + `react-pdf` generando el PDF server-side o en cliente
