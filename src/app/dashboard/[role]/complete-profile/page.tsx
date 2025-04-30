"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useAuthStore from "@/stores/authStore";
import api from "@/lib/api";
import { useUpdateFullUser } from "@/hooks/useUsers";
import { Loader } from "lucide-react";

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
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { updateFullUser } = useUpdateFullUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("No user authenticated");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Prepare payload
      const commonFields = {
        uid: user.uid,
        emailAddress: user.emailAddress,
        role: user.role,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        profilePhoto: formData.profilePhoto,
        spokenLanguages: formData.spokenLanguages
          .split(",")
          .map((lang) => lang.trim()),
        identification: {
          type: formData.identificationType,
          file: formData.identificationFile,
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

      // Send PUT request
      const result = await updateFullUser!(payload);
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

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
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
          type="text"
          placeholder="Profile Photo URL"
          className="input input-bordered w-full"
          value={formData.profilePhoto}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, profilePhoto: e.target.value }))
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
          type="text"
          placeholder="Identification File URL"
          className="input input-bordered w-full"
          value={formData.identificationFile}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              identificationFile: e.target.value,
            }))
          }
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
