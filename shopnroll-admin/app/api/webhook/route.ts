import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prismadb";

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
    console.log("Webhook error:", error);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as any;

  console.log("Webhook event details:", {
    type: event.type,
    session: session,
  });

  if (event.type === "checkout.session.completed") {
    try {
      if (!session?.metadata?.orderId) {
        console.log("No orderId found in session metadata");
        return new NextResponse(null, { status: 200 });
      }
      const amountPaid = session.amount_total || 0;
      const order = await prisma.order.update({
        where: {
          id: session.metadata.orderId,
        },
        data: {
          isPaid: true,
          address: session?.customer_details?.address
            ? JSON.stringify(session.customer_details.address)
            : "",
          phone: session?.customer_details?.phone || "",
          email: session?.customer_details?.email || "",
          name: session?.customer_details?.name || "",
          totalPrice: amountPaid,
        },
      });
      console.log("Updated order:", order);
    } catch (error) {
      console.log("Order update error:", error);
    }
  }

  return new NextResponse(null, { status: 200 });
}
