import { NextResponse } from 'next/server';
import prisma from '@/utils/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

export async function POST(req: Request) {
  const body = await req.json();
  const { categoryName } = body;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (currentUser.role !== 'VENDOR') {
    return NextResponse.error();
  }

  try {
    const category = await prisma.category.create({
      data: {
        categoryName,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.error();
  }
}

export async function GET(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (currentUser.role !== 'VENDOR') {
    return NextResponse.json([]);
  }

  try {
    const categories = await prisma.category.findMany({
      where: { userId: currentUser.id },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.error();
  }
}
