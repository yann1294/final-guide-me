import { GuideDTO } from '@/dto/guide.dto';
import { BookingDTO } from '@/dto/booking.dto';
import { Button } from 'primereact/button'; // Button component from PrimeReact
import { CONTEXT } from '@/lib/utils/contextUtils'; // Context type for filters
import { TourDTO } from '@/dto/tour.dto';
import { PackageDTO } from '@/dto/package.dto';
import { Dispatch, SetStateAction } from 'react';
import { DataTableProps, DataTableStateEvent } from 'primereact/datatable';
import { TouristDTO } from '@/dto/tourist.dto';
import FilterHeader from '@/components/admin/FilterHeader';
import { getTableRange } from '../utils/paginationUtils';

export const useDataTableConfig = (
    context: CONTEXT,
    resources: TourDTO[] | PackageDTO[] | TouristDTO[] | GuideDTO[] | BookingDTO[],
    filters: any,
    setFilters: Dispatch<SetStateAction<any>>,
    globalFilterValue: string,
    setGlobalFilterValue: Dispatch<SetStateAction<string>>,
    loading: boolean,
    globalFilterFields: string[],
  ) => {
    return {
      value: resources,
      paginator: true,
      rows: 10,
      dataKey: 'id',
      filters: filters,
      globalFilterFields: globalFilterFields,
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
      emptyMessage: `No ${context} found.`,
      resizableColumns: true,
      onFilter: (e: DataTableStateEvent) => setFilters(e.filters),
      sortMode: 'multiple',
      removableSort: true,
      rowsPerPageOptions: getTableRange(resources.length),
      paginatorTemplate:
        'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown',
      currentPageReportTemplate: `Showing {first} to {last} of {totalRecords} ${context.context}`,
      paginatorLeft: <Button type="button" icon="pi pi-refresh" text />,
      paginatorRight: <Button type="button" icon="pi pi-download" text />,
      loading: loading,
      loadingIcon: (
        <div className="circular-loader-container">
          <div className="circular-loader"></div>
        </div>
      ),
    } as DataTableProps<TourDTO[] | PackageDTO[] | TouristDTO[] | GuideDTO[]> | BookingDTO[];
  };