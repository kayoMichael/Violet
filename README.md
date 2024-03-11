# Next.js Task Manager App

A simple Task Manager application built with Next.js, DaisyUI, Shadcn-ui, Prisma, and MySQL.

## Getting Started

Google OAuth is currently internal so would not be a way of signing in.

Sign up Using any email and a random password and than will be directed to the login page where you can login

## Stack

[![My Skills](https://skillicons.dev/icons?i=next,typescript,react,tailwind,mysql,prisma&perline=3)](https://skillicons.dev)

# UI Library
- Shadcn-ui
- DaisyUI

# Auth
- NextAuthJS
- JWT

## Run Locally

Fill in the .env file

```
npm install
npm run dev
```

# Thoughts on Nextjs Server Actions.

It is still difficult to figure out whether it's better to use Server Actions or stick with independent API Route Handlers. I experimentally used both in this project and it seems like handling form submissions works pretty smoothly with server actions and optimistic updates can be done without tanstack query but it doesn't seem very viable for fetching information or mutating objects outside of forms. (As of Feb 2024)
