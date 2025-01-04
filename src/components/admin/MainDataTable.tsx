import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import FilterHeader from './FilterHeader';
import { PackageColumnConfigs, TourColumnTemplates, modifyElement } from './FilterTemplates';
import {
  Edit2Icon,
  LayoutListIcon,
  ListIcon,
  ReceiptTextIcon,
  Trash2Icon,
  ViewIcon,
} from 'lucide-react';
import { ActivityDTO, TourDTO } from '@/dto/tour.dto';
import { Dispatch, SetStateAction } from 'react';
import { globalFilterFields } from '@/lib/config/data-table.configs';
import { Button } from 'primereact/button';
import { CONTEXT, ContextType } from '@/lib/utils/context.utils';
import usePackageStore from '@/stores/packageStore';
import { useFetchPackageTours } from '@/hooks/usePackages';
import { PackageDTO } from '@/dto/package.dto';

export default function MainDataTable({
  context,
  resources,
  loading,
  filters,
  setFilters,
  globalFilterValue,
  setGlobalFilterValue,
  selectedResources,
  setSelectedResources,
  setActivityDialogData,
  setDescription: setTourDescription,
  setImages,
  setResource,
  setEditResource,
  setDeleteResource,
  setPackageTourDialogData
}: {
  context: CONTEXT;
  resources: any[];
  loading: boolean;
  filters: any;
  setFilters: Dispatch<SetStateAction<any>>;
  globalFilterValue: any;
  setGlobalFilterValue: Dispatch<SetStateAction<any>>;
  selectedResources: any;
  setSelectedResources: Dispatch<SetStateAction<any>>;
  setPackageTourDialogData?: Dispatch<SetStateAction<PackageDTO | null>>;
  setActivityDialogData?:Dispatch<SetStateAction<Map<
      string,
      ActivityDTO
    > | null>>;
  setDescription: Dispatch<SetStateAction<string | null>>;
  setImages: Dispatch<SetStateAction<string[] | null>>;
  setResource: Dispatch<SetStateAction<any>>;
  setEditResource: Dispatch<SetStateAction<boolean>>;
  setDeleteResource: Dispatch<SetStateAction<boolean>>;
}) {
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  const getTableRange = (length: number): number[] => {
    const numberOfDivisions = Math.ceil(length / 10);
    return Array.from({ length: numberOfDivisions }, (_, i) => (i + 1) * 10);
  };
  return (
    <DataTable
      virtualScrollerOptions={{ itemSize: resources.length }}
      value={resources}
      paginator
      rows={10}
      dataKey="id"
      filters={filters}
      globalFilterFields={globalFilterFields}
      filterDisplay={'menu'}
      header={
        <FilterHeader
          context={context}
          globalFilterValue={globalFilterValue}
          filters={filters}
          setFilters={setFilters}
          setGlobalFilterValue={setGlobalFilterValue}
        />
      }
      emptyMessage={context === ContextType.tour ? "No tours found." : "No packages found."}
      resizableColumns
      onFilter={(e) => setFilters(e.filters)}
      sortMode={'multiple'}
      selectionMode={'multiple'}
      selection={selectedResources}
      onSelectionChange={(e) => setSelectedResources(e.value)}
      removableSort
      rowsPerPageOptions={getTableRange(resources.length)}
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

      {(context === ContextType.tour ? TourColumnTemplates : PackageColumnConfigs ).map((template) => {
        let additionalConfig: any = {};

        if (setActivityDialogData && template.field === 'activities') {
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
                  setImages(data.images);
                }}
                size="18px"
              />,
              'View Tour Images',
            );
        }

        if (setPackageTourDialogData && template.field === 'tours') {
          additionalConfig['body'] = (data: any) =>
            modifyElement(
              <ListIcon
                onClick={() => {
                  
                  setPackageTourDialogData(data);
                }}
                size="18px"
              />,
              'View Package Tours',
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
          <Column key={template.field} {...template} {...additionalConfig} />
        );
      })}
    </DataTable>
  );
}
