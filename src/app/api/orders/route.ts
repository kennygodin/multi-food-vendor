import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/utils/prismadb';
import { MenuItem } from '@prisma/client';
import axios from 'axios';
import { NextResponse } from 'next/server';

type OrderWithCartProducts = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  state: string;
  country: string;
  postalCode: string;
  cartProducts: MenuItem[];
  reference: string;
};

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const body = await req.json();
  const {
    name,
    email,
    phoneNumber,
    address,
    state,
    country,
    postalCode,
    cartProducts,
    reference,
  } = body;

  if (
    !name ||
    !email ||
    !phoneNumber ||
    !address ||
    !state ||
    !country ||
    !postalCode ||
    !cartProducts ||
    !reference
  ) {
    return NextResponse.json('Please fill all fields!');
  }

  try {
    const res = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    // Create an order
    const data = res.data?.data;
    if (data.status === 'success') {
      await prisma.order.create({
        data: {
          name,
          email,
          phoneNumber,
          address,
          state,
          country,
          postalCode,
          cartProducts,
          amount: data.amount / 100,
          reference,
          isPaid: true,
          status: 'pending',
          userId: currentUser.id,
        },
      });
      return NextResponse.json('Your order has been placed.');
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function GET(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }
  const url = new URL(req.url);
  const role = url.searchParams.get('role');

  let orders;
  if (role === 'VENDOR') {
    const allOrders = await prisma.order.findMany({});
    orders = allOrders.filter((order) => {
      if (Array.isArray(order.cartProducts)) {
        return order.cartProducts.some((cartProduct) => {
          const productWithUserId = cartProduct as { userId: string };
          return productWithUserId?.userId === currentUser.id;
        });
      }
      return NextResponse.json('You have not received any order.');
    });
  }

  if (role === 'CUSTOMER') {
    orders = await prisma.order.findMany({
      where: {
        userId: currentUser.id,
      },
    });
  }

  if (!orders) {
    return NextResponse.json('You have not made any order.');
  }

  return NextResponse.json(orders);
}
