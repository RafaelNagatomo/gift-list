import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const gifts = await prisma.gift.findMany();
    return NextResponse.json(gifts);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao listar gifts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, quantity, image } = await request.json();

    const gift = await prisma.gift.create({
      data: {
        name,
        quantity: parseInt(quantity, 10),
        image,
      },
    });

    return NextResponse.json(gift, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar gift' }, { status: 500 });
  }
}
