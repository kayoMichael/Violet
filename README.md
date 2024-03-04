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

It is still hard to say wheather it is better to use Server Actions than independent API Route Handlers. From this project, there is some evidence that mutation from form submissions can be easily done with server actions, but other forms mutations on button events or fetching important informations should still be done via Route Handlers. [As of NextJS version 14]
