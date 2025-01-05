import { timestampToDate } from '@/lib/utils/utils';
import {
  CopyIcon,
  BadgeCheckIcon,
  BadgeXIcon,
  ViewIcon,
  ExternalLinkIcon,
  Edit2Icon,
  Trash2Icon,
} from 'lucide-react';
import {
  ColumnFilterElementTemplateOptions,
  ColumnProps,
} from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';

import { Button } from 'primereact/button'; // Button component from PrimeReact
import { getTableRange } from '@/lib/utils/utils'; // Helper function for table range
import { CONTEXT, ContextType } from '@/lib/utils/context.utils'; // Context type for filters
import FilterHeader from './FilterHeader';
import { TourDTO } from '@/dto/tour.dto';
import { PackageDTO } from '@/dto/package.dto';
import { Dispatch, SetStateAction } from 'react';
import { DataTableProps, DataTableStateEvent } from 'primereact/datatable';

export const modifyElement = (element: any, title = '', clickable = true) => (
  <div
    className={`${
      clickable ? 'make-clickable ' : ''
    }flex justify-content-center`}
  >
    <span title={title}>{element}</span>
  </div>
);

export const rangeRowFilterTemplate = (
  options: ColumnFilterElementTemplateOptions,
) => {
  const [from, to] = options.value ?? [null, null];

  return (
    <div className="flex gap-1">
      <InputNumber
        value={from}
        onChange={(e) => options.filterApplyCallback([e.value, to])}
        className="w-full"
        placeholder="from"
      />
      <InputNumber
        value={to}
        onChange={(e) => options.filterApplyCallback([from, e.value])}
        className="w-full"
        placeholder="to"
      />
    </div>
  );
};

export const multiSelectRowFilterTemplate = (
  options: ColumnFilterElementTemplateOptions,
) => (
  <MultiSelect
    value={options.value}
    options={[{ name: 'Guide 1' }, { name: 'Guide 2' }, { name: 'Guide 3' }]}
    onChange={(e) => options.filterApplyCallback(e.value)}
    optionLabel="name"
    placeholder="Any"
    className="p-column-filter"
    maxSelectedLabels={1}
    style={{ minWidth: '14rem' }}
  />
);

export const useDataTableConfig = (
  context: CONTEXT,
  resources: TourDTO[] | PackageDTO[],
  filters: any,
  setFilters: Dispatch<SetStateAction<any>>,
  globalFilterValue: string,
  setGlobalFilterValue: Dispatch<SetStateAction<string>>,
  loading: boolean,
) => {
  return {
    value: resources,
    paginator: true,
    rows: 10,
    dataKey: 'id',
    filters: filters,
    globalFilterFields: ['name', 'category', 'status'], // Example fields for resources
    filterDisplay: 'menu',
    header: (
      <FilterHeader
        context={context} // Updated context for resources
        globalFilterValue={globalFilterValue}
        filters={filters}
        setFilters={setFilters}
        setGlobalFilterValue={setGlobalFilterValue}
      />
    ),
    emptyMessage:
      context === ContextType.tour ? 'No tours found.' : 'No packages found.',
    resizableColumns: true,
    onFilter: (e: DataTableStateEvent) => setFilters(e.filters),
    sortMode: 'multiple',
    removableSort: true,
    rowsPerPageOptions: getTableRange(resources.length),
    paginatorTemplate:
      'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown',
    currentPageReportTemplate: `Showing {first} to {last} of {totalRecords} ${
      context === ContextType.tour ? 'Tours' : 'Packages'
    }`,
    paginatorLeft: <Button type="button" icon="pi pi-refresh" text />,
    paginatorRight: <Button type="button" icon="pi pi-download" text />,
    loading: loading,
    loadingIcon: (
      <div className="circular-loader-container">
        <div className="circular-loader"></div>
      </div>
    ),
  } as DataTableProps<TourDTO[] | PackageDTO[]>;
};

