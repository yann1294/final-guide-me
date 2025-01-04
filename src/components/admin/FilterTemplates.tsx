import { timestampToDate } from '@/lib/utils/utils';
import {
  CopyIcon,
  BadgeCheckIcon,
  BadgeXIcon,
  LayoutListIcon,
  ReceiptTextIcon,
  ViewIcon,
  ExternalLinkIcon,
  Trash2Icon,
  Edit2Icon,
} from 'lucide-react';
import { ColumnFilterElementTemplateOptions, ColumnProps } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Col } from 'reactstrap';

export const modifyElement = (element: any, title = '', clickable = true) => (
  <div
    className={`${
      clickable ? 'make-clickable ' : ''
    }flex justify-content-center`}
  >
    <span title={title}>{element}</span>
  </div>
);

export const rangeRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
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

  export const multiSelectRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => (
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
  }
] as ColumnProps[];


export const ActivityColumnConfigs = [
  { field: "id", header: "ID", sortable: true, body: (data) => modifyElement(<CopyIcon onClick={() => {
    navigator.clipboard.writeText(data.id);
  }} size="18px" />, 'Copy activity ID') },
  { field: "name", header: "Tour Name", sortable: true },
  { field: "durationHours", header: "Duration (Hours)", sortable: true },
  { field: "location.name", header: "Location Name", sortable: true },
  { field: "location.city", header: "City", sortable: true },
  { field: "location.country", header: "Country", sortable: true },
  { field: "location.address", header: "Address", sortable: true },
  { field: "transportation.type", header: "Transport Type", sortable: true },
  {
      field: "transportation.arrivalTime",
      header: "Arrival Time",
      sortable: true,
      body: (data) => timestampToDate(data.transportation.arrivalTime),
      style: { maxWidth: '200px' },
  },
  {
      field: "transportation.departureTime",
      header: "Departure Time",
      sortable: true,
      body: (data) => timestampToDate(data.transportation.departureTime),
      style: { maxWidth: '200px' },
  },
  { field: "accommodation.type", header: "Accommodation Type", sortable: true },
  { field: "accommodation.name", header: "Accommodation Name", sortable: true },
  {
    field: "actions",
      header: "Actions",
      exportable: false,
  }
] as ColumnProps[];


export const PackageColumnConfigs = [
  {
    field: 'id',
    header: 'ID',
    body: (data) => modifyElement(<CopyIcon onClick={() => {
      navigator.clipboard.writeText(data.id);
    }} size="18px" />, 'Copy package ID'),
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
    body: (data: any) => new Date(data.date._seconds * 1000).toLocaleDateString(),
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
