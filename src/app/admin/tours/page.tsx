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
import {
  FilterTemplates,
  modifyElement,
} from '@/components/admin/FilterTemplates';
import FilterHeader from '@/components/admin/FilterHeader';
import { useFetchTours } from '@/hooks/useTours';
import { ActivityDTO } from '@/dto/tour.dto';
import { Dialog } from 'primereact/dialog';
import { timestampToDate } from '@/lib/utils/utils';
import { ActionButtons } from '@/components/admin/ActionButtons';
import { Image } from 'primereact/image';

export default function AdminToursPage() {
  const { filters, setFilters } = useGlobalFilters();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>();
  const { tours } = useTourStore();
  const { loading, fetchTours } = useFetchTours();
  const [selectedTours, setSelectedTours] = useState<any>(null);
  const [activityDialogData, setActivityDialogData] = useState<Map<
    string,
    ActivityDTO
  > | null>(null);
  const [tourDescription, setTourDescription] = useState<string | null>(null);
  const [tourImages, setTourImages] = useState<string[] | null>(null);

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
              loadingIcon={
                <div className="circular-loader-container">
                  <div className="circular-loader"></div>
                </div>
              }
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

              {FilterTemplates.map((template) => {
                let additionalConfig: any = {};

                if (template.field === 'activities') {
                  additionalConfig['body'] = (data: any) =>
                    modifyElement(
                      <LayoutListIcon
                        onClick={() => {
                          setActivityDialogData(
                            data.activities as Map<string, ActivityDTO>,
                          );
                        }}
                        size="18px"
                      />,
                      'View Tour Activities',
                    );
                }

                if (template.field === 'description') {
                  additionalConfig['body'] = (data: any) =>
                    modifyElement(<ReceiptTextIcon onClick={() => {
                      setTourDescription(data.description);
                    }} size="18px" />, 'View Tour Description');
                }

                if (template.field === 'images') {
                  additionalConfig['body'] = (data: any) =>
                    modifyElement(<ViewIcon onClick={() => {
                      setTourImages(data.images);
                    }} size="18px" />, 'View Tour Images');
                }
                return (
                  <Column
                    key={template.field}
                    {...template}
                    {...additionalConfig}
                  />
                );
              })}
              <Column
              body={(options) => {
                return (
                  <div className="row-action-btns">
                    <div className="row-edit">
                      <Edit2Icon size={"18px"}  />
                    </div>
                    <div className="row-delete">
                      <Trash2Icon size={"18px"}  />
                    </div>
                  </div>
                );
              }}
              exportable={false}
            ></Column>
            </DataTable>
            <Dialog
              visible={activityDialogData !== null}
              style={{ width: '32rem' }}
              breakpoints={{ '960px': '75vw', '641px': '90vw' }}
              header="Tour Activities"
              modal
              resizable
              onHide={() => setActivityDialogData(null)}
            >
              <DataTable
                value={Object.values(activityDialogData ?? {})}
                paginator
                rows={5}
                dataKey="id"
                selection={selectedTours}
                resizableColumns
                emptyMessage="No activity found."
                header={<ActionButtons />}
              >
            <Column field="id" header="ID" sortable />
            <Column field="name" header="Tour Name" sortable />
            <Column field="durationHours" header="Duration (Hours)" sortable />
            <Column field="location.name" header="Location Name" sortable />
            <Column field="location.city" header="City" sortable />
            <Column field="location.country" header="Country" sortable />
            <Column field="location.address" header="Address" sortable />
            
            <Column field="transportation.type" header="Transport Type" sortable />
            <Column
            style={{maxWidth: "200px"}}
              body={(data) => timestampToDate(data.transportation.arrivalTime)}
              header="Arrival Time"
              sortable
            />
            <Column
            style={{maxWidth: "200px"}}
              body={(data) => timestampToDate(data.transportation.departureTime)}
              header="Departure Time"
              sortable
            />
            <Column field="accommodation.type" header="Accommodation Type" sortable />
            <Column field="accommodation.name" header="Accommodation Name" sortable />
            <Column
              body={(data) => (
                <Button
                  label="Delete"
                  icon="pi pi-trash"
                  className="p-button-danger"
                  onClick={() => console.log('Delete tour', data)}
                />
              )}
              header="Actions"
            />
            <Column
              body={(options) => {
                return (
                  <div className="row-action-btns">
                    <div className="row-edit">
                      <Edit2Icon size={"18px"}  />
                    </div>
                    <div className="row-delete">
                      <Trash2Icon size={"18px"}  />
                    </div>
                  </div>
                );
              }}
              exportable={false}
            ></Column>
              </DataTable>
            </Dialog>
            <Dialog
              visible={tourDescription !== null}
              style={{ width: '32rem' }}
              breakpoints={{ '960px': '75vw', '641px': '90vw' }}
              header="Tour Description"
              modal
              resizable
              onHide={() => setTourDescription(null)}
            >
              <div className="tour-description">{tourDescription}</div>
            </Dialog>
            <Dialog
              visible={tourImages !== null}
              style={{ width: '32rem' }}
              breakpoints={{ '960px': '75vw', '641px': '90vw' }}
              header="Tour Images"
              modal
              resizable
              onHide={() => setTourImages(null)}
            >
              <div className="container">
                <ActionButtons />
                <div className="row">
                  {tourImages?.map((image) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <Image src={image} alt="Image" width="250" preview />
                    </div>
                  ))}
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
      <SideBar />
    </>
  );
}
