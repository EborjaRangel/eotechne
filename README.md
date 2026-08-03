# EOTECHNE

Sitio web corporativo de **EOTECHNE** — desarrollo de software a la medida para empresas medianas y pequeñas.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 4**
- **PostgreSQL** con **Prisma**
- **Formik** + **Yup** (formulario de contacto)
- Deploy: **Vercel** (frontend) + **Railway** (PostgreSQL)

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Local: iniciar PostgreSQL y crear tablas
npx prisma dev    # en otra terminal, dejar corriendo
npm run db:push

# Ver suscriptores y contactos guardados
npm run db:studio

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable       | Descripción                          |
| -------------- | ------------------------------------ |
| `DATABASE_URL` | URL de conexión PostgreSQL (Railway) |

## Deploy

### 1. GitHub

```bash
git init
git add .
git commit -m "Initial commit: EOTECHNE corporate website"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/eotechne.git
git push -u origin main
```

### 2. Railway (PostgreSQL + app)

1. Crea un proyecto en [railway.app](https://railway.app) o usa la CLI:

```bash
railway init --name eotechne
railway add --database postgres
railway add --repo EborjaRangel/eotechne --branch main --service eotechne-web
```

2. En el servicio **eotechne-web**, agrega la variable:

```
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

3. El build ejecuta `prisma migrate deploy` automáticamente.

### 3. Vercel (Frontend)

1. Importa el repositorio en [vercel.com/new](https://vercel.com/new)
2. Framework: **Next.js** (detectado automáticamente)
3. Agrega la variable de entorno `DATABASE_URL` (misma URL de Railway PostgreSQL)
4. Deploy automático en cada push a `main`

O con CLI:

```bash
npx vercel --prod
```

## Estructura

```
content/blog/            # Artículos en Markdown (agregar .md día a día)
src/
├── app/
│   ├── api/
│   │   ├── contact/     # API de contacto (POST)
│   │   └── newsletter/  # API suscripción boletín (POST)
│   ├── blog/            # Listado y artículos del blog
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── blog/            # PostCard, NewsletterForm
│   ├── layout/          # Header, Footer
│   ├── sections/        # Hero, Enfoque, Servicios, etc.
│   └── ui/              # ContactForm, SectionHeading
└── lib/
    ├── blog.ts          # Lectura de artículos Markdown
    ├── data/            # Industrias, servicios
    ├── validations/     # Esquemas Yup
    └── prisma.ts        # Cliente Prisma
prisma/
└── schema.prisma        # Contact, NewsletterSubscriber
```

## Blog

Agrega artículos creando archivos `.md` en `content/blog/`:

```markdown
---
title: "Título del artículo"
description: "Resumen breve"
date: "2026-08-02"
author: "EOTECHNE"
category: "IA Generativa"
---

Contenido del artículo en Markdown...
```

Los suscriptores del boletín se guardan en PostgreSQL (`NewsletterSubscriber`).
Los mensajes del formulario de contacto se guardan en `Contact`.

### Registros en base de datos

| Formulario | Tabla | Cuándo se guarda |
| --- | --- | --- |
| Contacto (home) | `Contact` | Al enviar mensaje |
| Boletín (home, blog) | `NewsletterSubscriber` | Al suscribirse |

## Licencia

Privado — © EOTECHNE
