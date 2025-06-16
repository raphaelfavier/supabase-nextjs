# Next.js + Supabase Profile Management Starter

A modern starter template for building authenticated user profile management apps with Next.js 13+, Supabase, and TypeScript. Includes:
- Full authentication and protected routes
- Editable user profiles (username, full name, avatar, website)
- Zod validation and robust error handling
- Tailwind CSS UI and loading skeletons

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Environment Variables

You must create a `.env.local` file in the root of your project with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key  # (if you use server-side admin features)
```

- `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase project (from the Supabase dashboard)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The public anon key for client-side access
- `SUPABASE_SERVICE_ROLE_KEY`: (Optional) Service role key for privileged server-side operations

You can find these values in your Supabase project dashboard under Project Settings > API.
