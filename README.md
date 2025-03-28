# Code Snippet App
The Code Snippet App is a web-based tool that allows developers to create, edit and manage reusable code snippets efficiently. It features VS Code-like editor integration, real-time code synchronization and auto-save functionality. It provides a familiar and reliable environment for managing your code snippets.

🚀 **[Live Demo](https://code-snippet-proapp.vercel.app/)**

Login Form
![Login Form](public/screenshots/login-page.png)

Home page with user's code snippets
![Home Page](public/screenshots/home-page.png)

Edit page with auto-save functionality
![Edit Page](public/screenshots/edit-page.png)

## Technical Stack
The project follows a modern web architecture with:
- Server-side rendering via Next.js 15
- Type safety with TypeScript
- Responsive styling using Tailwind CSS
- UI components from Shadcn UI library
- Database operations through Prisma ORM
- Clean routing structure using Next.js file-based routing
- Secure session management using HTTP-only cookies
- Server Actions for form handling
- PostgreSQL database for data persistence

## Features
- User Authentication
  - Register new account
  - Login/Logout functionality
  - Personal workspace for each user
  - Stay logged in for 7 days with session management using cookies
- Code Snippets Management
  - Create and store code snippets with titles
  - View a list of all personal snippets
  - View individual snippets
  - Edit existing snippets
  - Delete snippets
- Advanced Editor Features
  - VS Code editor integration
  - Real-time code synchronization
  - Auto-save functionality
  - Syntax highlighting
  - Reset changes confirmation
- Modern UI
  - Clean and intuitive interface
  - Interactive dialog confirmations
    - Confirmation dialogs for delete operations
    - Confirmation dialog for resetting changes
    - Responsive design for mobile and desktop

## Data Model
The App uses two main tables:
- `User`: Stores user information (`id`, `username`, `password`)
- `Block`: Stores code snippets (`id`, `title`, `code`, `userId`)

## Get Started

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
DATABASE_URL=YOUR_POSTGRESQL_CONNECTION_STRING"
```

4. Set up your database:
```bash
npx prisma generate
npx prisma migrate dev --name init
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

You can either:
- Register a new account, or
- Use existing test account:
  - Username: `john123`
  - Password: `john123`

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
