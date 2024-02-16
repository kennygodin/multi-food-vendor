import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/utils/prismadb';

import { compileVerifyTemplate, sendEmail } from '@/utils/email/sendEmail';
import { generateToken } from '@/utils/generateToken';
import { User } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, role, password } = body;

    // Check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return NextResponse.json('Email already registered!', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData: User | any = {
      name,
      email,
      password: hashedPassword,
      role,
    };

    // Generate token
    const token = generateToken(userData);
    const frontendUrl = process.env.FRONTEND_URL;
    const emailUrl = `${frontendUrl}verify-user?token=${token.emailString}`;

    const subject = 'Welcome to FoodTroops - Verify Your Email Address';
    await sendEmail({
      to: email,
      name,
      subject,
      body: compileVerifyTemplate(name, emailUrl),
    });

    return NextResponse.json('Email sent successfully');
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
