import { modifyElement, multiSelectRowFilterTemplate, rangeRowFilterTemplate } from "@/components/admin/FilterTemplates";
import { BadgeCheckIcon, BadgeXIcon, ExternalLinkIcon, ViewIcon } from "lucide-react";
import { ColumnFilterElementTemplateOptions, ColumnProps } from "primereact/column";
import { TriStateCheckbox } from "primereact/tristatecheckbox";

export const packageColumnConfigs = [
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
  