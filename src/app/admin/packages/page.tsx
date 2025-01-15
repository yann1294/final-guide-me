'use client';
import SideBar from '@/components/common/SideBar';
import { DataTable, DataTableExpandedRows } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {
  resourceGlobalFilterFields,
  useResourceGlobalFilters,
} from '@/lib/config/globalSearchConfig';
import {
  modifyElement,
} from '@/components/admin/FilterTemplates';
import { ActionButtons } from '@/components/admin/ActionButtons';
import usePackageStore from '@/stores/packageStore';
import { useFetchPackages } from '@/hooks/usePackages';
import { ContextType } from '@/lib/utils/contextUtils';
import { useEffect, useState } from 'react';
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
import { useDataTableConfig } from '@/lib/config/dataTableConfig';
import { packageColumnConfigs } from '@/lib/config/packageColumnConfig';

export default function AdminPackagesPage() {
  // State and hooks initialization
  const { filters, setFilters } = useResourceGlobalFilters(); // Global filter state and setter
  const [globalFilterValue, setGlobalFilterValue] = useState<string>(''); // Local state for global filter value
  const { packages } = usePackageStore(); // Packages from the store
  const { loading, fetchPackages } = useFetchPackages(); // Loading state and fetch function for packages
  const [ expandedRows, setExpandedRows ] = useState<any | DataTableExpandedRows>(null);
  // Fetch packages on mount if not already fetched
  useEffect(() => {
    if (packages.length === 0) {
      fetchPackages();
    }
  }, [fetchPackages]);

  // Get DataTable configuration
  const dataTableConfig = useDataTableConfig(
    ContextType.package,
    packages,
    filters,
    setFilters,
    globalFilterValue,
    setGlobalFilterValue,
    loading,
    resourceGlobalFilterFields,
  );

  return (
    <>
      <div className="container mt-40">
        <div className="row">
          <div className="page-header col-12">
            <h2>Packages</h2>
          </div>

          <div className="col-12 management-container">
            {/* Action buttons */}
            <ActionButtons actions={['create']} context={ContextType.package} />

            {/* Data table */}
            <DataTable
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            rowExpansionTemplate={(data) => <div className='expansion-container container-fluid'><TourTable /></div>}
            {...dataTableConfig}>
              {/* For row expansion */}
              <Column expander={(data) => data.tours.length > 0} style={{ width: '5rem' }} />

              {/* Map over column configurations and display columns */}
              {packageColumnConfigs.map((template) => {
                let additionalConfig: any = {};

                // Define custom column bodies based on field type
                if (template.field === 'id') {
                  additionalConfig['body'] = (data: any) =>
                    modifyElement(
                      <CopyIcon
                        onClick={() => navigator.clipboard.writeText(data.id)}
                        size="18px"
                      />,
                      'Copy package ID',
                    );
                }
                if (template.field === 'activities') {
                  additionalConfig['body'] = (data: any) =>
                    modifyElement(
                      <LayoutListIcon onClick={() => {}} size="18px" />,
                      'View Tour Activities',
                    );
                }
                if (template.field === 'description') {
                  additionalConfig['body'] = (data: any) =>
                    modifyElement(
                      <ReceiptTextIcon onClick={() => {}} size="18px" />,
                      'View Tour Description',
                    );
                }
                if (template.field === 'images') {
                  additionalConfig['body'] = (data: any) =>
                    modifyElement(
                      <ViewIcon onClick={() => {}} size="18px" />,
                      'View Tour Images',
                    );
                }
                if (template.field === 'actions') {
                  additionalConfig['body'] = (data: any) => (
                    <div className="row-action-btns">
                      <div className="row-edit">
                        <Edit2Icon onClick={() => {}} size="18px" />
                      </div>
                      <div className="row-delete">
                        <Trash2Icon onClick={() => {}} size="18px" />
                      </div>
                    </div>
                  );
                }

                // Return the column with additional configurations
                return (
                  <Column
                    key={template.field}
                    {...template}
                    {...additionalConfig}
                  />
                );
              })}
            </DataTable>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <SideBar />
    </>
  );
}
