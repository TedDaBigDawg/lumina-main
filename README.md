# Lumina Main Site

A comprehensive Next.js 14 application serving as the public landing page and admin panel for Lumina - a Catholic parish management platform.

## Features

### Public Pages
- **Homepage** - Hero section, features, testimonials, FAQ
- **About** - Company story, mission, team profiles
- **Churches** - Directory of parishes using Lumina
- **Demo Request** - Form for parishes to request demos
- **Contact** - Feedback form and contact information

### Admin Panel
- **Dashboard** - Overview of demo requests, feedback, and parishes
- **Demo Management** - View and manage demo requests
- **Feedback Management** - Moderate user feedback
- **Parish Directory** - Add/edit/delete parish listings

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Simple password-based admin auth
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd lumina-main-site
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` with your database URL and admin password:
\`\`\`env
DATABASE_URL="postgresql://username:password@localhost:5432/lumina_main"
ADMIN_PASSWORD="your_secure_password"
\`\`\`

4. Set up the database
\`\`\`bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Optional: Seed with sample data
psql -d your_database < scripts/seed-database.sql
\`\`\`

5. Run the development server
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the site.

## Database Schema

### Parish
- `id` - UUID primary key
- `name` - Parish name
- `location` - Parish location
- `url` - Optional website URL
- `slug` - URL-friendly identifier
- `description` - Optional description
- `createdAt`, `updatedAt` - Timestamps

### DemoRequest
- `id` - UUID primary key
- `parishName` - Name of requesting parish
- `location` - Parish location
- `contactName` - Contact person name
- `contactEmail` - Contact email/phone
- `notes` - Optional additional notes
- `createdAt` - Timestamp

### Feedback
- `id` - UUID primary key
- `message` - Feedback message
- `name` - Optional submitter name
- `isPublic` - Whether feedback can be shared publicly
- `createdAt` - Timestamp

## Admin Access

1. Navigate to `/admin`
2. Enter the admin password (set in `ADMIN_PASSWORD` env var)
3. Access the dashboard to manage:
   - Demo requests from interested parishes
   - User feedback and suggestions
   - Parish directory listings

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
3. Deploy

### Database Setup for Production

For production, consider using:
- **Supabase** - Managed PostgreSQL with built-in auth
- **Railway** - Simple PostgreSQL hosting
- **Neon** - Serverless PostgreSQL

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio

### Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── churches/          # Church directory pages
│   └── ...                # Other public pages
├── components/            # Reusable React components
├── lib/                   # Utility functions and database
├── prisma/               # Database schema and migrations
├── scripts/              # Database seed scripts
└── middleware.ts         # Admin authentication middleware
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Proprietary - © 2025 Lumina. All rights reserved.

## Support

For questions or support:
- Email: hello@luminaapp.org
- Phone: (555) 123-LUMINA
