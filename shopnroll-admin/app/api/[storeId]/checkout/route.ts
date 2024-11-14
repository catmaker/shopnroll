import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prismadb";

interface CartItem {
  productId: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

export async function OPTIONS(request: Request) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { items }: { items: CartItem[] } = await request.json();

    if (!items || items.length === 0) {
      return new NextResponse("Cart items are required", { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: {
        id: { in: items.map((item) => item.productId) },
      },
      include: {
        images: true,
      },
    });

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
      const cartItem = items.find((item) => item.productId === product.id);

      lineItems.push({
        quantity: cartItem?.quantity || 1,
        price_data: {
          currency: "KRW",
          product_data: {
            name: product.name,
            description:
              cartItem?.selectedColor && cartItem?.selectedSize
                ? `${cartItem.selectedColor} / ${cartItem.selectedSize}`
                : undefined,
            images: [product.images[0].url],
          },
          unit_amount: Math.round(product.price.toNumber()),
        },
      });
    });

    const order = await prisma.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        phone: "",
        address: "",
        name: "",
        email: "",
        totalPrice: 0,
        orderItems: {
          create: items.map((item) => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            selectedColor: item.selectedColor,
            selectedSize: item.selectedSize,
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      billing_address_collection: "required", // 이름 이메일 청구주소
      phone_number_collection: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ["KR"],
      },
      success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json(
      { url: session.url },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.log("[CHECKOUT_ERROR]", error);
    return new NextResponse("Internal error", {
      status: 500,
      headers: corsHeaders,
    });
  }
}
