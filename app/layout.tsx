import "@/app/_styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";

import Header from "./_components/Header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Gift Guide",
  description: "Generate gift ideas by answering a few quick questions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "hsl(346.8 77.2% 49.8%)",
          colorDanger: "hsl(0 84.2% 60.2%)",
          // colorSuccess: "hsl(240 4.8% 95.9%)",
          // colorWarning: "hsl(0 84.2% 60.2%)",
          colorNeutral: "hsl(240 10% 3.9%)",
          colorText: "hsl(240 10% 3.9%)",
          colorTextOnPrimaryBackground: "hsl(355.7 100% 97.3%)",
          colorTextSecondary: "hsl(240 5.9% 10%)",
          colorBackground: "hsl(0 0% 100%)",
          colorInputText: "hsl(240 5.9% 10%)",
          colorInputBackground: "hsl(240 4.8% 95.9%)",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
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
            <Header />
            {children}
            <Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
