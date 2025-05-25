import type { Metadata } from "next";
import ConditionalLayout from "@/components/layout/conditional-layout";

import "./globals.css";
import Footer from "@/components/layout/footer";
import CountdownStrip from "@/components/home/count-strip";

export const metadata: Metadata = {
  title: "Seul Lumion",
  description: "Modern fashion e-commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body className={`antialiased outfit-regular`}>
        <CountdownStrip />
        <ConditionalLayout>
            {children}
        </ConditionalLayout>
        <Footer />
      </body>
    </html>
  );
}
