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
import { ContextType } from '@/lib/utils/contextUtils';
import { useEffect, useState } from 'react';
import {
  CopyIcon,
  Edit2Icon,
  ExternalLinkIcon,
  EyeIcon,
  LayoutListIcon,
  ListIcon,
  ReceiptTextIcon,
  Trash2Icon,
  ViewIcon,
} from 'lucide-react';
import TourTable from '@/components/admin/TourTable';
import { useDataTableConfig } from '@/lib/config/dataTableConfig';
import { packageColumnConfigs } from '@/lib/config/packageColumnConfig';
import { useDeleteOnePackage, useFetchPackages } from '@/hooks/packages/usePackages';
import { PackageDTO } from '@/dto/package.dto';
import Link from 'next/link';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';

export default function AdminPackagesPage() {
  // State and hooks initialization
  const { filters, setFilters } = useResourceGlobalFilters(); // Global filter state and setter
  const [globalFilterValue, setGlobalFilterValue] = useState<string>(''); // Local state for global filter value
  const { packages, setCurrentPackage } = usePackageStore(); // Packages from the store
  const { loading, fetchPackages } = useFetchPackages(); // Loading state and fetch function for packages
  const [ expandedRows, setExpandedRows ] = useState<any | DataTableExpandedRows>(null);
  const [deleteTourObj, setDeleteTourObj] = useState<PackageDTO | null>(null);
  const { deleteOnePackage } = useDeleteOnePackage();
  
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
                if (template.field === 'actions') {
                  additionalConfig['body'] = (data: any) => (
                      <div className="row-action-btns">
                        <div className="row-edit">
                          <Link href={'/admin/packages/' + data.id}>
                            <Edit2Icon
                              onClick={() => setCurrentPackage(data as PackageDTO)}
                              size="18px"
                            />
                          </Link>
                        </div>
                        <div className="row-view">
                          <Link target='_blank' href={'/packages/' + data.id}>
                            <ExternalLinkIcon
                              size="18px"
                            />
                          </Link>
                        </div>
                        <div className="row-delete">
                          <Link href={'#'}>
                            <Trash2Icon
                              onClick={() => setDeleteTourObj(data as PackageDTO)}
                              size="18px"
                            />
                          </Link>
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
            <ConfirmationDialog
                isOpen={deleteTourObj !== null}
                onClose={() => setDeleteTourObj(null)}
                onConfirm={() => {
                  deleteOnePackage(deleteTourObj as PackageDTO);
                  setDeleteTourObj(null);
                }}
                title="Delete"
                message={`Do you want to delete ${deleteTourObj?.name}?`}
              />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <SideBar />
    </>
  );
}
