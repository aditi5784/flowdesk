# Flowdesk

A full-stack SaaS web application for customer support ticket management. Built as part of a technical hiring assessment.

**Live URL:** flowdesk-flvjyprhu-aditi5784s-projects.vercel.app
**Admin Portal:** flowdesk-flvjyprhu-aditi5784s-projects.vercel.appadmin/login

---

## Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@flowdesk.com | Admin123! |
| Member | member@flowdesk.com | Member123! |

---

## What It Does

### Public Landing Page
- Hero section with headline and call-to-action
- Features section showcasing 4 key product features
- Pricing section with Starter and Growth tiers
- Testimonials from fictional customers
- Lead capture / demo request form with validation
- AI-powered chatbot widget (bottom-right corner)

### Admin Portal
- Email/password authentication via Supabase
- Two roles — Super Admin and Member
- Leads dashboard with full table view
- Lead detail expand on click
- Status workflow: New → Contacted → Qualified → Demo Scheduled → Closed Won / Closed Lost
- Super Admin can update lead status, Member cannot
- Chatbot conversation logs — browseable by session
- Unauthorized access redirects to login

---

## Tech Stack

| Technology | Why |
|------------|-----|
| **Next.js 14 (App Router)** | Full-stack in one repo — frontend, backend API routes, and server components all together. No separate server needed. |
| **Supabase** | Gives auth, Postgres database, and API out of the box. No need to build login system from scratch. Free tier is generous enough for this project. |
| **Tailwind CSS + shadcn/ui** | Fast to build with, looks professional. Pre-built components like tables, badges, and dropdowns saved a lot of time. |
| **Groq API (Llama 3.1)** | Free LLM API with generous limits. Used to power the chatbot with a custom system prompt that keeps it on-topic. |
| **Vercel** | One-click deployment for Next.js apps. Automatic deploys on every GitHub push. |

---

## Running Locally

### Prerequisites
- Node.js 18+
- A Supabase account
- A Groq API key (free at groq.com)

### Setup

**1. Clone the repo**
```bash
git clone https://github.com/tumhara-username/flowdesk.git
cd flowdesk
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env.local
```
Fill in your values in `.env.local`

**4. Set up Supabase database**

Run this SQL in your Supabase SQL Editor:
```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  company_name text not null,
  phone text,
  company_size text,
  message text,
  status text default 'New',
  created_at timestamptz default now()
);

create table chat_sessions (
  id uuid default gen_random_uuid() primary key,
  visitor_email text,
  lead_id uuid references leads(id),
  created_at timestamptz default now()
);

create table chat_messages (
  id uuid default gen_random_uuid() primary key,
  session_id uuid references chat_sessions(id) on delete cascade,
  role text not null,
  content text not null,
  created_at timestamptz default now()
);

create table profiles (
  id uuid references auth.users(id) primary key,
  email text,
  role text default 'member'
);
```

**5. Create test users**

In Supabase → Authentication → Users, create:
- `admin@flowdesk.com` / `Admin123!`
- `member@flowdesk.com` / `Member123!`

Then run:
```sql
update profiles set role = 'super_admin' where email = 'admin@flowdesk.com';
```

**6. Run the dev server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Create a `.env.local` file with these values:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

---

## Project Structure
```
flowdesk/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── components/
│   │   ├── Hero.tsx                # Hero section
│   │   ├── Features.tsx            # Features section
│   │   ├── Pricing.tsx             # Pricing section
│   │   ├── Testimonials.tsx        # Testimonials section
│   │   ├── LeadForm.tsx            # Demo request form
│   │   └── ChatWidget.tsx          # AI chatbot widget
│   ├── admin/
│   │   ├── login/page.tsx          # Login page
│   │   ├── layout.tsx              # Admin sidebar layout
│   │   ├── dashboard/
│   │   │   ├── page.tsx            # Leads dashboard
│   │   │   └── LeadRow.tsx         # Individual lead row
│   │   └── conversations/
│   │       └── page.tsx            # Chatbot conversation logs
│   └── api/
│       ├── leads/route.ts          # Lead form submission
│       ├── leads/update/route.ts   # Lead status update
│       ├── chat/route.ts           # Chatbot API
│       └── chat-session/route.ts   # Create chat session
├── lib/
│   └── supabase/
│       ├── client.ts               # Browser Supabase client
│       └── server.ts               # Server Supabase client
├── middleware.ts                   # Auth protection for admin routes
└── README.md
```

---

## What I'd Improve With More Time

**Real-time lead updates** — Using Supabase Realtime subscriptions so the dashboard automatically refreshes when a new lead comes in, without needing to manually reload the page.

**Team management page** — A dedicated page for Super Admins to invite, view, and remove team members directly from the admin portal.

**Conversation linking** — Automatically linking chatbot conversations to leads when the same email appears in both, giving sales teams full context in one place.

---

## Built With

- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Groq](https://groq.com)
- [Vercel](https://vercel.com)
