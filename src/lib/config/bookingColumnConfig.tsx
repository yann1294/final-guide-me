import { dropDownFilterTemplate } from "@/components/admin/FilterTemplates";
import { ColumnProps } from "primereact/column";

export const bookingColumnConfigs = [
    {
      field: 'id',
      header: 'Booking ID',
    },
    {
      field: 'status',
      header: 'Status',
      filter: true,
      sortable: true,
      filterPlaceholder: 'Search by status',
      style: { minWidth: '10rem' },
      body: (data) =>
        data.status === 'booked'
          ? 'Booked'
          : data.status === 'cancelled'
          ? 'Cancelled'
          : 'Pending',
    },
    {
      field: 'bookedOn._seconds',
      header: 'Booked On',
      filter: true,
      sortable: true,
      filterPlaceholder: 'Search by booking date',
      body: (data) => new Date(data.bookedOn._seconds * 1000).toLocaleDateString(),
    },
    {
      field: 'resourceId',
      header: 'Resource ID',
      filter: true,
      sortable: true,
      filterPlaceholder: 'Search by resource ID',
    },
    {
      field: 'bookingType',
      header: 'Booking Type',
      filter: true,
      sortable: true,
      filterElement: (options) => dropDownFilterTemplate(options, ['tour', 'package']),
  
    },
  ] as ColumnProps[];
  