import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grant Monitor AI",
  description: "Automatické sledovanie grantových výziev, zmien, dokumentov a termínov uzávierok."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sk">
      <body>{children}</body>
    </html>
  );
}
