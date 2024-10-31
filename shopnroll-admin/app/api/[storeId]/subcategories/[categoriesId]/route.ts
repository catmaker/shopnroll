import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: NextRequest,
  { params }: { params: { categoriesId: string } }
) {
  try {
    if (!params.categoriesId) {
      return new NextResponse("Sub Category id is required", { status: 400 });
    }

    const subCategory = await prismadb.subCategory.findUnique({
      where: {
        id: params.categoriesId,
      },
    });

    return NextResponse.json(subCategory);
  } catch (error) {
    console.log("[SUBCATEGORY_GET]", error);
  }
  return NextResponse.json("Internal error", { status: 500 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; categoriesId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, categoryId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!params.categoriesId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const subCategory = await prismadb.subCategory.updateMany({
      where: {
        id: params.categoriesId,
      },
      data: {
        name,
        categoryId,
      },
    });

    return NextResponse.json(subCategory);
  } catch (error) {
    console.log("[SUBCATEGORY_PATCH]", error);
  }
  return NextResponse.json("Internal error", { status: 500 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string; categoriesId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.categoriesId) {
      return new NextResponse("Sub Category id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const subCategory = await prismadb.subCategory.deleteMany({
      where: {
        id: params.categoriesId,
      },
    });

    return NextResponse.json(subCategory);
  } catch (error) {
    console.log("[SUBCATEGORY_DELETE]", error);
  }
  return NextResponse.json("Internal error", { status: 500 });
}
