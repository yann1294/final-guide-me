"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/common/TopBar";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "../../public/assets/css/animate.css";
import "../../public/assets/css/bootstrap.min.css";
import "../../public/assets/css/swiper-bundle.css";
import "../../public/assets/font/flaticon.css";
import "../../public/assets/css/boxicons.min.css";
import "../../public/assets/css/style.css";
import "../../public/assets/css/responsive.css";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

 const metadata: Metadata = {
  title: "GuideMe - Say Yes to a new Adventure",
  description: "GuideMe web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    import("../../public/assets/js/bootstrap.bundle.min");
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Topbar/>
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
