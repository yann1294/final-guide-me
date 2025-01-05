'use client';

import SideBar from '@/components/common/SideBar';
import useTourStore from '@/stores/tourStore';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import { useGlobalFilters } from '@/lib/config/data-table.configs';
import {
  TourColumnTemplates,
  modifyElement,
  useDataTableConfig,
} from '@/components/admin/FilterTemplates';
import { useFetchTours } from '@/hooks/useTours';
import { ContextType } from '@/lib/utils/context.utils';
import { ActionButtons } from '@/components/admin/ActionButtons';
import {
  Edit2Icon,
  LayoutListIcon,
  ListIcon,
  ReceiptTextIcon,
  Trash2Icon,
  ViewIcon,
} from 'lucide-react';
import TourTable from '@/components/admin/TourTable';

export default function AdminToursPage() {
  // Global filter state and actions
  const { filters, setFilters } = useGlobalFilters();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  // Fetching tours from the store and hook
  const { tours } = useTourStore();
  const { loading, fetchTours } = useFetchTours();

  // Fetch tours when component mounts if not already fetched
  useEffect(() => {
    if (tours.length === 0) {
      fetchTours();
    }
  }, [fetchTours, tours.length]);

  // Get DataTable configuration
  const dataTableConfig = useDataTableConfig(
    ContextType.tour,
    tours,
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
            <h2>Tours</h2>
          </div>

          <div className="col-12 management-container">
            {/* Action buttons (e.g., Add, Edit, Delete) */}
            <ActionButtons context={ContextType.tour} />

            <TourTable />
          </div>
        </div>
      </div>

      {/* Sidebar component */}
      <SideBar />
    </>
  );
}
