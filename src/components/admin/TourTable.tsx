'use client';

import SideBar from '@/components/common/SideBar';
import useTourStore from '@/stores/tourStore';
import { DataTable, DataTableExpandedRows } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { Column } from 'primereact/column';
import {
  resourceGlobalFilterFields,
  useResourceGlobalFilters,
} from '@/lib/config/globalSearchConfig';
import { modifyElement } from '@/components/admin/FilterTemplates';
import { useDeleteOneTour, useFetchTours } from '@/hooks/tours/useTours';
import { CONTEXT, ContextType } from '@/lib/utils/contextUtils';
import { ActionButtons } from '@/components/admin/ActionButtons';
import {
  Edit2Icon,
  ExternalLinkIcon,
  EyeIcon,
  LayoutListIcon,
  ListIcon,
  ReceiptTextIcon,
  Trash2Icon,
  ViewIcon,
} from 'lucide-react';
import ActivityTable from './ActivityTable';
import { ActivityDTO, TourDTO } from '@/dto/tour.dto';
import { useDataTableConfig } from '@/lib/config/dataTableConfig';
import { tourColumnTemplates } from '@/lib/config/tourColumnConfig';
import Link from 'next/link';
import ConfirmationDialog from './ConfirmationDialog';

export default function TourTable({
  context = ContextType.tour,
}: {
  context?: CONTEXT;
}) {
  // Global filter state and actions
  const { filters, setFilters } = useResourceGlobalFilters();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const [deleteTourObj, setDeleteTourObj] = useState<TourDTO | null>(null);

  // Fetching tours from the store and hook
  const { tours, setCurrentTour } = useTourStore();
  const { loading, fetchTours } = useFetchTours();
  const { deleteOneTour } = useDeleteOneTour();
  const [expandedRows, setExpandedRows] = useState<any | DataTableExpandedRows>(
    null,
  );

  // Handling user actions

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
    resourceGlobalFilterFields,
  );

  return (
    <>
    <DataTable
      expandedRows={expandedRows}
      onRowToggle={(e) => setExpandedRows(e.data)}
      rowExpansionTemplate={(data: TourDTO) => (
        <div className="expansion-container container-fluid">
          <ActivityTable activities={data.activities} />
        </div>
      )}
      {...dataTableConfig}
    >
      <Column
        expander={(data) => Object.keys(data.activities).length > 0}
        style={{ width: '5rem' }}
      />

      {/* Render columns based on templates */}
      {tourColumnTemplates.map((template) => {
        // Initialize column-specific configurations
        let additionalConfig: any = {};

        // Configure column bodies based on field names
        switch (template.field) {
          case 'actions':
            additionalConfig['body'] = (data: any) => (
              <div className="row-action-btns">
                <div className="row-edit">
                  <Link href={'/admin/tours/' + data.id}>
                    <Edit2Icon
                      onClick={() => setCurrentTour(data as TourDTO)}
                      size="18px"
                    />
                  </Link>
                </div>
                <div className="row-view">
                  <Link target='_blank' href={'/tours/' + data.id}>
                    <ExternalLinkIcon
                      onClick={() => setCurrentTour(data as TourDTO)}
                      size="18px"
                    />
                  </Link>
                </div>
                <div className="row-delete">
                  <Link href={'#'}>
                    <Trash2Icon
                      onClick={() => setDeleteTourObj(data as TourDTO)}
                      size="18px"
                    />
                  </Link>
                </div>
              </div>
            );
            break;
          default:
            break;
        }

        // Return the configured column
        return (
          <Column key={template.field} {...template} {...additionalConfig} />
        );
      })}
    </DataTable>
    <ConfirmationDialog
    isOpen={deleteTourObj !== null}
    onClose={() => setDeleteTourObj(null)}
    onConfirm={() => {
      deleteOneTour(deleteTourObj as TourDTO);
      setDeleteTourObj(null);
    }}
    title="Delete"
    message={`Do you want to delete ${deleteTourObj?.name}?`}
  />
    </>
  );
}
