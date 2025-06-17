# Next.js + Supabase Profile Management Starter

A modern starter template for building authenticated user profile management apps with Next.js 15+, Supabase, TypeScript, Tailwind and Zod.

## Tech Stack:

- **Next.js 15**, for the frontend
- **Supabase**, for the backend
- **TypeScript**, for type safety
- **Tailwind CSS**, for styling
- **Zod**, for validation

## Features:

- Full authentication
  - User signup
    - with password _(uses server action)_
    - with magic link _(uses server route)_
  - User login
    - with password _(uses server action)_
    - with magic link _(uses server route)_
  - Email verification _(uses server route)_
  - Password recovery _(uses server route)_
  - Password change _(uses server action)_
- User profile management (username, full name, avatar, website)
- Protected routes via middleware (anything under `/profile` requires authentication)
- Zod validation and robust error handling

---

## Getting Started

1. **Install dependencies:**

   ```bash
   yarn install
   # or
   npm install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Create an initialize your Supabase project:**

   - Go to [Supabase](https://supabase.com/)
   - Create a new project
   - Run the migration file present in the `supabase/migrations` directory

3. **Create your environment file:**

   Copy the following template into a new file called `.env.local` in the root of your project, and fill in your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_SITE_URL=your-site-url  # (if you use server-side admin features)
   ```

   - `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase project (from the Supabase dashboard)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The public anon key for client-side access
   - `NEXT_PUBLIC_SITE_URL`: (Optional) The URL of your site for redirecting after authentication

   You can find these values in your Supabase project dashboard under Project Settings > API.

4. **Run the development server:**

   ```bash
   yarn dev
   # or
   npm run dev
   # or
   pnpm dev
   # or
   bun dev
   ```