export const TourColumnTemplates = [
  {
    field: 'id',
    header: 'ID',
    body: () => modifyElement(<CopyIcon size="18px" />, 'Copy tour ID'),
  },
  {
    field: 'name',
    header: 'Name',
    filter: true,
    sortable: true,
    filterPlaceholder: 'Search by name',
    style: { minWidth: '15rem' },
  },
  {
    field: 'location',
    header: 'Location (City, Country)',
    filter: true,
    sortable: true,
    // filterField: 'location.country',
    sortField: 'location.country',
    filterPlaceholder: 'Search by location',
    style: { minWidth: '18rem' },
    body: (data: any) => `${data.location.city}, ${data.location.country}`,
  },
  {
    field: 'price',
    header: 'Price',
    filter: true,
    sortable: true,
    filterPlaceholder: 'Enter price range',
    filterElement: rangeRowFilterTemplate,
    showFilterMenu: false,
    style: { minWidth: '12rem' },
  },
  {
    field: 'durationDays',
    header: 'Duration (Days)',
    filter: true,
    sortable: true,
    filterPlaceholder: 'Enter duration (days)',
    filterElement: rangeRowFilterTemplate,
    showFilterMenu: false,
    style: { minWidth: '10rem' },
  },
  {
    field: 'discount',
    header: 'Discount',
    filter: true,
    sortable: true,
    filterPlaceholder: 'Enter discount',
    filterElement: rangeRowFilterTemplate,
    showFilterMenu: false,
    style: { minWidth: '10rem' },
  },
  {
    field: 'numberOfSeats',
    header: 'Seats',
    filter: true,
    sortable: true,
    filterPlaceholder: 'Enter number of seats',
    filterElement: rangeRowFilterTemplate,
    showFilterMenu: false,
    style: { minWidth: '10rem' },
  },
  {
    field: 'isAvailable',
    header: 'Available',
    filter: true,
    sortable: true,
    filterElement: (options: ColumnFilterElementTemplateOptions) => (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    ),
    showFilterMenu: false,
    body: (data: any) =>
      modifyElement(
        data.isAvailable ? (
          <BadgeCheckIcon size="18px" className="text-success" />
        ) : (
          <BadgeXIcon size="18px" className="text-danger" />
        ),
      ),
  },
  {
    field: 'activities',
    header: 'Activities',
  },
  {
    field: 'description',
    header: 'Description',
  },
  {
    field: 'images',
    header: 'Images',
    body: () => modifyElement(<ViewIcon size="18px" />, 'View Tour Images'),
  },
  {
    field: 'guide',
    header: 'Guide',
    filter: true,
    sortable: true,
    filterPlaceholder: 'Search by guide',
    filterElement: multiSelectRowFilterTemplate,
    showFilterMenu: false,
    body: () =>
      modifyElement(<ExternalLinkIcon size="18px" />, 'View Guide Profile'),
  },
  {
    field: 'actions',
    exportable: false,
  },
] as ColumnProps[];

export const ActivityColumnConfigs = [
  {
    field: 'id',
    header: 'ID',
    sortable: true,
    body: (data) =>
      modifyElement(
        <CopyIcon
          onClick={() => {
            navigator.clipboard.writeText(data.id);
          }}
          size="18px"
        />,
        'Copy activity ID',
      ),
  },
  { field: 'name', header: 'Tour Name', sortable: true },
  { field: 'durationHours', header: 'Duration (Hours)', sortable: true },
  { field: 'location.name', header: 'Location Name', sortable: true },
  { field: 'location.city', header: 'City', sortable: true },
  { field: 'location.country', header: 'Country', sortable: true },
  { field: 'location.address', header: 'Address', sortable: true },
  { field: 'transportation.type', header: 'Transport Type', sortable: true },
  {
    field: 'transportation.arrivalTime',
    header: 'Arrival Time',
    sortable: true,
    body: (data) => timestampToDate(data.transportation.arrivalTime),
    style: { maxWidth: '200px' },
  },
  {
    field: 'transportation.departureTime',
    header: 'Departure Time',
    sortable: true,
    body: (data) => timestampToDate(data.transportation.departureTime),
    style: { maxWidth: '200px' },
  },
  { field: 'accommodation.type', header: 'Accommodation Type', sortable: true },
  { field: 'accommodation.name', header: 'Accommodation Name', sortable: true },
  {
    field: 'actions',
    header: 'Actions',
    exportable: false,
  },
] as ColumnProps[];

