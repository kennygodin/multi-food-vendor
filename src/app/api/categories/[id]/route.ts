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
