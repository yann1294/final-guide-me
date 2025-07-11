"use client";
import Login from "@/components/auth/Login/Login";
import React from "react";

const GuideLogin = () => {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <Login userRole={{ name: "guide" }} />
    </section>
  );
};
export default GuideLogin;
