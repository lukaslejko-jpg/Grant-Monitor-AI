# Grant Monitor AI

Next.js aplikacia pre automaticke sledovanie grantovych vyziev, zmien dokumentov a terminov uzavierok.

## Stack

- Next.js + TypeScript
- PostgreSQL + Prisma ORM
- Tailwind CSS + shadcn/ui styl komponentov
- OpenAI API pre analyzu obsahu
- Playwright pre dynamicke webove stranky

## Spustenie

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

## Bezpecnostne pravidla v kostre

- API kluce su citane iba na serveri z `.env`.
- URL zdrojov prechadzaju validaciou proti SSRF.
- API endpointy pouzivaju jednoduchy rate limit.
- Prisma schema obsahuje audit log, role a logy kontrol.
- Playwright worker ma oddelenu serverovu utilitu a respektovanie robots.txt je pripravene ako rozsirujuci bod.
