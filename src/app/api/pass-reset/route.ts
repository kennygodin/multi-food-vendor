import { NextResponse } from 'next/server';
import prisma from '@/utils/prismadb';
import { generateToken } from '@/utils/generateToken';
import { compileResetTemplate, sendEmail } from '@/utils/email/sendEmail';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json('Please enter a registered email');
  }

  const token = generateToken(user);
  const frontendUrl = process.env.FRONTEND_URL;
  const emailUrl = `${frontendUrl}pass-reset?token=${token.emailString}`;

  const subject = 'Password Reset Request';

  try {
    await sendEmail({
      to: email,
      name: user.name || '',
      subject,
      body: compileResetTemplate(user.name || '', emailUrl),
    });

    return NextResponse.json('Email sent successfully');
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { password, confirmPassword, token } = body;

  const cookieToken = cookies().get('jwt_token')?.value;

  if (password !== confirmPassword) {
    return NextResponse.json('Passwords do not match');
  }

  if (!cookieToken || !token) {
    return NextResponse.json('Tokens not found!', { status: 404 });
  }

  try {
    const decoded = jwt.verify(
      cookieToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (decoded.emailString !== token) {
      return NextResponse.json('Token mismatch!', { status: 400 });
    }

    const user = decoded.user;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await prisma.user.update({
        where: { email: user.email },
        data: { password: hashedPassword },
      });

      return NextResponse.json('Password updated', { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.error();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json('Invalid token!', { status: 404 });
  }
}
