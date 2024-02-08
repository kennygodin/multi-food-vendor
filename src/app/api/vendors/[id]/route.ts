import prisma from '@/utils/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const vendorMenuItems = await prisma.user.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            menuItems: {
              include: {
                user: {},
              },
            },
          },
        },
      },
    });

    if (!vendorMenuItems) {
      return NextResponse.json({});
    }

    return NextResponse.json(vendorMenuItems);
  } catch (error) {
    return NextResponse.error();
  }
}
