import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/utils/prismadb';
import { NextResponse } from 'next/server';

export async function PUT(
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
  const body = await req.json();
  const { status } = body;

  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.error();
  }
}
