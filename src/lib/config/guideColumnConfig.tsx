// import { ColumnFilterElementTemplateOptions, ColumnProps } from "primereact/column";
// import { Image } from "primereact/image";
// import {
//   Edit2Icon,
//   Trash2Icon,
//   PowerCircleIcon,
//   PowerOffIcon,
// } from 'lucide-react';
// import { TriStateCheckbox } from "primereact/tristatecheckbox";
// import { dateFilterTemplate, dropDownFilterTemplate, modifyElement } from "@/components/admin/FilterTemplates";
// import { convertSecondsToDateString } from "../utils/dateUtils";
// import { Checkbox } from "primereact/checkbox";

// export const guideColumnConfigs= [
//   {
//     field: 'uid',
//     header: 'UID',
//   },
//   {
//     field: 'approvalStatus',
//     header: 'Approved',
//     sortable: true,
//     // filter: true,
//   },
//   {
//     field: 'profilePhoto',
//     header: 'Profile Photo',
//     body: (data: any) => (
//       <Image
//         style={{
//           height: '42px',
//           width: '64px',
//           objectFit: 'fill',
//           borderRadius: '5px',
//         }}
//         src={data.profilePhoto}
//         alt="Image"
//         preview
//       />
//     ),
//   },
//   {
//     field: 'firstName',
//     header: 'First Name',
//     sortable: true,
//     filter: true,
//     filterPlaceholder: 'Search by first name',
//   },
//   {
//     field: 'lastName',
//     header: 'Last Name',
//     sortable: true,
//     filter: true,
//     filterPlaceholder: 'Search by last name',
//   },
//   {
//     field: 'phoneNumber',
//     header: 'Phone Number',
//     sortable: true,
//     filter: true,
//     filterPlaceholder: 'Search by phone number',
//   },
//   {
//     field: 'emailAddress',
//     header: 'Email Address',
//     sortable: true,
//     filter: true,
//     filterPlaceholder: 'Search by email',
//   },
//   {
//     field: 'identification.file',
//     header: 'Identification File',
//     body: (data: any) => (
//       <Image
//         style={{
//           height: '42px',
//           width: '64px',
//           objectFit: 'fill',
//           borderRadius: '5px',
//         }}
//         src={data.identification.file}
//         alt="Image"
//         preview
//       />
//     ),
//   },
//   {
//     field: 'identification.type',
//     header: 'Identification Type',
//     sortable: true,
//     filter: true,
//     filterElement: (options) =>
//       dropDownFilterTemplate(options, ['passport', 'license', 'national']),
//     body: (data: any) =>
//       (data.identification?.type as string).toUpperCase() || 'N/A',
//   },
//   {
//     field: 'spokenLanguages',
//     header: 'Spoken Languages',
//     body: (data: any) => data.spokenLanguages?.join(', ') || 'N/A',
//   },
//   {
//     field: 'accountStatus',
//     header: 'Account Status',
//     sortable: true,
//     filter: true,
//     body: (data: any) => <Checkbox checked={data.accountStatus === 'active'} />,
//   },
//   {
//     field: 'availability',
//     header: 'Availability',
//     sortable: true,
//     filter: true,
//     body: (data: any) => <Checkbox checked={data.availability} />
//   },
//   {
//     field: 'createdAt._seconds',
//     header: 'Account Created',
//     sortable: true,
//     // filter: true,
//     // filterElement: dateFilterTemplate,
//     body: (data: any) => convertSecondsToDateString(Object.keys(data.createdAt).includes('_seconds') ? data.createdAt._seconds : new Date(data.createdAt).getTime() / 1000),
//   },
//   {
//     field: 'updatedAt._seconds',
//     header: 'Last Updated',
//     sortable: true,
//     // filter: true,
//     // filterElement: dateFilterTemplate,
//     body: (data: any) => convertSecondsToDateString(Object.keys(data.updatedAt).includes('_seconds') ? data.updatedAt._seconds : new Date(data.updatedAt).getTime() / 1000),
//   }
// ] as ColumnProps[];
import { ColumnProps } from "primereact/column";
import { Image } from "primereact/image";
import { dropDownFilterTemplate } from "@/components/admin/FilterTemplates";
import { convertSecondsToDateString } from "../utils/dateUtils";
import { Checkbox } from "primereact/checkbox";
import Link from "next/link";

const imgCellStyle: React.CSSProperties = {
  height: "42px",
  width: "64px",
  objectFit: "cover",
  borderRadius: "5px",
};

const toSeconds = (v: any): number | undefined => {
  if (!v) return undefined;
  if (typeof v === "object" && "_seconds" in v) return v._seconds as number;
  const ms = Date.parse(v); // handles ISO strings
  return Number.isFinite(ms) ? Math.floor(ms / 1000) : undefined;
};

