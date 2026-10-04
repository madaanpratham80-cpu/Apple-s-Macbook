import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MacBook Pro — Power meets precision.",
  description: "An extraordinary workspace. Engineered down to the smallest detail. Experience the MacBook Pro — precision-machined aluminum, Apple silicon, and professional performance in a remarkably integrated design.",
  keywords: ["MacBook Pro", "Apple", "laptop", "Apple silicon", "professional"],
  openGraph: {
    title: "MacBook Pro — Power meets precision.",
    description: "An extraordinary workspace. Engineered down to the smallest detail.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
