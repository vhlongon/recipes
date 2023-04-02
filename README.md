This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and uses a postgres database.

## Getting Started

First, run the development server:

Create a `.env` file in the root of the project and add the following:

```bash
DATA_BASE_URL='postgresql://postgres...'
```

to connect to your database.

There is a seed file in the `db` directory. It will be used automattically when you run `npx prisma migrate dev` to create the database.

Then run the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

To generate the tests based on the prisma schema run:

```bash
db:generate
```

To run the seed script:

```bash
db:seed
```

To run the data migration:

```bash
db:migrate
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
