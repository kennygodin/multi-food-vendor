import prisma from '@/utils/prismadb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const email = session.user?.email;
  if (!email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json('User not found', { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { name, email, phoneNumber, address, state, country, postalCode } =
    body;
  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      name,
      phoneNumber,
      address,
      state,
      country,
      postalCode,
    },
  });

  return NextResponse.json({ updatedUser });
}
