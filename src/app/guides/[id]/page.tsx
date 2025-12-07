"use client";

import React, { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  BadgeCheck,
  Phone,
  Mail,
  Languages,
  Clock,
  IdCard,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { useTheme } from "next-themes";
import { useFetchOneGuide } from "@/hooks/useUsers";
import useUserStore from "@/stores/userStore";
import type { GuideDTO } from "@/dto/guide.dto";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// at the top (in the same file)
type FileDTO = {
  url?: string;
  href?: string;
  downloadURL?: string;
  bucket?: string;
  fullPath?: string;
  path?: string;
  downloadToken?: string;
  downloadTokens?: string; // comma-separated
};

const resolveStorageUrl = (v: unknown): string | undefined => {
  if (!v) return undefined;

  // direct string
  if (typeof v === "string") {
    // http(s)
    if (/^https?:\/\//i.test(v)) return v;
    // REST-style Firebase path
    if (v.startsWith("/v0/b/"))
      return `https://firebasestorage.googleapis.com${v}`;
    // gs://bucket/path
    if (v.startsWith("gs://")) {
      const m = /^gs:\/\/([^/]+)\/(.+)$/.exec(v);
      if (m) {
        const [, bucket, path] = m;
        return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
          path,
        )}?alt=media`;
      }
    }
    return undefined;
  }

  // object-like (FileDTO)
  if (typeof v === "object" && v) {
    const f = v as FileDTO;
    if (f.url) return f.url;
    if (f.href) return f.href;
    if (f.downloadURL) return f.downloadURL;

    // Build from bucket + fullPath (+ optional token)
    const bucket = f.bucket;
    const fullPath = f.fullPath ?? f.path;
    if (bucket && fullPath) {
      const base = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
        fullPath,
      )}?alt=media`;
      const token =
        f.downloadToken ??
        (f.downloadTokens ? f.downloadTokens.split(",")[0] : undefined);
      return token ? `${base}&token=${encodeURIComponent(token)}` : base;
    }
  }

  return undefined;
};

/** Helpers */
function toDate(v: any): Date | null {
  if (!v) return null;
  if (typeof v === "object" && "_seconds" in v) {
    return new Date((v._seconds as number) * 1000);
  }
  const d = new Date(v);
  return isNaN(+d) ? null : d;
}
function fmt(d: Date | null) {
  return d
    ? d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";
}

const GuideProfilePage: React.FC = () => {
  // supports either folder name: [id] or [uid]
  const params = useParams<{
    id?: string | string[];
    uid?: string | string[];
  }>();
  const guideId =
    (Array.isArray(params?.uid) ? params.uid[0] : params?.uid) ??
    (Array.isArray(params?.id) ? params.id[0] : params?.id) ??
    "";
  const { theme, setTheme } = useTheme();
  const { fetchOneGuide, loading, error } = useFetchOneGuide();

  // Your store may store a single guide or an array; support both safely.
  const storeGuide = useUserStore((s: any) => s.tourGuides);

  const guide: GuideDTO | undefined = useMemo(() => {
    const sg = storeGuide;
    if (!sg) return undefined;

    // If it's a Map<string, GuideDTO>
    if (sg instanceof Map) {
      return sg.get(guideId);
    }

    // If it's an array of guides
    if (Array.isArray(sg)) {
      return sg.find((g: GuideDTO) => g?.uid === guideId);
    }

    // If it's a single guide object
    if (typeof sg === "object" && (sg as any)?.uid) {
      return sg as GuideDTO;
    }

    return undefined;
  }, [storeGuide, guideId]);

  useEffect(() => {
    if (!guideId) return;
    if (guide?.uid === guideId) return; // already have it
    fetchOneGuide(guideId);
  }, [guideId, guide?.uid, fetchOneGuide]);

  useEffect(() => {
    console.log(
      "guideId:",
      guideId,
      "storeGuide:",
      storeGuide,
      "picked guide:",
      guide?.uid,
      "status:",
      guide?.approvalStatus,
    );
  }, [guideId, storeGuide, guide]);

  const name = [guide?.firstName, guide?.lastName].filter(Boolean).join(" ");
  const profilePhoto =
    guide?.profilePhoto || "/assets/images/guide/placeholder.png";
  const idFileUrl = resolveStorageUrl(
    guide?.identification?.file ?? (guide as any)?.identificationFile,
  );
  const idType =
    guide?.identification?.type ?? (guide as any)?.identificationType;
  const createdAt = fmt(toDate(guide?.createdAt));
  const updatedAt = fmt(toDate(guide?.updatedAt));
  const available = !!guide?.availability;

  if (loading && !guide) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading guide…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-red-600">Failed to load guide: {error}</div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-muted-foreground">Guide not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <main className="container mx-auto px-4 py-8">
        <Card className="w-full overflow-hidden">
          {/* Cover + avatar */}
          <div className="relative h-64 sm:h-80 lg:h-96">
            {/* Use the profile photo as a subtle blurred cover */}
            <Image
              src={profilePhoto}
              alt="Cover"
              fill
              className="object-cover brightness-[.55] blur-[1px] scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-end justify-between p-4 sm:p-6 lg:p-8">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-white dark:border-gray-800">
                  <AvatarImage src={profilePhoto} alt={name || "Guide"} />
                  <AvatarFallback>{(name || "G").slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="text-white">
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {name || "Guide"}
                  </h1>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-white/90">
                    <BadgeCheck className="w-4 h-4" />
                    <span>Approved Guide</span>
                    {guide?.role?.name && (
                      <>
                        <span>•</span>
                        <span className="capitalize">{guide.role.name}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <Link href="/about">
                  <Button
                    variant="secondary"
                    className="bg-white/90 hover:bg-white"
                  >
                    Back
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  Toggle {theme === "dark" ? "Light" : "Dark"}
                </Button>
              </div>
            </div>
          </div>

          <CardContent className="p-4 sm:p-6 lg:p-8">
            {/* Badges / meta */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge
                variant={available ? "default" : "secondary"}
                className="gap-1"
              >
                {available ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                {available ? "Available" : "Unavailable"}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <MapPin className="w-4 h-4" />
                {"Location not set"}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Clock className="w-4 h-4" />
                Joined {createdAt}
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: About */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>
                    About {name?.split(" ")[0] || "the guide"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    {"This guide hasn’t added a bio yet."}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <Languages className="w-4 h-4" />
                      Languages
                    </Badge>
                    {Array.isArray(guide?.spokenLanguages) &&
                    guide.spokenLanguages.length > 0 ? (
                      guide.spokenLanguages.map((lng: string) => (
                        <Badge
                          key={lng}
                          variant="outline"
                          className="capitalize"
                        >
                          {lng}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Not specified
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Right: Contact & ID */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a
                        className="text-sm hover:underline"
                        href={`mailto:${guide.emailAddress}`}
                      >
                        {guide.emailAddress}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a
                        className="text-sm hover:underline"
                        href={`tel:${guide.phoneNumber}`}
                      >
                        {guide.phoneNumber}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Identification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <IdCard className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {idType ? idType.toUpperCase() : "Unknown"}
                      </span>
                    </div>
                    {idFileUrl ? (
                      <a
                        href={idFileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        View ID file
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No file on record
                      </span>
                    )}
                    <div className="text-xs text-muted-foreground pt-2">
                      Last updated {updatedAt}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Mobile actions */}
            <div className="mt-6 flex gap-2 sm:hidden">
              <Link href="/about" className="flex-1">
                <Button variant="secondary" className="w-full">
                  Back
                </Button>
              </Link>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                Toggle {theme === "dark" ? "Light" : "Dark"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default GuideProfilePage;
