import { PrismaClient } from "@/app/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id, type, name, phone, email, age, cep, state, address, 
      addressComplement, selectedClients 
    } = body;

    // Update user
    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        phone,
        email,
        age: parseInt(age),
        cep,
        state,
        address,
        addressComplement: addressComplement || null
      }
    });

    // If consultant, update client relationships
    if (type === 'CONSULTANT') {
      // Remove this consultant from all current clients
      await prisma.user.updateMany({
        where: { consultantId: id },
        data: { consultantId: null }
      });

      // Assign selected clients to this consultant
      if (selectedClients?.length > 0) {
        await prisma.user.updateMany({
          where: { id: { in: selectedClients } },
          data: { consultantId: id }
        });
      }
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}