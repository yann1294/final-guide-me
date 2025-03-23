"use client";

import React from "react";
import { useTheme } from "next-themes";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProfileHeader from "@/components/profile/ProfileHeader";
import TravelPreferences from "@/components/profile/TravelPreferences";
import UpcomingTrips from "@/components/profile/UpcomingTrips";
// import PhotoGallery from "@/components/profile/PhotoGallery";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import ProfileInfo from "@/components/profile/ProfileInfo";
import VisitedPlaces from "@/components/profile/VisitedPlaces";

const ProfilePage = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* <Breadcrumb pageName="Tourist Profile" pageTitle="My Travel Profile" /> */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            My Travel Profile
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ProfileHeader />
            <ProfileInfo />
            <TravelPreferences />
          </div>
          <div className="space-y-8">
            <VisitedPlaces />
            <UpcomingTrips />
            {/* <PhotoGallery /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
