import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import FilterHeader from "./FilterHeader";
import { FilterTemplates, modifyElement } from "./FilterTemplates";
import { Edit2Icon, LayoutListIcon, ReceiptTextIcon, Trash2Icon, ViewIcon } from "lucide-react";
import { ActivityDTO } from "@/dto/tour.dto";
import { Dispatch, SetStateAction } from "react";
import { globalFilterFields } from "@/lib/config/data-table.configs";
import { Button } from "primereact/button";

export default function MainDataTable({ tours, loading, filters, setFilters, globalFilterValue, setGlobalFilterValue, selectedResources, setSelectedResources, setActivityDialogData, setTourDescription, setTourImages, setResource, setEditResource, setDeleteResource }: { tours: any[]; loading: boolean; filters: any; setFilters: Dispatch<SetStateAction<any>>; globalFilterValue: any; setGlobalFilterValue: Dispatch<SetStateAction<any>>; selectedResources: any; setSelectedResources: Dispatch<SetStateAction<any>>; setActivityDialogData: any; setTourDescription: Dispatch<SetStateAction<string | null>>; setTourImages: Dispatch<SetStateAction<string[] | null>>; setResource: Dispatch<SetStateAction<any>>; setEditResource: Dispatch<SetStateAction<boolean>>; setDeleteResource: Dispatch<SetStateAction<boolean>>; }) {
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  
    const getTableRange = (length: number): number[] => {
      const numberOfDivisions = Math.ceil(length / 10);
      return Array.from({ length: numberOfDivisions }, (_, i) => (i + 1) * 10);
    };
    return (
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
              selection={selectedResources}
              onSelectionChange={(e) => setSelectedResources(e.value)}
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
                    modifyElement(
                      <ReceiptTextIcon
                        onClick={() => {
                          setTourDescription(data.description);
                        }}
                        size="18px"
                      />,
                      'View Tour Description',
                    );
                }

                if (template.field === 'images') {
                  additionalConfig['body'] = (data: any) =>
                    modifyElement(
                      <ViewIcon
                        onClick={() => {
                          setTourImages(data.images);
                        }}
                        size="18px"
                      />,
                      'View Tour Images',
                    );
                }

                if (template.field === 'actions') {
                  additionalConfig['body'] = (data: any) => (
                    <div className="row-action-btns">
                      <div className="row-edit">
                        <Edit2Icon
                          onClick={() => {
                            setResource(data);
                            setEditResource(true);
                          }}
                          size={'18px'}
                        />
                      </div>
                      <div className="row-delete">
                        <Trash2Icon
                          onClick={() => {
                            setResource(data);
                            setDeleteResource(true);
                          }}
                          size={'18px'}
                        />
                      </div>
                    </div>
                  );
                }
                return (
                  <Column
                    key={template.field}
                    {...template}
                    {...additionalConfig}
                  />
                );
              })}
            </DataTable>
  );
}