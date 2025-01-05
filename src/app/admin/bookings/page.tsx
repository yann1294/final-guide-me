
'use client';

import SideBar from '@/components/common/SideBar';
import useTourStore from '@/stores/tourStore';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import { bookingGlobalSearchFields, useBookingGlobalFilters, userGlobalSearchFields, useUserGlobalFilters } from '@/lib/config/data-table.configs';
import {
    BookingColumnConfigs,
  TourColumnTemplates,
  UserColumnConfigs,
  modifyElement,
  useDataTableConfig,
} from '@/components/admin/FilterTemplates';
import { useFetchTours } from '@/hooks/useTours';
import { ContextType } from '@/lib/utils/context.utils';
import { ActionButtons } from '@/components/admin/ActionButtons';
import {
    CopyIcon,
  Edit2Icon,
  LayoutListIcon,
  ListIcon,
  ReceiptTextIcon,
  Trash2Icon,
  ViewIcon,
} from 'lucide-react';
import TourTable from '@/components/admin/TourTable';
import useUserStore from '@/stores/userStore';
import { useFetchTourists } from '@/hooks/useUsers';
import useBookingStore from '@/stores/bookingStore';
import { useFetchBookings } from '@/hooks/useBookings';

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
  );

  return (
    <>
      <div className="container mt-40">
        <div className="row">
          <div className="page-header col-12">
            <h2>Bookings</h2>
          </div>

          <div className="col-12 management-container">
            <DataTable {...dataTableConfig}
            globalFilterFields={bookingGlobalSearchFields}
            >
              {/* Render columns based on templates */}
              {BookingColumnConfigs.map((template) => {
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
