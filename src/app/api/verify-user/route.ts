import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/utils/prismadb';

import { compileVerifyTemplate, sendEmail } from '@/utils/email/sendEmail';
import { generateToken } from '@/utils/generateToken';

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
}
export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, role, password } = body;

  // user exists
  const userExists =
    (await prisma.user.findUnique({
      where: {
        email,
      },
    })) ||
    (await prisma.vendor.findUnique({
      where: {
        email,
      },
    }));

  if (userExists) {
    return NextResponse.json('Email already registered!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userData: UserData = { name, email, password: hashedPassword, role };

  // generate token
  const token = generateToken(userData);
  const frontendUrl = process.env.FRONTEND_URL;
  const verifyUrl = `${frontendUrl}verify-user?token=${token.activationString}`;

  // console.log(verifyUrl);
  const subject = 'Welcome to FoodTroops - Verify Your Email Address';
  try {
    await sendEmail({
      to: email,
      name,
      subject,
      body: compileVerifyTemplate(name, verifyUrl),
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json('Email sent successfully');
}
