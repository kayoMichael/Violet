# Next.js Task Manager App

A Simple Task Manager application built with Next.js. As of May 2024, migrated to SupaBase (PSQL) due to the pricing structure change of PlanetBase.

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

Fill in the .env file following the .env.example

```
npm install
npm run dev
```

# Project

```
app
├── (landing)
│   ├── layout.tsx
│   └── page.tsx
├── (project)
│   ├── dashboard
│   │   ├── charts.tsx
│   │   ├── page.tsx
│   │   └── recentTickets.tsx
│   ├── layout.tsx
│   └── tickets
│       ├── [id]
│       │   ├── assign.tsx
│       │   ├── delete.tsx
│       │   ├── edit
│       │   │   ├── loading.tsx
│       │   │   └── page.tsx
│       │   ├── loading.tsx
│       │   └── page.tsx
│       ├── loading.tsx
│       ├── new
│       │   ├── loading.tsx
│       │   └── page.tsx
│       ├── page.tsx
│       └── ticketButton.tsx
├── api
│   ├── auth
│   │   ├── [...nextauth]
│   │   │   └── route.ts
│   │   └── authOptions.ts
│   ├── sentry-example-api
│   ├── tickets
│   │   ├── [id]
│   │   │   └── route.ts
│   │   └── route.ts
│   └── users
│       └── route.ts
├── auth
│   ├── Provider.tsx
│   ├── action.ts
│   ├── signin
│   │   └── page.tsx
│   ├── signout
│   │   └── page.tsx
│   └── signup
│       ├── confirmation
│       │   └── page.tsx
│       └── page.tsx
├── favicon.ico
├── global-error.jsx
├── globals.css
└── layout.tsx

components
│  
├── button
│   └── submitButton.tsx
├── form
│   ├── signUpInput.tsx
│   ├── ticketForm.tsx
│   ├── user-auth-form.tsx
│   └── user-login-form.tsx
├── general
│   ├── Navbar.tsx
│   └── landingNavbar.tsx
├── landing-sections
│   ├── feature-cards.tsx
│   ├── feature.tsx
│   ├── hero.tsx
│   └── partner.tsx
├── slider
│   └── infiniteSlider.tsx
├── table
│   ├── columns.tsx
│   ├── data
│   │   └── labels.tsx
│   ├── tableColumnHeader.tsx
│   ├── tableDataViewOptions.tsx
│   ├── tableFacetedFilter.tsx
│   ├── tablePagination.tsx
│   ├── tableRowActions.tsx
│   ├── tableToolbar.tsx
│   └── ticketTable.tsx
├── ui
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── checkbox.tsx
│   ├── command.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── form.tsx
│   ├── icons.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── popover.tsx
│   ├── select.tsx
│   ├── separator.tsx
│   ├── table.tsx
│   ├── toast.tsx
│   ├── toaster.tsx
│   └── use-toast.ts
└── validations
    └── schema.ts

```

# Thoughts on Nextjs Server Actions

It is still difficult to figure out whether it's better to use Server Actions or stick with independent API Route Handlers. I experimentally used both in this project and it seems like handling form submissions works pretty smoothly with server actions and optimistic updates can be done without tanstack query but it doesn't seem very viable for fetching information or mutating objects outside of forms. (As of Feb 2024)
