"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import GuideCard from "@/components/guide/GuideCard.";
import Breadcrumb from "@/components/common/Breadcrumb";

interface Guide {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  interests: string[];
  avatar: string; // Add avatar URL to the Guide interface
  price: number;
}

// Dummy guide data
const dummyGuideData: Guide[] = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
    interests: ["Hiking", "Sightseeing", "Photography"],
    avatar: "https://via.placeholder.com/150",
    price: 0,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "987-654-3210",
    address: "456 Elm St, Town, Country",
    interests: ["Camping", "History", "Cuisine"],
    avatar: "https://via.placeholder.com/150",
    price: 0,
  },
  // Add more dummy guide data as needed
];

const GuidesList: React.FC = () => {
  const router = useRouter();
  const handleGuideCardClick = (guide: Guide) => {
    router.push(`/guides/${guide.id}`);
  };
  const guidesPerPage = 3; // Number of guides to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastGuide = currentPage * guidesPerPage;
  const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
  const currentGuides = dummyGuideData.slice(indexOfFirstGuide, indexOfLastGuide);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="bg-gray-200">
        <Breadcrumb pageName="Guide" pageTitle="Guide"/>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} onClick={handleGuideCardClick} />
          ))}
        </div>
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} color="#ed9734"/>
          </button>
          {Array.from({ length: Math.ceil(dummyGuideData.length / guidesPerPage) }).map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-md hover:bg-gray-300 ${currentPage === index + 1 ? "bg-gray-300" : "bg-gray-200"}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-3 py-4 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(dummyGuideData.length / guidesPerPage)}
          >
            <FontAwesomeIcon icon={faChevronRight} color="#ed9734"/>
          </button>
        </div>
      </div>
    </>
  );
};

export default GuidesList;
