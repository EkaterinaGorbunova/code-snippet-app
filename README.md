# Code Snippet App
The Code Snippet App is a web-based tool that allows developers to create, edit and manage reusable code snippets efficiently.

This is App built with Next.js 15, using TypeScript, Tailwind CSS and Shadcn UI for the frontend and Prisma with SQLite for the database.

## Features
- User Authentication
  - Register new account
  - Login/Logout functionality
  - User-specific snippets
- Code Snippets Management
  - Create and store code snippets with titles
  - View a list of all personal snippets
  - View individual snippets
  - Edit existing snippets
  - Delete snippets
- Modern UI
  - Clean and intuitive interface
  - Interactive dialog confirmations for important actions
    - Confirmation dialogs for delete operations
    - Confirmation dialogs for edit operations
    - Accessible modal windows using Radix UI

## Technical Stack
The project follows a modern web architecture with:
- Server-side rendering via Next.js 15
- Type safety with TypeScript
- Responsive styling using Tailwind CSS
- UI components from Shadcn UI library
- Database operations through Prisma ORM
- Clean routing structure using Next.js file-based routing
- Server Actions for form handling
- SQLite database for data persistence

## Data Model
The App uses two main tables:
- `User`: Stores user information (`id`, `username`, `password`)
- `Block`: Stores code snippets (`id`, `title`, `code`, `userId`)

## Getting Started

First, set up your environment:

1. Clone the repository:
```bash
https://github.com/EkaterinaGorbunova/code-snippet-app.git
```

2. Install dependencies:
```bash
npm install
```

3. Add environment variable

Create `.env` file in the root directory with:
```
DATABASE_URL="file:./dev.db"
```

4. Set up your database:
```bash
npx prisma generate
```

5. Open Prisma Studio to view your database: 
```bash
npx prisma studio
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Debugging

When using a package like 'react-modal' with Node version `23.2`, the build fails.

```bash
Creating an optimized production build ...
Failed to compile.

./src/app/blocks/[id]/edit/EditForm.tsx + 3 modules
Unexpected end of JSON input
```

Solution:

Use Node version `23.3.0`

https://github.com/webpack/webpack/issues/18963
