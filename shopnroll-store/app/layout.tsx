import { metadata } from "@/lib/config/site";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "./globals.css";

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-['Pretendard-Regular']">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
