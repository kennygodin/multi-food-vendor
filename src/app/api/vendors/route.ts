import { NextResponse } from 'next/server';
import prisma from '@/utils/prismadb';

export async function GET(req: Request) {
  try {
    const vendors = await prisma.user.findMany({
      where: {
        role: 'VENDOR',
      },
    });
    if (!vendors) {
      return NextResponse.json([]);
    }

    return NextResponse.json(vendors);
  } catch (error) {
    return NextResponse.error();
  }
}
