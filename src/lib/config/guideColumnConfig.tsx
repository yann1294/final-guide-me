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
      const src = row?.identification?.file;
      return src ? (
        <Image style={imgCellStyle} src={src} alt="ID" preview />
      ) : (
        <span className="text-muted">No file</span>
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
      const t = row?.identification?.type;
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
