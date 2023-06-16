import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UrbanFlo",
  description: "A modern traffic planner",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: PropsWithChildren) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
