# FIT4002 Urban Planning App

It uses [Turborepo](https://turborepo.org/) and [pnpm](https://pnpm.io) and contains:

```
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ Vite
  |   ├─ React
  |   ├─ TypeScript
  |   ├─ TailwindCSS
  |   └─ Typesafe API calls using tRPC
  └─ NextJS
      ├─ Next.js 13
      ├─ React 18
      ├─ Tailwind CSS
      └─ E2E Typesafe API Server & Client
packages
 ├─ api
 |   └─ tRPC v10 router definition
 ├─ auth
     └─ authentication using next-auth
 └─ db
     └─ typesafe db-calls using Prisma
 └─ config
     ├─ monorepo tailwind config
     ├─ monorepo eslint config

```

## Quick Start

```diff
# Get NVM
brew install nvm

# use correct nvm version (uses .nvmrc)
nvm use

# Install dependencies
pnpm i

# Configure environment variables.
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Prisma schema to your database
pnpm db:push

# Run dev environment
pnpm dev
```

Vite: `https://localhost:5173`

NextJS: `https://localhost:3000`

---

Below is the documentation from the template to deploy the NextJS app on Vercel

## Deployment

### Next.js

#### Prerequisites

_We do not recommend deploying a SQLite database on serverless environments since the data wouldn't be persisted. I provisioned a quick Postgresql database on [Railway](https://railway.app), but you can of course use any other database provider. Make sure the prisma schema is updated to use the correct database._

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com/). If you have ever deployed a Turborepo app there, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory and apply the following build settings:

<img width="927" alt="Vercel deployment settings" src="https://user-images.githubusercontent.com/11340449/201974887-b6403a32-5570-4ce6-b146-c486c0dbd244.png">

> The install command filters out the expo package and saves a few second (and cache size) of dependency installation. The build command makes us build the application using Turbo.

2. Add your `DATABASE_URL` environment variable.

3. Done! Your app should successfully deploy. Assign your domain and use that instead of `localhost` for the `url` in the Expo app so that your Expo app can communicate with your backend when you are not in development.
