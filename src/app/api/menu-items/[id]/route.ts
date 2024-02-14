import { NextResponse } from 'next/server';
import prisma from '@/utils/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const currentUser = await getCurrentUser();

  if (id === 'featured-items') {
    try {
      const menuItems = await prisma.menuItem.findMany({
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
      if (!menuItems) {
        return NextResponse.json({});
      }
      return NextResponse.json(menuItems);
    } catch (error) {
      return NextResponse.error();
    }
  } else {
    if (!currentUser) {
      return null;
    }
    if (currentUser && currentUser.role !== 'VENDOR') {
      return NextResponse.error();
    }

    try {
      const menuItems = await prisma.menuItem.findUnique({
        where: { id },
      });

      if (!menuItems) {
        return NextResponse.json({});
      }
      return NextResponse.json(menuItems);
    } catch (error) {
      return NextResponse.error();
    }
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { menuItemName, description, price, image, categoryId } = body;

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }
  if (currentUser && currentUser.role !== 'VENDOR') {
    return NextResponse.error();
  }
  const id = params.id;

  try {
    const updatedMenuItem = await prisma.menuItem.update({
      where: { id },
      data: {
        menuItemName,
        description,
        image,
        price,
        categoryId,
      },
    });

    if (!updatedMenuItem) {
      return NextResponse.error();
    }

    return NextResponse.json(updatedMenuItem);
  } catch (error) {
    return NextResponse.error();
  }
}
