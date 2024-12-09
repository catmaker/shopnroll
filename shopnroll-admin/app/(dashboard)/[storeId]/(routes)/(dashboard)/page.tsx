import React from "react";
import prismadb from "@/lib/prismadb";
import DashboardClient from "./components/client";
interface DashboardPageProps {
  params: { storeId: string };
}
const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  // 총 매출
  const totalRevenue = await prismadb.order.aggregate({
    where: {
      storeId: params.storeId,
      isPaid: true,
    },
    _sum: {
      totalPrice: true,
    },
  });

  // 총 주문 수
  const salesCount = await prismadb.order.count({
    where: {
      storeId: params.storeId,
      isPaid: true,
    },
  });

  // 총 상품 수
  const stockCount = await prismadb.product.count({
    where: {
      storeId: params.storeId,
      isArchived: false,
    },
  });

  // 최근 주문들 (최근 5개)
  const recentOrders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  // 인기 상품 (판매량 기준 top 5)
  const popularProducts = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
      isArchived: false,
    },
    include: {
      orderItems: true,
    },
    orderBy: {
      orderItems: {
        _count: "desc",
      },
    },
    take: 5,
  });

  return (
    <DashboardClient
      totalRevenue={Number(totalRevenue._sum.totalPrice) || 0}
      salesCount={salesCount}
      stockCount={stockCount}
      recentOrders={recentOrders}
      popularProducts={popularProducts}
    />
  );
};

export default DashboardPage;
