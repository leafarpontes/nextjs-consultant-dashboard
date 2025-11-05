import { PrismaClient } from "@/app/generated/prisma/client";
import DashboardFiltersClient from './DashboardFiltersClient';

const prisma = new PrismaClient();

export default async function DashboardFilters({ searchParams }: { searchParams?: { consultant?: string, consultantEmail?: string, dateFrom?: string, dateTo?: string } }) {
  const consultants = await prisma.user.findMany({ where: { type: 'CONSULTANT' } });
  
  return (
    <DashboardFiltersClient 
      consultants={consultants} 
      searchParams={searchParams} 
    />
  )
}
