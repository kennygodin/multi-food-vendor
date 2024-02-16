import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '@/utils/prismadb';

export async function POST(req: Request) {
  const body = await req.json();
  const { token } = body;
  const cookieToken = cookies()?.get('jwt_token')?.value;

  if (!cookieToken || !token) {
    return NextResponse.json('Tokens not found!', { status: 404 });
  }

  try {
    const decode = jwt.verify(
      cookieToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (decode.emailString !== token) {
      return NextResponse.json('Token mismatch!', { status: 400 });
    }

    const user = decode.user;

    const userExists = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (userExists) {
      return NextResponse.json('Email already registered', { status: 409 });
    }

    try {
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        },
      });

      return NextResponse.json('User has been created', { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.error();
    }
  } catch (error) {
    return NextResponse.json('Invalid token!', { status: 404 });
  }
}
