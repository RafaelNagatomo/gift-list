import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'ID inválido ou não fornecido' }, { status: 400 });
    }

    const { name, quantity, image } = await request.json();

    const updatedGift = await prisma.gift.update({
      where: { id: Number(id) },
      data: { name, quantity: parseInt(quantity, 10), image },
    });

    return NextResponse.json(updatedGift);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar gift' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'ID inválido ou não fornecido' }, { status: 400 });
    }

    await prisma.gift.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar gift' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
