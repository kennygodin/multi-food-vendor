import prisma from '@/utils/prismadb';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { categoryName } = body;
  const id = params.id;

  try {
    const updatedCategoryName = await prisma.category.update({
      where: {
        id,
      },
      data: { categoryName },
    });
    return NextResponse.json(updatedCategoryName);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const deletedCategory = await prisma.category.delete({
      where: { id },
    });
    return NextResponse.json(deletedCategory);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (id === 'menu') {
    try {
      const catMenuItems = await prisma.category.findMany({
        include: {
          menuItems: {
            include: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!catMenuItems) {
        return NextResponse.json([]);
      }
      return NextResponse.json(catMenuItems);
    } catch (error) {
      return NextResponse.error();
    }
  } else {
    return NextResponse.error();
  }
}
