import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.json();
  console.log(body);

  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/success",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: body.name,
            images: [body.image],
          },
          unit_amount: body.price,
        },
        quantity: 1,
      },
    ],
    metadata: {
      product_id: body.id,
    },
    mode: "payment",
  });

  return NextResponse.json(session);
}
