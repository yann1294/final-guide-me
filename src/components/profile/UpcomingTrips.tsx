import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UpcomingTrips = () => {
  const trips = [
    { destination: "Rome, Italy", date: "September 15-22, 2024" },
    { destination: "Machu Picchu, Peru", date: "November 5-12, 2024" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Trips</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {trips.map((trip, index) => (
            <li key={index}>
              <h3 className="font-semibold">{trip.destination}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {trip.date}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default UpcomingTrips;
