import {
  CopyIcon,
  BadgeCheckIcon,
  BadgeXIcon,
  LayoutListIcon,
  ReceiptTextIcon,
  ViewIcon,
  ExternalLinkIcon,
} from 'lucide-react';
import { ColumnFilterElementTemplateOptions, ColumnProps } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';

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
  


export const FilterTemplates = [
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
    body: () =>
      modifyElement(<LayoutListIcon size="18px" />, 'View Tour Activities'),
  },
  {
    field: 'description',
    header: 'Description',
    body: () =>
      modifyElement(<ReceiptTextIcon size="18px" />, 'View Tour Description'),
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
] as ColumnProps[];
