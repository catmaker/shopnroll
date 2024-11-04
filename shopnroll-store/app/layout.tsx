import { metadata } from "@/lib/config/site";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "./globals.css";
import ModalProvider from "@/providers/modal-provider";

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-['Pretendard-Regular']">
        <ModalProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
