import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook- ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  console.log("EEVENT-TYPE", event.type);

  if (event.type === "checkout.session.completed") {
    console.log("E");
    if (!userId || !courseId) {
      return new NextResponse(`Webhook-Missing Data`, { status: 400 });
    }
    console.log("M");

    const purchased = await db.purchase.create({
      data: {
        courseId,
        userId,
      },
    });
    console.log(purchased);
  } else {
    return new NextResponse(
      `Webhook Error: Unhandled Event Type ${event.type}`,
      {
        status: 200,
      }
    );
  }

  return new NextResponse(null, { status: 200 });
}
