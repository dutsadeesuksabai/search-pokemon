import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import ApolloWrapped from "./apolloWrapped";

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Search Pokemon",
  description: "Pokemon",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${sarabun.variable} antialiased`}>
        <ApolloWrapped>{children}</ApolloWrapped>
      </body>
    </html>
  );
}