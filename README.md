# PhishGuard Prize Demo

A school cybersecurity-awareness prize/giveaway clickbait simulation built with React, Vite, and Supabase.

## Safety

This project intentionally does **not** store passwords. The password field accepts a demo/fake password only and the value is never sent to Supabase.

Only the participant's name is inserted into `public.profiles`.

## Setup

1. Open this folder in VS Code.
2. Run:

```bash
npm install
```

3. Copy `.env.example` to `.env`.
4. Put your Supabase Project URL and Publishable Key into `.env`.
5. In Supabase, open SQL Editor.
6. Open `supabase/setup.sql`, copy all SQL, paste it into SQL Editor, and click Run.
7. Start the app:

```bash
npm run dev
```

## Supabase table

The SQL creates:

- `id`
- `created_at`
- `name`

The browser only inserts the name.

## Important

Never put a Supabase service-role/secret key in a Vite frontend. Use the publishable key only.
