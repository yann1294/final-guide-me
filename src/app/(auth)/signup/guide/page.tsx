import SignUp from "@/components/auth/SignUp/SignUp";
import React from "react";

const SignupPage: React.FC = () => {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <SignUp userRole={{ name: "guide" }} />
    </section>
  );
};

export default SignupPage;
