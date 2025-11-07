# Next.js Consultant Dashboard

A full-stack dashboard for managing consultants and clients with user creation, editing, filtering, and analytics.

## Live Demo

**[https://consultant-dashboard-theta.vercel.app/](https://consultant-dashboard-theta.vercel.app/)**

## Features

- **User/Consultant Management**: Complete CRUD operations for users and consultants
- **Brazilian Form Validation**: Real-time validation for CPF, phone, CEP, and email
- **Input Masking**: Auto-formatting for Brazilian phone numbers, CPF, and CEP
- **Client Assignment**: Consultants can be assigned multiple clients
- **Advanced Filtering**: Filter users by consultant name/email and date ranges
- **Weekly Analytics**: Track new clients with growth indicators
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Brazilian Localization**: Dates, time, and text in Portuguese/Brazilian format

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Deployment**: Vercel
- **Validation**: Custom Brazilian validators (CPF, phone, CEP)

## Architecture

- **Modular Components**: Reusable form components and custom hooks
- **Server Components**: Data fetching on the server for better performance
- **Client Components**: Interactive forms and real-time validation
- **API Consolidation**: Single flexible endpoints with query parameters
- **Type Safety**: Full TypeScript implementation with proper interfaces

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd nextjs-consultant-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your DATABASE_URL
   ```

4. **Run database migrations**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## Key Features Showcase

### User Management
- Create users with tabbed interface (basic info + client assignment)
- Edit existing users with search and selection
- Form validation with real-time feedback
- Brazilian input masking (phone, CPF, CEP)

### Dashboard Analytics
- User table with Brazilian date/time formatting
- Filter by consultant or date range
- Weekly new clients widget with growth indicators
- Responsive design for all screen sizes

### Data Validation
- **Email**: Standard email format validation
- **Phone**: Brazilian format (10-11 digits) with masking
- **CPF**: 11-digit validation with auto-formatting
- **CEP**: 8-digit postal code with hyphen insertion

## Deployment

The application is deployed on Vercel with:
- Automatic deployments from main branch
- Environment variables configured
- PostgreSQL database hosted on Supabase
- Brazilian timezone configuration (America/Sao_Paulo)