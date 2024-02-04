import { NextResponse } from 'next/server';
import prisma from '@/utils/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

export async function POST(req: Request) {
  const body = await req.json();
  const { categoryName } = body;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  if (currentUser && currentUser.role !== 'VENDOR') {
    return NextResponse.error();
  }

  const category = await prisma.category.create({
    data: {
      categoryName,
      userId: currentUser?.id,
    },
  });

  return NextResponse.json(category);
}

export async function GET(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  if (currentUser && currentUser.role !== 'VENDOR') {
    return NextResponse.json([]);
  }

  const category = await prisma.category.findMany({
    where: { userId: currentUser.id },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!category) {
    return NextResponse.json(null);
  }

  return NextResponse.json(category);
}
