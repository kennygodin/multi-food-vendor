import { NextResponse } from 'next/server';
import prisma from '@/utils/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }
  if (currentUser && currentUser.role !== 'VENDOR') {
    return NextResponse.error();
  }
  const id = params.id;

  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!menuItem) {
      return NextResponse.json({});
    }

    return NextResponse.json(menuItem);
  } catch (error) {
    return NextResponse.error();
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
