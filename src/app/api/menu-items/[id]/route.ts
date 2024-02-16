import { NextResponse } from 'next/server';
import prisma from '@/utils/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    if (id === 'featured-items') {
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

      return NextResponse.json(menuItems || []);
    } else {
      const currentUser = await getCurrentUser();

      if (!currentUser || currentUser.role !== 'VENDOR') {
        return NextResponse.error();
      }

      const menuItem = await prisma.menuItem.findUnique({
        where: { id },
      });

      return NextResponse.json(menuItem || []);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { menuItemName, description, price, image, categoryId } = body;
  const id = params.id;

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'VENDOR') {
      return NextResponse.error();
    }

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
    console.error(error);
    return NextResponse.error();
  }
}
