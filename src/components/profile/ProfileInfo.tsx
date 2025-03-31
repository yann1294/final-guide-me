"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ProfileInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    location: "New York, USA",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically send the updated data to your backend
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              {isEditing ? (
                <Input
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profileData.name}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              {isEditing ? (
                <Input
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profileData.email}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              {isEditing ? (
                <Input
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profileData.phone}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              {isEditing ? (
                <Input
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{profileData.location}</p>
              )}
            </div>
            {isEditing ? (
              <Button type="submit">Save Changes</Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
