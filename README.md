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

#### Prerequisites

_We do not recommend deploying a SQLite database on serverless environments since the data wouldn't be persisted. I provisioned a quick Postgresql database on [Railway](https://railway.app), but you can of course use any other database provider. Make sure the prisma schema is updated to use the correct database._
