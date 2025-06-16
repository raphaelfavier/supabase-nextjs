# Next.js + Supabase Profile Management Starter

A modern starter template for building authenticated user profile management apps with Next.js 13+, Supabase, and TypeScript. Includes:
- Full authentication and protected routes
- Editable user profiles (username, full name, avatar, website)
- Zod validation and robust error handling
- Tailwind CSS UI and loading skeletons

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

2. **Create your environment file:**

   Copy the following template into a new file called `.env.local` in the root of your project, and fill in your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key  # (if you use server-side admin features)
   ```

   - `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase project (from the Supabase dashboard)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The public anon key for client-side access
   - `SUPABASE_SERVICE_ROLE_KEY`: (Optional) Service role key for privileged server-side operations

   You can find these values in your Supabase project dashboard under Project Settings > API.

3. **Run the development server:**

   ```bash
   yarn dev
   # or
   npm run dev
   # or
   pnpm dev
   # or
   bun dev
   ```
