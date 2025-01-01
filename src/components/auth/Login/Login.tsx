'use client';
import Link from 'next/link';
import React, { useState, FC } from 'react';
import Image from 'next/image';
import Logo from '../../../../public/assets/images/logo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Role } from '@/dto/helper.dto';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const Login: FC<{ userRole: Role }> = ({ userRole }) => {
  const { loading, error, authenticate } = useAuth();
  const [formError, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: '', password: '' });

  return (
    <div className="flex-col items-center justify-center w-full">
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
      <div
        className={`login-container mx-auto w-full bg-gray-200/50 max-w-lg rounded-xl p-10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[60px]">
            <Image src={Logo} alt="logo" width={800} height={800} />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Don&apos;t have any account?&nbsp;
          <Link
            href="/signup"
            className="font-medium text-[#ed9734] transition-all duration-200 hover:underline  hover:text-[#69c4b2]/80"
          >
            Sign Up
          </Link>
        </p>
        <form className="mt-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Email"
                  id="email"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Password"
                  id="password"
                  required
                />
              </div>
            </div>
            <div>
              <button
                onClick={async (e: React.FormEvent) => {
                  // set error to null
                  setError(null);
                  e.preventDefault();

                  // Check if email and password are provided
                  if (!formData.email || !formData.password) {
                    setError('Please provide email and password');
                    return; // Prevent the form from submitting if the fields are empty
                  }

                  // Call the authenticate function if both fields are filled
                  await authenticate(
                    formData.email,
                    formData.password,
                    userRole,
                  );
                }}
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-[#ed9734] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-[#69c4b2]/80"
              >
                Sign in
              </button>
            </div>
            <div className="flex flex-col items-center justify-center text-gray-500 space-y-4">
              <div>Or sign in with</div>
              <div className="flex space-x-2">
                <button className="bg-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100">
                  <FontAwesomeIcon
                    icon={faGoogle}
                    className="text-[#ed9734] hover:text-[#69c4b2]/80"
                    size="2x"
                  />
                </button>
                <button className="bg-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="text-[#ed9734] hover:text-[#69c4b2]/80"
                    size="2x"
                  />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
