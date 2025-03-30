import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ProfileHeader = () => {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-20 w-20">
        <AvatarImage
          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
          alt="John Doe"
        />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-2xl font-bold">John Doe</h2>
        <p className="text-gray-500 dark:text-gray-400">Adventure Seeker</p>
        <Badge variant="secondary" className="mt-2">
          Globetrotter
        </Badge>
      </div>
    </div>
  );
};

export default ProfileHeader;
