# Next.js Task Manager App

A simple Task Manager application built with Next.js, DaisyUI, Shadcn-ui, Prisma, and MySQL.

## Getting Started

## Stack

- Next 14 App router
- Prisma/MySQL(Planet Scale)
- Typescript
- DaisyUI
- ShadcnUI
- Tailwind CSS
- NextAuthJS

## Deployed Website

https://violet-five.vercel.app/

## Run Locally

Fill in the .env file

```
npm install
npm run dev
```

## Overall Thoughts from Project Development

To be honest, it doesn't seem very efficient to use mySQL and prisma as a lot of features aren't supported and the prisma docs are written with postgresSQL or mongoDB in mind. There were a lot of times I struggled trying to implement the write queries for mySQL and it wasn't better with the lack of support with nextauthjs documentation.

As of February 2024, the nextAuthJS documentation is very outdated and the examples do not function in general. This is partly because they are currently trying to migrate from nextAuthJS to AuthJS so some of the examples are around authjs instead of nextAuth. This might also be because their docs on using prisma and nextauth revolves around postgresSQL and not mySQL.

Overall, since this was my first SaaS project, it was a big learning curve and showed me the importance of using the right tech stacks to create a SaaS project.
