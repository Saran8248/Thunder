import type { Metadata } from "next";
import "./style.css"; // The original UI styles

export const metadata: Metadata = {
  title: "Tasty Bites",
  description: "Thunder Food Delivery Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
