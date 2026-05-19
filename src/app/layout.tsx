import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "ShopHub",
  description: "Shopping website ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="shop-shell min-h-screen">
            <Navigation />
            <main className="pt-20">{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
