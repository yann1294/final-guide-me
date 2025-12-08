"use client";
import React from "react";
import Login from "@/components/auth/Login/Login";

const AdminLogin = () => {
  return (
    <section>
      <Login userRole={{ name: "admin" }} />
    </section>
  );
};
export default AdminLogin;
