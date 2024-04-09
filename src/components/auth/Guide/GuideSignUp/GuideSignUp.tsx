"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Logo from '../../../../../public/assets/images/logo2.png';
import Link from "next/link";

// Hardcoded list of countries
const countries = [
    "USA",
    "Canada",
    "UK",
    "Australia",
    // Add more countries as needed
];

const GuideSignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        country: "",
        state: "",
        age: "",
        nationality: "",
        address: "",
        dob: "",
        phone: "",
        identityCard: null as File | null,
        picture: null as File | null,
        interests: "",
        pays: "",
        ville: "",
        resume: null as File | null,
        passport: null as File | null,
        drivingLicence: "",
        carOwnership: "",
        experienceYears: ""
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const countryValue = e.target.value;
        setFormData((prev) => ({
            ...prev,
            country: countryValue,
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData((prev) => ({ ...prev, [field]: file }));
        }
    };

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement your signUp logic here
        console.log(formData);
        router.push('/profile');
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-200/50 rounded-xl p-10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[60px]">
                        <Image src={Logo} alt="logo" width={800} height={800} />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-black">
                    Become a Guide With Us.
                </h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        href="/guideLogin"
                        className="font-medium text-[#ed9734] transition-all duration-200 hover:underline hover:text-[#69c4b2]"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSignUp} className="mt-8">
                    <div className="space-y-5">
                        {/* Add other form fields here */}
                        <div>
                            <label htmlFor="name" className="text-base font-medium text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Full Name"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-base font-medium text-gray-900">
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
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-base font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                                    id="password"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="country" className="text-base font-medium text-gray-900">
                                Country
                            </label>
                            <div className="mt-2">
                                <select
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                    value={formData.country}
                                    onChange={handleCountryChange}
                                    id="country"
                                    required
                                >
                                    <option value="" disabled>
                                        Select Country
                                    </option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* Address */}
                        <div>
                            <label htmlFor="address" className="text-base font-medium text-gray-900">
                                Address
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Address"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        {/* Date of Birth */}
                        <div>
                            <label htmlFor="dob" className="text-base font-medium text-gray-900">
                                Date of Birth
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="text-base font-medium text-gray-900">
                                Phone
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        {/* Identity Card Upload */}
                        <div>
                            <label htmlFor="identityCard" className="text-base font-medium text-gray-900">
                                Identity Card Upload
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="file"
                                    id="identityCard"
                                    name="identityCard"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={(e) => handleFileChange(e, "identityCard")}
                                    required
                                />
                            </div>
                        </div>
                        {/* Picture Upload */}
                        <div>
                            <label htmlFor="picture" className="text-base font-medium text-gray-900">
                                Picture Upload
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="file"
                                    id="picture"
                                    name="picture"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={(e) => handleFileChange(e, "picture")}
                                    required
                                />
                            </div>
                        </div>
                        {/* Interests */}
                        <div>
                            <label htmlFor="interests" className="text-base font-medium text-gray-900">
                                Interests
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Interests"
                                    id="interests"
                                    name="interests"
                                    value={formData.interests}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        {/* Add more form fields as needed */}
                        {/* Social Media Icons */}
                        <div className="flex items-center justify-center text-gray-500">
                            <span className="mr-4">Or sign up with</span>
                            <button className="mr-2 bg-white p-2 rounded-full hover:bg-gray-100">
                                <FontAwesomeIcon icon={faGoogle} className="text-[#ed9734] hover:text-[#69c4b2]/80" size="2x" />
                            </button>
                            <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                                <FontAwesomeIcon icon={faFacebook} className="text-[#ed9734] hover:text-[#69c4b2]/80" size="2x" />
                            </button>
                        </div>
                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center rounded-md bg-[#ed9734] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-[#69c4b2]/80"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GuideSignUp;