export const PackageColumnConfigs = [
  {
    field: 'id',
    header: 'ID',
  },
  {
    field: 'name',
    header: 'Name',
    filter: true,
    sortable: true,
    filterPlaceholder: 'Search by name',
    style: { minWidth: '15rem' },
  },
  {
    field: 'location',
    header: 'Location (City, Country)',
    filter: true,
    sortable: true,
    sortField: 'location.country',
    filterPlaceholder: 'Search by location',
    style: { minWidth: '18rem' },
    body: (data: any) => `${data.location.city}, ${data.location.country}`,
  },
  {
    field: 'price',
    header: 'Price',
    filter: true,
    sortable: true,
    filterPlaceholder: 'Enter price range',
    filterElement: rangeRowFilterTemplate,
    showFilterMenu: false,
    style: { minWidth: '12rem' },
  },
  {
    field: 'durationDays',
    header: 'Duration (Days)',
    filter: true,
    sortable: true,
    filterPlaceholder: 'Enter duration (days)',
    filterElement: rangeRowFilterTemplate,
    showFilterMenu: false,
    style: { minWidth: '10rem' },
  },
  {
    field: 'discount',
    header: 'Discount',
    filter: true,
    sortable: true,
    filterPlaceholder: 'Enter discount',
    filterElement: rangeRowFilterTemplate,
    showFilterMenu: false,
    style: { minWidth: '10rem' },
  },
  {
    field: 'numberOfSeats',
    header: 'Seats',
    filter: true,
    sortable: true,
    filterPlaceholder: 'Enter number of seats',
    filterElement: rangeRowFilterTemplate,
    showFilterMenu: false,
    style: { minWidth: '10rem' },
  },
  {
    field: 'isAvailable',
    header: 'Available',
    filter: true,
    sortable: true,
    filterElement: (options: ColumnFilterElementTemplateOptions) => (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    ),
    showFilterMenu: false,
    body: (data: any) =>
      modifyElement(
        data.isAvailable ? (
          <BadgeCheckIcon size="18px" className="text-success" />
        ) : (
          <BadgeXIcon size="18px" className="text-danger" />
        ),
      ),
  },
  {
    field: 'description',
    header: 'Description',
  },
  {
    field: 'images',
    header: 'Images',
    body: () => modifyElement(<ViewIcon size="18px" />, 'View Tour Images'),
  },
  {
    field: 'guide',
    header: 'Guide',
    filter: true,
    sortable: true,
    filterPlaceholder: 'Search by guide',
    filterElement: multiSelectRowFilterTemplate,
    showFilterMenu: false,
    body: () =>
      modifyElement(<ExternalLinkIcon size="18px" />, 'View Guide Profile'),
  },
  {
    field: 'date',
    header: 'Start Date',
    filter: true,
    sortable: true,
    filterPlaceholder: 'Enter date',
    body: (data: any) =>
      new Date(data.date._seconds * 1000).toLocaleDateString(),
  },
  {
    field: 'tours',
    header: 'Package Tours',
  },
  {
    field: 'actions',
    exportable: false,
  },
] as ColumnProps[];

export const UserColumnConfigs = [
  {
    field: 'uid',
    header: 'UID',
    sortable: true,
    filter: true,
    filterPlaceholder: 'Search by UID',
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
    field: 'profilePhoto',
    header: 'Profile Photo',
    body: (data: any) => (
      <img
        src={data.profilePhoto}
        alt="Profile"
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
    ),
  },
  {
    field: 'role.name',
    header: 'Role',
    sortable: true,
    filter: true,
    filterPlaceholder: 'Search by role',
    body: (data: any) => data.role?.name || 'N/A',
  },
  {
    field: 'accountStatus',
    header: 'Account Status',
    sortable: true,
    filter: true,
    filterPlaceholder: 'Search by account status',
  },
  {
    field: 'createdAt',
    header: 'Account Created',
    sortable: true,
    filter: true,
    filterElement: rangeRowFilterTemplate,
    body: (data: any) => new Date(data.createdAt).toLocaleString(),
  },
  {
    field: 'updatedAt',
    header: 'Last Updated',
    sortable: true,
    filter: true,
    filterElement: rangeRowFilterTemplate,
    body: (data: any) => new Date(data.updatedAt).toLocaleString(),
  },
  {
    field: 'identification.file',
    header: 'Identification File',
    body: (data: any) => (
      <a href={data.identification?.file} target="_blank" rel="noopener noreferrer">
        View ID
      </a>
    ),
  },
  {
    field: 'identification.type',
    header: 'Identification Type',
    sortable: true,
    filter: true,
    filterPlaceholder: 'Search by ID type',
    body: (data: any) => data.identification?.type || 'N/A',
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
