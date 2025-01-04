'use client';
import SideBar from '@/components/common/SideBar';
import useTourStore from '@/stores/tourStore';
import { DataTable } from 'primereact/datatable';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
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
  Calendar1Icon,
  CircleAlertIcon,
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
  TourColumnTemplates,
  modifyElement,
} from '@/components/admin/FilterTemplates';
import FilterHeader from '@/components/admin/FilterHeader';
import { useFetchTours } from '@/hooks/useTours';
import { ActivityDTO, TourDTO } from '@/dto/tour.dto';
import { Dialog } from 'primereact/dialog';
import { convertSecondsToDate, timestampToDate } from '@/lib/utils/utils';
import { ActionButtons } from '@/components/admin/ActionButtons';
import { Image } from 'primereact/image';
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import CreateDialog from '@/components/admin/CreateDialog';
import ImagesDialog from '@/components/admin/ImagesDialog';
import TextDialog from '@/components/admin/TextDialog';
import TableDialog from '@/components/admin/TableDialog';
import MainDataTable from '@/components/admin/MainDataTable';
import usePackageStore from '@/stores/packageStore';
import { useFetchPackages } from '@/hooks/usePackages';
import { ContextType } from '@/lib/utils/context.utils';
import { PackageDTO } from '@/dto/package.dto';

export default function AdminPackagesPage() {
  const { filters, setFilters } = useGlobalFilters();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>();
  const { packages } = usePackageStore();
  const { loading, fetchPackages } = useFetchPackages();
  const [selectedPackages, setSelectedPackages] = useState<any>(null);
  const [packageTourDialogData, setPackageTourDialogData] = useState<PackageDTO | null>(null);
  const [tourDescription, setTourDescription] = useState<string | null>(null);
  const [tourImages, setImages] = useState<string[] | null>(null);
  const [addResource, setAddResource] = useState<boolean>(false);
  const [editResource, setEditResource] = useState<boolean>(false);
  const [deleteResource, setDeleteResource] = useState<boolean>(false);
  const [resourceData, setResource] = useState<TourDTO>({} as TourDTO);
  const [activityDialogData, setActivityDialogData] = useState<Map<
  string,
  ActivityDTO
> | null>(null);

  useEffect(() => {
    if (packages.length === 0) {
      fetchPackages();
    }
  }, [fetchPackages]);

  return (
    <>
      <div className="container mt-40">
        <div className="row">
          <div className="page-header col-12">
            <h2>Packages</h2>
          </div>
          <div className="col-12 management-container">
            <ActionButtons
            context={ContextType.package}
              setAddAction={setAddResource}
              setDeleteAction={setDeleteResource}
            />

            <MainDataTable
              context={ContextType.package}
              resources={packages}
              loading={loading}
              filters={filters}
              setFilters={setFilters}
              globalFilterValue={globalFilterValue}
              setGlobalFilterValue={setGlobalFilterValue}
              selectedResources={selectedPackages}
              setSelectedResources={setSelectedPackages}
              setPackageTourDialogData={setPackageTourDialogData}
              setDescription={setTourDescription}
              setImages={setImages}
              setResource={setResource}
              setEditResource={setEditResource}
              setDeleteResource={setDeleteResource}
            />
            <TableDialog
            activityDialogData={activityDialogData}
            setActivityDialogData={setActivityDialogData}
            setDeleteResource={setDeleteResource}
            setEditResource={setEditResource}
            setImages={setImages}
            setResource={setResource}
            setTourDescription={setTourDescription}
            context={ContextType.package}
              setPackageTourDialogData={setPackageTourDialogData}
              packageTourDialogData={packageTourDialogData}
              
            />
            <TextDialog
              title="Package Description"
              text={tourDescription}
              setText={setTourDescription}
            />
            <ImagesDialog
              context={ContextType.package}

              images={tourImages}
              setImages={setImages}
              setAddResource={setAddResource}
            />
            <CreateDialog
              context={ContextType.package}
              addResource={addResource}
              setAddResource={setAddResource}
            />
            <ConfirmationDialog
              isOpen={deleteResource}
              onClose={() => {
                setDeleteResource(false);
                setResource({} as TourDTO);
              }}
              onConfirm={() => console.log('Delete')}
              title="Delete Package"
              message={`Are you sure you want to delete ${resourceData.name}?`}
            />
          </div>
        </div>
      </div>
      <SideBar />
    </>
  );
}
