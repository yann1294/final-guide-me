// lib/auth/role.ts
import { AdminDTO } from "@/dto/admin.dto";
import { GuideDTO } from "@/dto/guide.dto";
import { TouristDTO } from "@/dto/tourist.dto";
import { LocalSigninResponse } from "@/dto/login.dto";

type AnyUser =
  | LocalSigninResponse
  | TouristDTO
  | GuideDTO
  | AdminDTO
  | null
  | undefined;

export function getRoleName(user: AnyUser): string | null {
  if (!user) return null;

  // common shapes I've seen in your codebase:
  // - { role: 'admin' }
  // - { role: { name: 'admin' } }
  // - AdminDTO may or may not embed role.name (adjust as needed)
  const r: any = (user as any).role;
  if (typeof r === "string") return r;
  if (r && typeof r.name === "string") return r.name;

  return null;
}

export function isAdmin(user: AnyUser): boolean {
  return getRoleName(user) === "admin";
}
