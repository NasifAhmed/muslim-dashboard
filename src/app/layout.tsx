import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/theme-provier";

import { cn } from "@/lib/utils";
import StateProvider from "@/providers/stateProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Muslim Dashboard",
  description: "A Dashboard for Muslims with quick prayer and fasting times",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StateProvider>
            <Header />
            <main className="flex flex-grow flex-col items-center justify-center">
              {children}
            </main>
            <Footer />
          </StateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
