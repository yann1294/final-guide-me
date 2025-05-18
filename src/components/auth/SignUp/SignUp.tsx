"use client";

import React, { useState, FC } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/dto/helper.dto";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Link from "next/link";

const SignUp: FC<{ userRole?: Role }> = ({ userRole }) => {
  const { signup, loading, error } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="container signin-container">
      {/* loading spinner during signup */}
      {loading && (
        <div className="loader-container">
          <LoadingSpinner message="creating account..." />
        </div>
      )}

      {/* error alert */}
      <div className="error-container flex items-center justify-center w-full">
        {(formError || error) && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Error!</strong> {formError ?? error}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setFormError(null)}
            ></button>
          </div>
        )}
      </div>

      <div className="row">
        {/* Left image */}
        <div className="col-lg-6 d-none d-lg-block">
          <div className="signin-image">
            <img src="/assets/images/signin/tourist.svg" alt="signup" />
          </div>
        </div>

        {/* Right form */}
        <div className="col-lg-6">
          <div className="signin-form">
            <div className="signin-title">Create Your Account</div>

            {/* Email input */}
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>

            {/* Password input */}
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>

            {/* Submit button */}
            <div className="form-group">
              <div
                onClick={async (e: React.FormEvent) => {
                  setFormError(null);
                  e.preventDefault();

                  if (!formData.email || !formData.password) {
                    setFormError("Please provide email and password");
                    return;
                  }

                  const roleToUse = userRole ?? { name: "tourist" };
                  await signup(formData.email, formData.password, roleToUse);
                }}
                className="signin-button"
              >
                Sign Up
              </div>
            </div>

            {/* Social media (optional, non-functional) */}
            <div className="signin-social">
              <div className="signin-social-title">Or Sign Up With</div>
              <div className="social-media-icons">
                <div className="social-icon">
                  <i className="bx bxl-facebook" />
                </div>
                <div className="social-icon">
                  <i className="bx bxl-google" />
                </div>
              </div>
            </div>

            {/* Already have account */}
            <div className="create-account">
              Already have an account?{" "}
              <Link href={`/login/${userRole?.name ?? "tourist"}`}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
