import { FilterMatchMode } from "primereact/api";
import { useState } from "react";

// global config

export const useGlobalFilters = () => {
    const [filters, setFilters] = useState<any>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS }, // Name search (contains)
        location: { value: null, matchMode: FilterMatchMode.EQUALS }, // Country dropdown
        price: { value: [null, null], matchMode: FilterMatchMode.BETWEEN }, // Price range
        duration: { value: [null, null], matchMode: FilterMatchMode.BETWEEN }, // Duration range
        discount: { value: [null, null], matchMode: FilterMatchMode.BETWEEN }, // Discount range
        isAvailable: { value: null, matchMode: FilterMatchMode.EQUALS }, // Availability dropdown
        date: { value: [null, null], matchMode: FilterMatchMode.BETWEEN }, // Date range
        guide: { value: null, matchMode: FilterMatchMode.CONTAINS }, // Guide search
    });
    

  return { filters, setFilters };
};

export const useUserGlobalFilters = () => {
  const [filters, setFilters] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: { value: null, matchMode: FilterMatchMode.CONTAINS }, // First name search
    lastName: { value: null, matchMode: FilterMatchMode.CONTAINS }, // Last name search
    phoneNumber: { value: null, matchMode: FilterMatchMode.CONTAINS }, // Phone number search
    emailAddress: { value: null, matchMode: FilterMatchMode.CONTAINS }, // Email address search
    accountStatus: { value: null, matchMode: FilterMatchMode.EQUALS }, // Account status (active/inactive)
    // createdAt: { value: [null, null], matchMode: FilterMatchMode.DATE_IS }, // Date range for account creation
    // updatedAt: { value: [null, null], matchMode: FilterMatchMode.DATE_IS }, // Date range for last update
    identificationType: { value: null, matchMode: FilterMatchMode.EQUALS }, // Identification type (passport, etc.)
    spokenLanguages: { value: null, matchMode: FilterMatchMode.CONTAINS }, // Spoken languages search
  });

  return { filters, setFilters };
};

export const useBookingGlobalFilters = () => {
  const [filters, setFilters] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.CONTAINS }, // Booking ID search
    status: { value: null, matchMode: FilterMatchMode.EQUALS }, // Booking status (e.g., booked, cancelled)
    // bookedOn: { value: [null, null], matchMode: FilterMatchMode.DATE_IS }, // Booking date range
    tourist: { value: null, matchMode: FilterMatchMode.CONTAINS }, // Tourist names
    resourceId: { value: null, matchMode: FilterMatchMode.CONTAINS }, // Resource ID search
    bookingType: { value: null, matchMode: FilterMatchMode.EQUALS }, // Booking type (e.g., tour, package)
  });

  return { filters, setFilters };
};



// global filter fields
export const globalFilterFields = [
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

  export const userGlobalSearchFields = [
    'firstName',
    'lastName',
    'phoneNumber',
    'emailAddress',
    'accountStatus',
    'identification.type',
    'spokenLanguages',
  ];
  

  export const bookingGlobalSearchFields = [
    'status',
    'resourceId',
    'bookingType',
  ];
  

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
