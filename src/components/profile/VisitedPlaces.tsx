import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VisitedPlaces = () => {
  const places = [
    { name: "Paris, France", date: "June 2022" },
    { name: "Tokyo, Japan", date: "March 2023" },
    { name: "New York, USA", date: "December 2022" },
    { name: "Bali, Indonesia", date: "August 2023" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Places I&rsquo;ve Visited</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {places.map((place, index) => (
            <li key={index} className="flex justify-between">
              <span>{place.name}</span>
              <span className="text-gray-500 dark:text-gray-400">
                {place.date}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default VisitedPlaces;
