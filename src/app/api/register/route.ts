import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '@/utils/prismadb';

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { token } = body;
  const cookieToken = cookies().get('jwt_token')?.value;

  if (!cookieToken || !token) {
    return NextResponse.json('Tokens not found!', { status: 404 });
  }

  try {
    const decode = jwt.verify(
      cookieToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    // return NextResponse.json(decode);

    if (decode.emailString !== token) {
      return NextResponse.json('Token mismatch!', { status: 400 });
    }

    const user: UserData = decode.user;

    const userExists =
      (await prisma.user.findUnique({
        where: { email: user.email },
      })) ||
      (await prisma.vendor.findUnique({
        where: {
          email: user.email,
        },
      }));

    if (userExists) {
      return NextResponse.json('Email already registered');
    }

    try {
      if (user.role === 'customer') {
        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            password: user.password,
          },
        });
      }

      if (user.role === 'vendor') {
        await prisma.vendor.create({
          data: {
            businessName: user.name,
            email: user.email,
            password: user.password,
          },
        });
      }
      return NextResponse.json('User has been created', { status: 201 });
    } catch (error: any) {
      // throw new Error(error);
      return NextResponse.json('User has been created');
    }
  } catch (error) {
    return NextResponse.json('Invalid token!', { status: 404 });
  }
}