// 🔽 Resolve the identification file src from various shapes
// guideColumnConfig.ts
const resolveIdFileSrc = (row: any): string | undefined => {
  // 1) common keys
  let v: any =
    row?.identification?.file ??
    row?.identificationFile ??
    row?.identification?.url ??
    row?.idFileUrl ??
    row?.idFile?.url ??
    row?.idFile; // sometimes a plain string

  // 2) object forms like { url }, { href }, { bucket, fullPath }, etc.
  if (v && typeof v === "object") {
    v =
      v.url ?? v.href ?? v.downloadURL ?? v.downloadUrl ?? v.path ?? v.fullPath;
    // if still object with {bucket, fullPath}, try to build
    if (typeof v !== "string") {
      const bucket =
        row?.identification?.bucket ??
        row?.bucket ??
        process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
      const fullPath =
        row?.identification?.fullPath ??
        row?.identification?.path ??
        row?.fullPath ??
        row?.path;
      const token =
        row?.identification?.downloadToken ??
        row?.identification?.downloadTokens?.split(",")[0] ??
        row?.downloadToken ??
        row?.downloadTokens?.split(",")[0];

      if (bucket && fullPath) {
        const base = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(fullPath)}?alt=media`;
        return token ? `${base}&token=${encodeURIComponent(token)}` : base;
      }
    }
  }

  if (!v || typeof v !== "string") return undefined;

  // 3) http(s) directly usable
  if (/^https?:\/\//i.test(v)) return v;

  // 4) raw Firebase REST path
  if (v.startsWith("/v0/b/"))
    return `https://firebasestorage.googleapis.com${v}`;

  // 5) gs://bucket/path → public download URL (if public or tokenless allowed)
  if (v.startsWith("gs://")) {
    const m = /^gs:\/\/([^/]+)\/(.+)$/.exec(v);
    if (m) {
      const [, bucket, path] = m;
      return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
        path,
      )}?alt=media`;
    }
  }

  return undefined; // unknown format
};

const isImage = (u: string) =>
  /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(new URL(u, location.origin).pathname);

export const guideColumnConfigs: ColumnProps[] = [
  { field: "uid", header: "UID" },
  { field: "approvalStatus", header: "Approved", sortable: true },

  {
    field: "profilePhoto",
    header: "Profile Photo",
    body: (row: any) => {
      const src = row?.profilePhoto;
      return src ? (
        <Image style={imgCellStyle} src={src} alt="Profile" preview />
      ) : (
        <span className="text-muted">No photo</span>
      );
    },
  },

  { field: "firstName", header: "First Name", sortable: true, filter: true },
  { field: "lastName", header: "Last Name", sortable: true, filter: true },
  {
    field: "phoneNumber",
    header: "Phone Number",
    sortable: true,
    filter: true,
  },
  {
    field: "emailAddress",
    header: "Email Address",
    sortable: true,
    filter: true,
  },

  {
    field: "identification.file",
    header: "Identification File",
    body: (row: any) => {
      const src = resolveIdFileSrc(row);
      if (!src) return <span className="text-muted">No file</span>;

      return isImage(src) ? (
        <Image style={imgCellStyle} src={src} alt="ID" preview />
      ) : (
        <Link href={src} target="_blank" rel="noreferrer">
          Open file
        </Link>
      );
    },
  },

  {
    field: "identification.type",
    header: "Identification Type",
    sortable: true,
    filter: true,
    filterElement: (options) =>
      dropDownFilterTemplate(options, ["passport", "license", "national"]),
    body: (row: any) => {
      const t = row?.identification?.type ?? row?.identificationType;
      return t ? String(t).toUpperCase() : "N/A";
    },
  },

  {
    field: "spokenLanguages",
    header: "Spoken Languages",
    body: (row: any) =>
      Array.isArray(row?.spokenLanguages)
        ? row.spokenLanguages.join(", ")
        : "N/A",
  },

  {
    field: "accountStatus",
    header: "Account Status",
    sortable: true,
    filter: true,
    body: (row: any) => (
      <Checkbox checked={row?.accountStatus === "active"} readOnly />
    ),
  },

  {
    field: "availability",
    header: "Availability",
    sortable: true,
    filter: true,
    body: (row: any) => <Checkbox checked={!!row?.availability} readOnly />,
  },

  {
    field: "createdAt._seconds",
    header: "Account Created",
    sortable: true,
    body: (row: any) => {
      const sec = toSeconds(row?.createdAt);
      return sec ? convertSecondsToDateString(sec) : "—";
    },
  },

  {
    field: "updatedAt._seconds",
    header: "Last Updated",
    sortable: true,
    body: (row: any) => {
      const sec = toSeconds(row?.updatedAt);
      return sec ? convertSecondsToDateString(sec) : "—";
    },
  },
];
