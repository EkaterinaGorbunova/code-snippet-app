# Code Snippet App
The Code Snippet App is a web-based tool that allows developers to create, edit and manage reusable code snippets efficiently.

This is App built with Next.js 15.2, using TypeScript and Tailwind CSS for the frontend and Prisma with SQLite for the database.

## Features
- Create and store code snippets with titles
- View a list of all snippets
- View individual snippets
- Edit existing snippets
- Delete snippets

The project follows a modern web architecture with:
- Server-side rendering via Next.js
- Type safety with TypeScript
- Responsive styling using Tailwind CSS
- Database operations through Prisma ORM
- Clean routing structure using Next.js file-based routing

The App has a simple data model with a single `Blocks` table containing `id`, `title`, and `code` fields.

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
