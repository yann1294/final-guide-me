"use client"
import React, {useState} from "react";
import { useRouter } from "next/navigation";
import GuideCard from "@/components/guide/GuideCard.";

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
        price: 0
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        address: "456 Elm St, Town, Country",
        interests: ["Camping", "History", "Cuisine"],
        avatar: "https://via.placeholder.com/150",
        price: 0
    },
    // Add more dummy guide data as needed
  ];



  const GuidesList: React.FC = () => {

    const router = useRouter()
    const handleGuideCardClick = (guide: { id: any; }) =>{
        router.push(`/guides/${guide.id}`)
    }
    const guidesPerPage = 3; // Number of guides to display per page
    const [currentPage, setCurrentPage] = useState(1);
  
    const indexOfLastGuide = currentPage * guidesPerPage;
    const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
    const currentGuides = dummyGuideData.slice(
      indexOfFirstGuide,
      indexOfLastGuide
    );
  
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
    return (
      <div>
        <div className="flex flex-wrap justify-center">
          {currentGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} onClick={()=>{handleGuideCardClick}} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(dummyGuideData.length / guidesPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                className="mx-1 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    );
  };
  
  export default GuidesList;


