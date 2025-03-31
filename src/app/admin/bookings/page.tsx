'use client';

import SideBar from '@/components/common/SideBar';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import {
  bookingGlobalSearchFields,
  useBookingGlobalFilters,
} from '@/lib/config/globalSearchConfig';
import { modifyElement } from '@/components/admin/FilterTemplates';
import { ContextType } from '@/lib/utils/contextUtils';
import { CopyIcon } from 'lucide-react';
import useBookingStore from '@/stores/bookingStore';
import { useFetchBookings } from '@/hooks/useBookings';
import { bookingColumnConfigs } from '@/lib/config/bookingColumnConfig';
import { useDataTableConfig } from '@/lib/config/dataTableConfig';

export default function AdminBookingsPage() {
  // Global filter state and actions
  const { filters, setFilters } = useBookingGlobalFilters();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  // Fetching tours from the store and hook
  const { bookings } = useBookingStore();
  const { loading, fetchBookings } = useFetchBookings();

  // Fetch tours when component mounts if not already fetched
  useEffect(() => {
    if (bookings.length === 0) {
      fetchBookings();
    }
  }, [fetchBookings, bookings.length]);

  // Get DataTable configuration
  const dataTableConfig = useDataTableConfig(
    ContextType.bookings,
    bookings,
    filters,
    setFilters,
    globalFilterValue,
    setGlobalFilterValue,
    loading,
    bookingGlobalSearchFields,
  );

  return (
    <>
      <div className="container mt-40">
        <div className="row">
          <div className="page-header col-12">
            <h2>Bookings</h2>
          </div>

          <div className="col-12 management-container">
            <DataTable
              {...dataTableConfig}
              globalFilterFields={bookingGlobalSearchFields}
            >
              {/* Render columns based on templates */}
              {bookingColumnConfigs.map((template) => {
                // Initialize column-specific configurations
                let additionalConfig: any = {};

                // Modify the element based on the template
                // Define custom column bodies based on field type
                if (template.field === 'id') {
                  additionalConfig['body'] = (data: any) =>
                    modifyElement(
                      <CopyIcon
                        onClick={() => navigator.clipboard.writeText(data.id)}
                        size="18px"
                      />,
                      'Copy Booking ID',
                    );
                }

                // Return the configured column
                return (
                  <Column
                    key={template.field}
                    {...template}
                    {...additionalConfig}
                  />
                );
              })}
            </DataTable>{' '}
          </div>
        </div>
      </div>

      {/* Sidebar component */}
      <SideBar />
    </>
  );
}
