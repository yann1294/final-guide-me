import { FilterMatchMode } from "primereact/api";
import { useState } from "react";

// Global filter fields for tours and packages
export const resourceGlobalFilterFields = [
  'name',
  'location.name',
  'location.city',
  'location.country',
  'location.address',
  'guide',
  'price',
  'durationDays',
  'discount',
  'numberOfSeats'
];

export const useResourceGlobalFilters = () => {
  const [filters, setFilters] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    location: { value: null, matchMode: FilterMatchMode.EQUALS },
    price: { value: [null, null], matchMode: FilterMatchMode.BETWEEN },
    duration: { value: [null, null], matchMode: FilterMatchMode.BETWEEN },
    discount: { value: [null, null], matchMode: FilterMatchMode.BETWEEN },
    isAvailable: { value: null, matchMode: FilterMatchMode.EQUALS },
    date: { value: [null, null], matchMode: FilterMatchMode.BETWEEN },
    guide: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  return { filters, setFilters };
};

// Global search fields for users
export const userGlobalSearchFields = [
  'firstName',
  'lastName',
  'phoneNumber',
  'emailAddress',
  'accountStatus',
  'identification.type',
  'spokenLanguages',
];

export const useUserGlobalFilters = () => {
  const [filters, setFilters] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    lastName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phoneNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    emailAddress: { value: null, matchMode: FilterMatchMode.CONTAINS },
    accountStatus: { value: null, matchMode: FilterMatchMode.EQUALS },
    identificationType: { value: null, matchMode: FilterMatchMode.CONTAINS },
    spokenLanguages: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  return { filters, setFilters };
};

// Global search fields for bookings
export const bookingGlobalSearchFields = [
  'status',
  'resourceId',
  'bookingType',
];

export const useBookingGlobalFilters = () => {
  const [filters, setFilters] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    tourist: { value: null, matchMode: FilterMatchMode.CONTAINS },
    resourceId: { value: null, matchMode: FilterMatchMode.CONTAINS },
    bookingType: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  return { filters, setFilters };
};

  
  


  

  // Important attributes to set 
/**
 * For Data table
 * - value={tourTestData}
 * - paginator
 * - rows={5}
 * - dataKey="id"
 * - filters={filters}
 * - globalFilterFields={[]}
 * - filterDisplay="row"
 * - header={}
 * - emptyMessage="No tours found."
 *
 * For Column
 * - filterField: json key (path for tested fields)
 * - header: Name of Field
 * - style
 * - body
 * - filter - to include filter
 * - filterPlaceHolder
 * - filterElement
 * - dataType
 * - filterMenu
 * - filterMenuStyle
 */

// Filter handlers to have
/**
 * - All CONTAINS filters
 * - All BETWEEN filters
 */

// Templates to build
/**
 * - Global filter
 * - DROPDOWN
 * - RANGE
 * - Is available: status - Tab
 */
