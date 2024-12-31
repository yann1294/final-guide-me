"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import GuideCard from "@/components/guide/GuideCard";
import Breadcrumb from "@/components/common/Breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

interface Guide {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  interests: string[];
  avatar: string;
  price: number;
}

const dummyGuideData: Guide[] = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
    interests: ["Hiking", "Sightseeing", "Photography"],
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    price: 150,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "987-654-3210",
    address: "456 Elm St, Town, Country",
    interests: ["Camping", "History", "Cuisine"],
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    price: 180,
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alexj@example.com",
    phone: "555-123-4567",
    address: "789 Oak Rd, Village, Country",
    interests: ["Scuba Diving", "Wildlife", "Cultural Tours"],
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    price: 200,
  },
  // Add more dummy guide data as needed
];

const GuidesList: React.FC = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const guidesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const handleGuideCardClick = (guide: Guide) => {
    router.push(`/guides/${guide.id}`);
  };

  const filteredGuides = dummyGuideData.filter(
    (guide) =>
      guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.interests.some((interest) =>
        interest.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const sortedGuides = [...filteredGuides].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "price") return a.price - b.price;
    return 0;
  });

  const indexOfLastGuide = currentPage * guidesPerPage;
  const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
  const currentGuides = sortedGuides.slice(indexOfFirstGuide, indexOfLastGuide);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <Breadcrumb pageName="Guides" pageTitle="Our Expert Guides" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 md:mb-0">
            Discover Our Expert Guides
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-auto"
          >
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search guides or interests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="price">Sort by Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentGuides.map((guide) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              onClick={handleGuideCardClick}
            />
          ))}
        </div>
        <div className="flex justify-center items-center mt-12 space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({
            length: Math.ceil(sortedGuides.length / guidesPerPage),
          }).map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              size="icon"
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(sortedGuides.length / guidesPerPage)
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuidesList;
