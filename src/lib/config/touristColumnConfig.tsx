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

export const touristColumnConfigs= [
  {
    field: 'uid',
    header: 'UID',
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
    field: 'accountStatus',
    header: 'Account Status',
    sortable: true,
    filter: true,
    filterElement: (options: ColumnFilterElementTemplateOptions) => (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    ),
    showFilterMenu: false,
    body: (data: any) =>
      modifyElement(
        data.accountStatus === 'active' ? (
          <PowerCircleIcon size="18px" className="text-success" />
        ) : (
          <PowerOffIcon size="18px" className="text-danger" />
        ),
      ),
  },
  {
    field: 'createdAt._seconds',
    header: 'Account Created',
    sortable: true,
    filter: true,
    filterElement: dateFilterTemplate,
    body: (data: any) => convertSecondsToDateString(data.createdAt),
  },
  {
    field: 'updatedAt._seconds',
    header: 'Last Updated',
    sortable: true,
    filter: true,
    filterElement: dateFilterTemplate,
    body: (data: any) => convertSecondsToDateString(data.updatedAt),
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
    field: 'actions',
    exportable: false,
    body: (data: any) => (
      <div className="row-action-btns">
        <div className="row-edit">
          <Edit2Icon size="18px" />
        </div>
        <div className="row-delete">
          <Trash2Icon size="18px" />
        </div>
      </div>
    ),
  },
] as ColumnProps[];
