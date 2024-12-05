import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Tarefas +",
  description: "Organize suas tarefas de forma fácil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
