"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatter } from "@/lib/utils";

interface DashboardClientProps {
  totalRevenue: number | null;
  salesCount: number;
  stockCount: number;
  recentOrders: any[];
  popularProducts: any[];
}

const DashboardClient = ({
  totalRevenue,
  salesCount,
  stockCount,
  recentOrders,
  popularProducts,
}: DashboardClientProps) => {
  return (
    <div className="space-y-4 p-8">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

      {/* Key Metrics */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatter.format(totalRevenue || 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesCount} orders</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockCount} items</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">Order ID: {order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {formatter.format(order.totalPrice)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.isPaid ? "Paid" : "Pending"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Products */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Popular Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Sales: {product.orderItems.length} units
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {formatter.format(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardClient;
