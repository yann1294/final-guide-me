'use client';
import SideBar from '@/components/common/SideBar';
import useTourStore from '@/stores/tourStore';
import { DataTable } from 'primereact/datatable';
import { ChangeEvent, useEffect, useState } from 'react';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { tourTestData } from '@/lib/utils/test.data';
import {
  globalFilterFields,
  useGlobalFilters,
} from '@/lib/config/data-table.configs';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import {
  BadgeCheckIcon,
  BadgeXIcon,
  CopyIcon,
  Edit2Icon,
  ExternalLinkIcon,
  LayoutListIcon,
  PlusIcon,
  ReceiptTextIcon,
  SearchIcon,
  Trash2Icon,
  ViewIcon,
} from 'lucide-react';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { MultiSelect } from 'primereact/multiselect';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { FilterTemplates } from '@/components/admin/FilterTemplates';
import FilterHeader from '@/components/admin/FilterHeader';
import { useFetchTours } from '@/hooks/useTours';

export default function AdminToursPage() {
  const { filters, setFilters } = useGlobalFilters();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>();
  const { tours } = useTourStore();
  const { loading, fetchTours } = useFetchTours();
  const [selectedTours, setSelectedTours] = useState<any>(null);

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  const getTableRange = (length: number): number[] => {
    const numberOfDivisions = Math.ceil(length / 10);
    return Array.from({ length: numberOfDivisions }, (_, i) => (i + 1) * 10);
  };

  useEffect(() => {
    if (tours.length === 0) {
      fetchTours();
    }
  }, [fetchTours]);

  return (
    <>
      <div className="container mt-40">
        <div className="row">
          <div className="page-header col-12">
            <h2>Tours</h2>
          </div>
          <div className="col-12 management-container">
            <div className="action-buttons">
              <div className="add-resource">
                <PlusIcon size={'14px'} /> New
              </div>
              <div className="delete-resource">
                <Trash2Icon size={'14px'} /> Delete
              </div>
            </div>
            <DataTable
              virtualScrollerOptions={{ itemSize: tours.length }}
              value={tours}
              paginator
              rows={10}
              dataKey="id"
              filters={filters}
              globalFilterFields={globalFilterFields}
              filterDisplay={'menu'}
              header={
                <FilterHeader
                  globalFilterValue={globalFilterValue}
                  filters={filters}
                  setFilters={setFilters}
                  setGlobalFilterValue={setGlobalFilterValue}
                />
              }
              emptyMessage="No tours found."
              resizableColumns
              onFilter={(e) => setFilters(e.filters)}
              // showGridlines={true}
              sortMode={'multiple'}
              selectionMode={'multiple'}
              selection={selectedTours}
              onSelectionChange={(e) => setSelectedTours(e.value)}
              removableSort
              rowsPerPageOptions={getTableRange(tours.length)}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Tours"
              paginatorLeft={paginatorLeft}
              paginatorRight={paginatorRight}
              loading={loading}
            >
              <Column
                selectionMode="multiple"
                body={() => (
                  <div>
                    <div className="flex justify-center">
                      <input type="checkbox" className="p-checkbox-input" />
                    </div>
                  </div>
                )}
              ></Column>

              {FilterTemplates.map((template) => (
                <Column key={template.field} {...template} />
              ))}
            </DataTable>
          </div>
        </div>
      </div>
      <SideBar />
    </>
  );
}
