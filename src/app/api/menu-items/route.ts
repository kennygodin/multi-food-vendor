import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/utils/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { menuItemName, description, price, image, categoryId } = body;

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  if (currentUser.role !== 'VENDOR') {
    return NextResponse.error();
  }

  try {
    const menuItem = await prisma.menuItem.create({
      data: {
        menuItemName,
        description,
        price,
        image,
        userId: currentUser.id,
        categoryId,
      },
    });
    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.error();
  }
}

export async function GET() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (currentUser.role !== 'VENDOR') {
    return NextResponse.error();
  }

  try {
    const menuItems = await prisma.menuItem.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(menuItems || []);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.error();
  }
}
