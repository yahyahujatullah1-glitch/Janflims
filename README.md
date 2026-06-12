# JanFlims

A Next.js 14 film streaming platform backed by **Supabase** (PostgreSQL).

## Stack

- **Next.js 14** (App Router)
- **Supabase** — database, hosted PostgreSQL
- **NextAuth.js** — JWT-based auth with credentials provider
- **Tailwind CSS** — styling
- **Zustand** — client state
- **SWR** — data fetching

## Getting Started

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a new project, and grab your credentials from **Project Settings → API**.

### 2. Apply the database schema

Run the SQL migration in the Supabase SQL Editor:

```
supabase/migrations/001_initial.sql
```

This creates all tables, enums, and the `increment_views` RPC function.

### 3. Set environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
NEXTAUTH_SECRET=<random-string>
NEXTAUTH_URL=http://localhost:3000
```

### 4. Install and run

```bash
npm install
npm run dev
```

## Database

All tables use **snake_case** column names as is standard in PostgreSQL/Supabase:

| Prisma field | Supabase column |
|---|---|
| `avatarUrl` | `avatar_url` |
| `streamUrl` | `stream_url` |
| `isFeatured` | `is_featured` |
| `releaseYear` | `release_year` |
| `imdbScore` | `imdb_score` |
| `progressSeconds` | `progress_seconds` |
| `createdAt` | `created_at` |

## Generate TypeScript types (recommended)

```bash
npx supabase gen types typescript --project-id <your-project-id> > lib/database.types.ts
```

## Row Level Security

The migration includes commented-out RLS setup. For production, uncomment and add policies in `001_initial.sql`.
