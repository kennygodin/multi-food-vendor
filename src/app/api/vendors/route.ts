import { NextResponse } from 'next/server';
import prisma from '@/utils/prismadb';

export async function GET(req: Request) {
  try {
    const vendors = await prisma.user.findMany({
      where: {
        role: 'VENDOR',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(vendors || []);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
