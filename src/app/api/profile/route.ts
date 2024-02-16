import prisma from '@/utils/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';

export async function GET(req: Request) {
  const currentUser = await getCurrentUser();

  const user = await prisma.user.findUnique({
    where: { email: currentUser?.email },
  });

  if (!user) {
    return NextResponse.json('User not found', { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const {
    name,
    email,
    image,
    phoneNumber,
    address,
    state,
    country,
    postalCode,
  } = body;

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name,
        image,
        phoneNumber,
        address,
        state,
        country,
        postalCode,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
