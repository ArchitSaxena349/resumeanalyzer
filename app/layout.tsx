import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import HydrationProvider from "@/components/providers/HydrationProvider";
import ErrorSuppression from "@/components/common/ErrorSuppression";

export const metadata: Metadata = {
  title: "Resume Analyzer - AI-Powered Resume Analysis",
  description: "Analyze your resume with AI-powered tools. Get ATS scores, keyword analysis, and improvement suggestions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased font-sans" suppressHydrationWarning>
          <ErrorSuppression />
          <HydrationProvider>
            <div className="relative flex flex-col min-h-screen">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
            <Toaster />
          </HydrationProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
