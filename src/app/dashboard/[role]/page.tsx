// app/dashboard/[role]/page.tsx
"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useParams, useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import Image from "next/image";

// Tailwind utility classes are used throughout.
// Adjust spacing, colors, and layout as desired.

const DashboardProfilePage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const params = useParams(); // { role: 'tourist' | 'guide' | 'admin' }
  const { user } = useAuthStore();

  // If no user (shouldn't happen if protected), redirect to login
  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null; // or a spinner
  }

  // Common fields
  const { uid, emailAddress, role } = user;
  // For TypeScript: cast to any to access optional profile fields
  const fullUser = user as any;

  const firstName = fullUser.firstName ?? "";
  const lastName = fullUser.lastName ?? "";
  const phoneNumber = fullUser.phoneNumber ?? "";
  const profilePhoto = fullUser.profilePhoto ?? "";
  const identificationType = fullUser.identification?.type ?? "";
  const identificationFile = fullUser.identification?.file ?? "";
  const spokenLanguages = fullUser.spokenLanguages ?? [];
  const availability = fullUser.availability ?? false;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header & Theme Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            My Profile
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Main Grid: Left = Personal Info, Right = Additional Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ─── Left Column ───────────────────────────────────────────────────────────── */}
          <div className="space-y-8">
            {/* ProfileHeader */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700">
                {profilePhoto ? (
                  <Image
                    src={profilePhoto}
                    alt="Profile photo"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Name & Role */}
              <div className="ml-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {role.name}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() =>
                    router.push(`/dashboard/${role.name}/complete-profile`)
                  }
                >
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* ProfileInfo */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
                Basic Information
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  <span className="font-semibold">Email:</span> {emailAddress}
                </li>
                <li>
                  <span className="font-semibold">Phone:</span> {phoneNumber}
                </li>
                {identificationType && identificationFile && (
                  <li>
                    <span className="font-semibold">ID Type:</span>{" "}
                    {identificationType}
                    <br />
                    <a
                      href={identificationFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline mt-1 block"
                    >
                      View Identification
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* TravelPreferences / Spoken Languages */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
                Spoken Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {spokenLanguages.map((lang: string) => (
                  <span
                    key={lang}
                    className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm"
                  >
                    {lang}
                  </span>
                ))}
                {spokenLanguages.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400">
                    No languages specified.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ─── Right Column ─────────────────────────────────────────────────────────── */}
          <div className="space-y-8">
            {/* Availability (for guides only) */}
            {role.name === "guide" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
                  Availability
                </h3>
                <p
                  className={
                    availability
                      ? "text-green-600 dark:text-green-400 font-semibold"
                      : "text-red-600 dark:text-red-400 font-semibold"
                  }
                >
                  {availability ? "Available for tours" : "Not available"}
                </p>
              </div>
            )}

            {/* UpcomingTrips placeholder (for tourists) */}
            {role.name === "tourist" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
                  Upcoming Trips
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  You have no upcoming trips.
                </p>
                {/* Replace above with real data if you have it */}
              </div>
            )}

            {/* VisitedPlaces placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
                Visited Places
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                You have not added any visited places.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfilePage;
