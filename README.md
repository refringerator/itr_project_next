#

Full-stack Web-app for personal collection management

### Cloud platforms

1. supabase
2. vercel
3. github

### Tech stack

1. nodejs
2. nextjs (vercel)
3. prisma
4. postgres (supabase)
5. s3 like storage (supabase)
6. realtime (supabase)
7. auth (supabase)
8. fulltext search (postgres ext.)
9. ant design
10. playwright

### How to local run

TBD

##### DB development cycle

1. Update prisma schema in `prisma/shema.prisma`
2. Update db schema with `npm run prisma:db-push`
3. Before deployment create supabase migrations with `npm run supabase:generate-migration {migration_name}`
4. Push db changes to production env (mb `npm run supabase:push`)

### Resources

1. [How to Build a Fullstack App with Next.js, Prisma, and Vercel Postgres](https://vercel.com/guides/nextjs-prisma-postgres)
2. supabase + vercel integration [example 1](https://github.com/vercel/next.js/tree/canary/examples/with-supabase), [exqample 2 full](https://github.com/vercel/nextjs-subscription-payments)
3. [i18n routing](https://github.com/vercel/next.js/tree/canary/examples/app-dir-i18n-routing), [i18n-next-intl](https://github.com/vercel/next.js/tree/canary/examples/with-i18n-next-intl)
4. supabase + prisma [v1](https://docs-rog1zs1kv-supabase.vercel.app/docs/guides/integrations/prisma), [v2 prisma docs](https://www.prisma.io/d ocs/orm/overview/databases/supabase), [v3 supabase docs](https://supabase.com/partners/integrations/prisma), [v4 prisma example](https://github.com/prisma/prisma-examples/tree/latest/databases/postgresql-supabase)
5. storage [sup](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
6. supabase [discussions](https://github.com/orgs/supabase/discussions?discussions_q=is%3Aopen+nextjs+)
7. examples https://www.restack.io/docs/supabase-knowledge-next-auth-supabase-example
8. supabase cicd [gh app](https://github.com/marketplace/actions/supabase-cli-action), [docs](https://supabase.com/docs/guides/functions/cicd-workflow)
9. [playwright](https://playwright.dev/docs/intro), [next doc](https://nextjs.org/docs/pages/building-your-application/testing/playwright)

### Demo

TBD

![Demo](/media/demo.gif)
