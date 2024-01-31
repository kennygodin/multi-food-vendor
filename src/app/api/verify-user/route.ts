import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/utils/prismadb';

import { compileVerifyTemplate, sendEmail } from '@/utils/email/sendEmail';
import { generateToken } from '@/utils/generateToken';
import { User, Vendor } from '@prisma/client';

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
  const userData: User | Vendor | any = {
    name,
    email,
    password: hashedPassword,
    role,
  };

  // generate token
  const token = generateToken(userData);
  const frontendUrl = process.env.FRONTEND_URL;
  const emailUrl = `${frontendUrl}verify-user?token=${token.emailString}`;

  // console.log(emailUrl);
  const subject = 'Welcome to FoodTroops - Verify Your Email Address';
  try {
    await sendEmail({
      to: email,
      name,
      subject,
      body: compileVerifyTemplate(name, emailUrl),
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json('Email sent successfully');
}
