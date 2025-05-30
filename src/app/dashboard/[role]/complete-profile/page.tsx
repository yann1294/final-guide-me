"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useAuthStore from "@/stores/authStore";
import { useUpdateUserProfile } from "@/hooks/useUsers";
import { useUploadProfileImages } from "@/hooks/useUploadProfileImages";

const CompleteProfilePage = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const params = useParams(); // { role: 'tourist' | 'guide' | 'admin' }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    profilePhoto: "",
    identificationFile: "",
    identificationType: "",
    spokenLanguages: "",
    availability: false, // Guide only
    emailAddress: user?.emailAddress ?? "",
    role: user?.role?.name ?? "tourist",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { updateFullUserProfile } = useUpdateUserProfile();

  const { uploadImage, error: uploadError } = useUploadProfileImages();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("No user authenticated");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get file inputs
      const profileFile = (
        document.getElementById("profilePhoto") as HTMLInputElement
      )?.files?.[0];
      const idFile = (
        document.getElementById("identificationFile") as HTMLInputElement
      )?.files?.[0];

      if (!profileFile || !idFile) {
        setError("Please upload both profile photo and identification file.");
        return;
      }

      // Upload files
      const imageUrls = await uploadImage(profileFile, idFile);

      console.log("Uploading profile file:", profileFile);
      console.log("Uploading ID file:", idFile);

      if (!imageUrls) {
        setError("File upload failed.");
        return;
      }

      const [profileUrl, idUrl] = imageUrls;

      // Prepare payload
      const commonFields = {
        uid: user.uid,
        emailAddress: user.emailAddress,
        role: user.role,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        profilePhoto: profileUrl,
        spokenLanguages: formData.spokenLanguages
          .split(",")
          .map((lang) => lang.trim()),
        identification: {
          type: formData.identificationType,
          file: idUrl,
        },
        accountStatus: "active", // Or whatever logic you want
      };

      let payload: any = commonFields;

      if (params.role === "guide") {
        payload = {
          ...commonFields,
          availability: formData.availability,
          approvalStatus: "pending", // Default after signup
        };
      }

      // Send PATCH request
      const result = await updateFullUserProfile(payload);
      if (!result) throw new Error("Profile update failed.");

      router.push(`/dashboard/${params.role}`);
    } catch (err: any) {
      setError(
        err.response?.data?.message ?? err.message ?? "Profile update failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>

      {uploadError && <p className="text-red-500 mb-4">{uploadError}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          className="input input-bordered w-full bg-gray-100"
          value={formData.emailAddress}
          disabled
        />
        <input
          type="text"
          className="input input-bordered w-full bg-gray-100"
          value={formData.role}
          disabled
        />
        <input
          type="text"
          placeholder="First Name"
          className="input input-bordered w-full"
          value={formData.firstName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, firstName: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          className="input input-bordered w-full"
          value={formData.lastName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, lastName: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="input input-bordered w-full"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
          }
        />
        <input
          id="profilePhoto"
          type="file"
          accept="image/*"
          placeholder="Profile Photo URL"
          className="input input-bordered w-full"
          onChange={
            (e) => setFormData((prev) => ({ ...prev, profilePhoto: "" })) // reset if needed
          }
        />
        <input
          type="text"
          placeholder="Identification Type (passport, ID card...)"
          className="input input-bordered w-full"
          value={formData.identificationType}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              identificationType: e.target.value,
            }))
          }
        />
        <input
          id="identificationFile"
          type="file"
          accept="image/*"
          placeholder="Upload Identification File"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Spoken Languages (comma separated)"
          className="input input-bordered w-full"
          value={formData.spokenLanguages}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              spokenLanguages: e.target.value,
            }))
          }
        />

        {params.role === "guide" && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.availability}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  availability: e.target.checked,
                }))
              }
            />
            <label>Available for Tours</label>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </section>
  );
};

export default CompleteProfilePage;
