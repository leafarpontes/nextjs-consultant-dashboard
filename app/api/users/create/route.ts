import { PrismaClient } from "@/app/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      type, name, phone, email, age, cpf, cep, state, address, 
      addressComplement, selectedClients 
    } = body;

    // Create user
    const user = await prisma.user.create({
      data: {
        type,
        name,
        phone,
        email,
        age: parseInt(age),
        cpf,
        cep,
        state,
        address,
        addressComplement: addressComplement || null
      }
    });

    // If consultant and has selected clients, update clients
    if (type === 'CONSULTANT' && selectedClients?.length > 0) {
      await prisma.user.updateMany({
        where: { id: { in: selectedClients } },
        data: { consultantId: user.id }
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}