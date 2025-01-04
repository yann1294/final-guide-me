import { FilterMatchMode } from "primereact/api";
import { useState } from "react";

// global config
interface FilterValue {
  value: any;
  matchMode: FilterMatchMode;
}

interface Filters {
  global: FilterValue;
  name: FilterValue;
  location: FilterValue;
  priceExact: FilterValue;
  priceRange: FilterValue;
  duration: FilterValue;
  discount: FilterValue;
  isAvailable: FilterValue;
  date: FilterValue;
  guide: FilterValue;
}

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
