import React from "react";
import Image from "next/image";
import { MapPin, Mail, Phone, DollarSign } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

interface GuideCardProps {
  guide: Guide;
  onClick: (guide: Guide) => void;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide, onClick }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-800">
      <div className="relative h-48">
        <Image
          src={guide.avatar}
          alt={guide.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {guide.name}
        </h2>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{guide.address}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
          <Mail className="w-4 h-4 mr-2" />
          <span className="text-sm">{guide.email}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
          <Phone className="w-4 h-4 mr-2" />
          <span className="text-sm">{guide.phone}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {guide.interests.map((interest, index) => (
            <Badge key={index} variant="secondary">
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-700 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400 mr-1" />
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
            {guide.price}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
            /day
          </span>
        </div>
        <Button onClick={() => onClick(guide)}>View Profile</Button>
      </CardFooter>
    </Card>
  );
};

export default GuideCard;
