"use client";
import Link from "next/link";
import React, { useState, FC } from "react";
import Image from "next/image";
import Logo from "../../../../public/assets/images/logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Role } from "@/dto/helper.dto";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const Login: FC<{ userRole: Role }> = ({ userRole }) => {
  const { loading, error, signin } = useAuth();
  const [formError, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: "", password: "" });

  return (
    <div className="container signin-container">
      {/* loading spinner when login is in progress */}
      {loading && (
        <div className="loader-container">
          <LoadingSpinner message="logging in..." />
        </div>
      )}
      <div className="error-container flex items-center justify-center w-full">
        {/* Display login error */}
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
              onClick={() => setError(null)}
            ></button>
          </div>
        )}
      </div>
      <div className="row">
        {/* Image */}
        <div className="col-lg-6 d-none d-lg-block">
          <div className="signin-image">
            <img src="/assets/images/signin/tourist.svg" alt="image" />
          </div>
        </div>
        {/* Form details */}
        <div className="col-lg-6 ">
          <div className="signin-form">
            {/* Title */}
            <div className="signin-title">Access Your Traveler’s Portal</div>
            {/* email */}
            <div className="form-group">
              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="form-control"
                type="email"
                placeholder="Email address"
              />
            </div>
            {/* password */}
            <div className="form-group">
              <input
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="form-control"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <div
                onClick={async (e: React.FormEvent) => {
                  // set error to null
                  setError(null);
                  e.preventDefault();

                  // Check if email and password are provided
                  if (!formData.email || !formData.password) {
                    setError("Please provide email and password");
                    return; // Prevent the form from submitting if the fields are empty
                  }

                  // Call the authenticate function if both fields are filled
                  await signin(formData.email, formData.password);
                }}
                className="signin-button"
              >
                Sign In
              </div>
            </div>

            {/* social media */}
            <div className="signin-social">
              <div className="signin-social-title">Or Sign In With</div>
              <div className="social-media-icons">
                <div className="social-icon">
                  <i className="bx bxl-facebook" />
                </div>
                <div className="social-icon">
                  <i className="bx bxl-google" />
                </div>
              </div>
            </div>

            {/* forgot password */}
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>

            {/* create account */}
            <div className="create-account">
              Don't have an account? <a href="#">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
