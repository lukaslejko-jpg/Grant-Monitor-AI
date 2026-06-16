# Grant Monitor AI: GitHub + Vercel

## Vercel import

1. Otvor Vercel dashboard.
2. New Project.
3. Importuj repozitár `lukaslejko-jpg/Grant-Monitor-AI`.
4. Framework nechaj `Next.js`.
5. Build command: `npm run build`.
6. Install command: `npm install`.

## Produkčné premenné

Nastav vo Verceli:

```text
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/grant_monitor_ai?schema=public&sslmode=require
OPENAI_API_KEY=sk-server-side-only
APP_BASE_URL=https://tvoja-domena.vercel.app
CRON_SECRET=nahodne-dlhe-heslo
NEXTAUTH_SECRET=nahodne-dlhe-heslo
NEXTAUTH_URL=https://tvoja-domena.vercel.app
```

## Cron na Vercel Hobby

Vercel Hobby povoľuje iba denný cron. Preto je `vercel.json` nastavený na:

```text
0 6 * * *
```

To znamená jeden automatický beh denne o 06:00 UTC. Častejšie monitorovanie grantových portálov rieš cez externý worker alebo Vercel Pro.

## Databáza

Použi Vercel Postgres, Neon alebo Supabase PostgreSQL. Po pripojení spusti migrácie cez Prisma.

## Worker

Vercel obslúži web a kratšie API endpointy. Playwright monitoring odporúčam spustiť ako samostatný worker na Render, Fly.io, Railway alebo VPS. Worker bude čítať zdroje z PostgreSQL, objavovať nové URL a zapisovať zmeny do `GrantCall`, `ContentSnapshot`, `ChangeItem` a notifikácií.
