"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  ImageIcon,
  MessageSquare,
} from "lucide-react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

// In a real application, you'd fetch this data based on the guide ID
const dummyGuideData = {
  id: 1,
  name: "Jenna Stones",
  location: "Los Angeles, California",
  occupation: "Solution Manager - Creative Tim Officer",
  education: "University of Computer Science",
  bio: "An artist of considerable range, Jenna the name taken by Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.",
  friends: 22,
  photos: 10,
  comments: 89,
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  coverImage:
    "https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80",
  interests: ["Hiking", "Photography", "Travel", "Cooking"],
  languages: ["English", "Spanish", "French"],
  rating: 4.8,
  reviews: 73,
};

const GuideProfilePage: React.FC = () => {
  const params = useParams();
  const { theme, setTheme } = useTheme();

  // In a real application, you'd use the ID to fetch the guide's data
  console.log("Guide ID:", params.id);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Breadcrumb pageName="Guide Profile" pageTitle={dummyGuideData.name} />
      <main className="container mx-auto px-4 py-8">
        <Card className="w-full overflow-hidden">
          <div className="relative h-64 sm:h-80 lg:h-96">
            <Image
              src={dummyGuideData.coverImage}
              alt="Cover"
              layout="fill"
              objectFit="cover"
              className="brightness-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800">
                <AvatarImage
                  src={dummyGuideData.avatar}
                  alt={dummyGuideData.name}
                />
                <AvatarFallback>{dummyGuideData.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <CardContent className="pt-6">
            <div className="text-center">
              <CardTitle className="text-3xl font-bold mb-2">
                {dummyGuideData.name}
              </CardTitle>
              <CardDescription className="flex items-center justify-center text-sm mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                {dummyGuideData.location}
              </CardDescription>
              <div className="flex justify-center space-x-2 mb-4">
                {dummyGuideData.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-center items-center space-x-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{dummyGuideData.rating}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Rating
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{dummyGuideData.reviews}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Reviews
                  </p>
                </div>
              </div>
              <Button className="mb-6">
                Connect with {dummyGuideData.name.split(" ")[0]}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {dummyGuideData.bio}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span className="text-sm">{dummyGuideData.occupation}</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <span className="text-sm">{dummyGuideData.education}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {dummyGuideData.friends} Friends
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {dummyGuideData.photos} Photos
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {dummyGuideData.comments} Comments
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed bottom-4 right-4"
      >
        Toggle {theme === "dark" ? "Light" : "Dark"} Mode
      </Button>
    </div>
  );
};

export default GuideProfilePage;
