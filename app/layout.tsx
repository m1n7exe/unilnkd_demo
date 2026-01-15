import "./globals.css";
import type { ReactNode } from "react";
import Navbar from "@/app/components/common/Navbar"; // use @ for absolute import

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
