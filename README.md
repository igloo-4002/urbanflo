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
 |   └─ authentication using next-auth
 ├─ db
 |   └─ typesafe db-calls using Prisma
 └─ config
     ├─ monorepo tailwind config
     ├─ monorepo eslint config

```

## Quick Start

### Dependencies

- [Node.js](https://nodejs.org/en/) -- version 18
  - We recommend using [NVM](https://github.com/nvm-sh/nvm) to easily change Node versions
- [pnpm](https://pnpm.io/installation)

### Instructions

1. Clone the repo

```
git clone ttps://github.com/igloo-4002/urban-planning-app
```

2. (**NVM users only**) Switch to the correct Node version (as specified in `.nvmrc`)

```
nvm use
```

3. Install dependencies

```
pnpm install
```

4. Copy example environment file and configure environment variables

See [database configuration](#database-configuration) below for details

```
cp .env.example .env
```

5. Push the Prisma schema to your database

```
pnpm db:push
```

**Note:** if you're using a local PostgreSQL instance, start the DB/container first.

6. Run dev environment

```
pnpm dev
```

Accessing the dev environment:

- Vite: `http://localhost:5173`
- NextJS: `http://localhost:3000`

### Database Configuration

#### Production DB on Railway

On the connect tab of PostgreSQL plugin window, copy the value of `DATABASE_URL` to `DATABASE_URL` environment variable on the `.env` file.

**NOTE:** never commit the `.env` file, nor enter any sensitive information in the `.env.example` file!!!

#### Local PostgreSQL instance on Docker

This is an alternative configuration for those who want to have an easy-to-setup, disposable database running locally in a Docker container.

You need to have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

Place the following to `DATABASE_URL` environment variable: `postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB`, substituting `$POSTGRES_USER` etc appropriately according to the environment variables in `docker-compose.yml`. For example, the default URL would be `postgresql://igloo:igloo@localhost:5432/urban_planning_app`.

After you set the variables, start the container with the commands below.

Commands:

- Start container: `docker compose -f docker-compose-db.yml up`
- Remove container: `docker compose -f docker-compose-db.yml down`
- Remove container and delete all data: `docker compose -f docker-compose-db.yml down -v`
