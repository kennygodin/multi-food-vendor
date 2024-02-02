import prisma from '@/utils/prismadb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const email = session.user?.email;
  if (!email) {
    return null;
  }

  const user =
    (await prisma.user.findUnique({
      where: { email },
    })) ||
    (await prisma.vendor.findUnique({
      where: { email },
    }));

  // if("businessName" in user ) { alter the db to use just one user

  // }

  return NextResponse.json(session);
}
