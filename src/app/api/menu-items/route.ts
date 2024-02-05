import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/utils/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { menuItemName, description, price, categoryId } = body;

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  try {
    const menuItem = await prisma.menuItem.create({
      data: {
        menuItemName,
        description,
        price,
        userId: currentUser.id,
        categoryId,
      },
    });
    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}
