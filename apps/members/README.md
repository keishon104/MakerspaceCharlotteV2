This is the authenticated member app MVP for MakerSpace Charlotte.

It runs in demo mode until Supabase environment variables are added. Demo mode lets the team review the IA, navigation, and operating assumptions without needing a live auth/database setup.

## Getting Started

From the repository root:

```bash
npm run dev:members
```

Open [http://localhost:4322](http://localhost:4322).

## Supabase Setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Review and run `../../supabase/member-app-schema.sql`.
5. Configure email magic-link auth redirect URLs for local and production domains.

## MVP Boundary

- Account login/create account
- Demo/manual membership status
- Immediate family access explanation
- Discord channel guide
- Resources and benefits
- Shop instructions
- Admin account-matching placeholder

Deferred for now:

- Custom billing
- Door access integration
- Reservations
- Discord replacement
- Full training records as source of truth
