"use client";

interface DashboardClientProps {
  totalRevenue: any;
}
const DashboardClient = ({ totalRevenue }: DashboardClientProps) => {
  console.log(totalRevenue);
  return <div>Client</div>;
};

export default DashboardClient;
