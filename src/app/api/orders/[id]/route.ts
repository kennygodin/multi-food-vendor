import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/utils/prismadb';
import { NextResponse } from 'next/server';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    // Check if user is not authenticated or is not a VENDOR
    if (!currentUser || currentUser.role !== 'VENDOR') {
      return NextResponse.error();
    }

    const id = params.id;
    const body = await req.json();
    const { status } = body;

    // Update the order status
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });

    if (!updatedOrder) {
      return NextResponse.error();
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
