import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TravelPreferences = () => {
  const preferences = [
    "Adventure",
    "Cultural Experiences",
    "Food & Cuisine",
    "Nature",
    "Photography",
    "Historical Sites",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {preferences.map((pref, index) => (
            <Badge key={index} variant="outline">
              {pref}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelPreferences;
