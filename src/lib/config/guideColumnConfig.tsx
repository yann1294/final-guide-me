import { ColumnFilterElementTemplateOptions, ColumnProps } from "primereact/column";
import { Image } from "primereact/image";
import {
  Edit2Icon,
  Trash2Icon,
  PowerCircleIcon,
  PowerOffIcon,
} from 'lucide-react';
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { dateFilterTemplate, dropDownFilterTemplate, modifyElement } from "@/components/admin/FilterTemplates";
import { convertSecondsToDateString } from "../utils/dateUtils";
import { Checkbox } from "primereact/checkbox";

export const guideColumnConfigs= [
  {
    field: 'uid',
    header: 'UID',
  },
  {
    field: 'approvalStatus',
    header: 'Approved',
    sortable: true,
    // filter: true,
  },
  {
    field: 'profilePhoto',
    header: 'Profile Photo',
    body: (data: any) => (
      <Image
        style={{
          height: '42px',
          width: '64px',
          objectFit: 'fill',
          borderRadius: '5px',
        }}
        src={data.profilePhoto}
        alt="Image"
        preview
      />
    ),
  },
  {
    field: 'firstName',
    header: 'First Name',
    sortable: true,
    filter: true,
    filterPlaceholder: 'Search by first name',
  },
  {
    field: 'lastName',
    header: 'Last Name',
    sortable: true,
    filter: true,
    filterPlaceholder: 'Search by last name',
  },
  {
    field: 'phoneNumber',
    header: 'Phone Number',
    sortable: true,
    filter: true,
    filterPlaceholder: 'Search by phone number',
  },
  {
    field: 'emailAddress',
    header: 'Email Address',
    sortable: true,
    filter: true,
    filterPlaceholder: 'Search by email',
  },
  {
    field: 'identification.file',
    header: 'Identification File',
    body: (data: any) => (
      <Image
        style={{
          height: '42px',
          width: '64px',
          objectFit: 'fill',
          borderRadius: '5px',
        }}
        src={data.identification.file}
        alt="Image"
        preview
      />
    ),
  },
  {
    field: 'identification.type',
    header: 'Identification Type',
    sortable: true,
    filter: true,
    filterElement: (options) =>
      dropDownFilterTemplate(options, ['passport', 'license', 'national']),
    body: (data: any) =>
      (data.identification?.type as string).toUpperCase() || 'N/A',
  },
  {
    field: 'spokenLanguages',
    header: 'Spoken Languages',
    body: (data: any) => data.spokenLanguages?.join(', ') || 'N/A',
  },
  {
    field: 'accountStatus',
    header: 'Account Status',
    sortable: true,
    filter: true,
    body: (data: any) => <Checkbox checked={data.accountStatus === 'active'} />,
  },
  {
    field: 'availability',
    header: 'Availability',
    sortable: true,
    filter: true,
    body: (data: any) => <Checkbox checked={data.availability} />
  },
  {
    field: 'createdAt._seconds',
    header: 'Account Created',
    sortable: true,
    // filter: true,
    // filterElement: dateFilterTemplate,
    body: (data: any) => convertSecondsToDateString(Object.keys(data.createdAt).includes('_seconds') ? data.createdAt._seconds : new Date(data.createdAt).getTime() / 1000),
  },
  {
    field: 'updatedAt._seconds',
    header: 'Last Updated',
    sortable: true,
    // filter: true,
    // filterElement: dateFilterTemplate,
    body: (data: any) => convertSecondsToDateString(Object.keys(data.updatedAt).includes('_seconds') ? data.updatedAt._seconds : new Date(data.updatedAt).getTime() / 1000),
  }
] as ColumnProps[];
