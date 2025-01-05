'use client';

import SideBar from '@/components/common/SideBar';
import useTourStore from '@/stores/tourStore';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import { userGlobalSearchFields, useUserGlobalFilters } from '@/lib/config/data-table.configs';
import {
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

export default function AdminTouristsPage() {
  // Global filter state and actions
  const { filters, setFilters } = useUserGlobalFilters();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  // Fetching tours from the store and hook
  const { tourists } = useUserStore();
  const { loading, fetchTourists } = useFetchTourists();

  // Fetch tours when component mounts if not already fetched
  useEffect(() => {
    if (tourists.length === 0) {
      fetchTourists();
    }
  }, [fetchTourists, tourists.length]);

  // Get DataTable configuration
  const dataTableConfig = useDataTableConfig(
    ContextType.tourists,
    tourists,
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
            <h2>Tourists</h2>
          </div>

          <div className="col-12 management-container">
            <DataTable {...dataTableConfig}
            globalFilterFields={userGlobalSearchFields}
            >
              {/* Render columns based on templates */}
              {UserColumnConfigs.map((template) => {
                // Initialize column-specific configurations
                let additionalConfig: any = {};

                // Modify the element based on the template
                // Define custom column bodies based on field type
                if (template.field === 'uid') {
                    additionalConfig['body'] = (data: any) =>
                      modifyElement(
                        <CopyIcon
                          onClick={() => navigator.clipboard.writeText(data.id)}
                          size="18px"
                        />,
                        'Copy UID',
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
