import { NextResponse } from 'next/server';
import prisma from '@/utils/prismadb';
import { generateToken } from '@/utils/generateToken';
import { compileResetTemplate, sendEmail } from '@/utils/email/sendEmail';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { User, Vendor } from '@prisma/client';

// helper function
const getUserName = (user: User | Vendor) => {
  if ('name' in user) {
    return user.name;
  }
  if ('businessName' in user) {
    return user.businessName;
  }

  return '';
};
export async function POST(req: Request) {
  const data = await req.json();
  const { email } = data;

  const user =
    (await prisma.vendor.findUnique({
      where: { email },
    })) ||
    (await prisma.user.findUnique({
      where: { email },
    }));

  if (!user) {
    return NextResponse.json('Please enter a registered email');
  }

  // generate token
  const token = generateToken(user);
  const frontendUrl = process.env.FRONTEND_URL;
  const emailUrl = `${frontendUrl}pass-reset?token=${token.emailString}`;

  const subject = 'Password Reset Request';
  try {
    await sendEmail({
      to: email,
      name: getUserName(user),
      subject,
      body: compileResetTemplate(getUserName(user), emailUrl),
    });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json('Email sent successfully');
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
    const decode = jwt.verify(
      cookieToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // return NextResponse.json(decode);
    if (decode.emailString !== token) {
      return NextResponse.json('Token mismatch!', { status: 400 });
    }

    const user = decode.user;
    // console.log(decode);
    const hashedPassword = await bcrypt.hash(password, 10);

    // update user password

    try {
      if ('name' in user) {
        await prisma.user.update({
          where: { email: user.email },
          data: { password: hashedPassword },
        });
      }
      if ('businessName' in user) {
        await prisma.vendor.update({
          where: { email: user.email },
          data: { password: hashedPassword },
        });
      }
      return NextResponse.json('Password updated', { status: 200 });
    } catch (error: any) {
      throw new error(error);
    }
  } catch (error) {
    return NextResponse.json('Invalid token!', { status: 404 });
  }
}
