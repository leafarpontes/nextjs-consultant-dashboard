import { PrismaClient } from "@/app/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const fields = searchParams.get('fields');

    const whereClause = type ? { type: type as 'USER' | 'CONSULTANT' } : {};
    
    const selectClause = fields === 'basic' 
      ? { id: true, name: true, email: true }
      : {
          id: true, 
          name: true, 
          email: true, 
          type: true,
          phone: true,
          age: true,
          cpf: true,
          cep: true,
          state: true,
          address: true,
          addressComplement: true,
          consultantId: true,
          clients: {
            select: { id: true, name: true, email: true }
          }
        };

    const users = await prisma.user.findMany({ 
      where: whereClause,
      select: selectClause,
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}