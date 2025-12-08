"use client";

import { useEffect, useMemo, useState } from "react";
import { DataTable, DataTableExpandedRows } from "primereact/datatable";
import { Column } from "primereact/column";
import Link from "next/link";
import {
  resourceGlobalFilterFields,
  useResourceGlobalFilters,
} from "@/lib/config/globalSearchConfig";
import { useDataTableConfig } from "@/lib/config/dataTableConfig";
import { tourColumnTemplates } from "@/lib/config/tourColumnConfig";
import { modifyElement } from "@/components/admin/FilterTemplates";
import ConfirmationDialog from "./ConfirmationDialog";
import ActivityTable from "./ActivityTable";

import useTourStore from "@/stores/tourStore";
import usePackageStore from "@/stores/packageStore";

import { useFetchTours, useDeleteOneTour } from "@/hooks/tours/useTours";
import { useFetchPackageTours } from "@/hooks/packages/usePackages";

import { TourDTO } from "@/dto/tour.dto";
import { ContextType } from "@/lib/utils/contextUtils";
import { Edit2Icon, ExternalLinkIcon, Trash2Icon } from "lucide-react";

type Props = {
  packageId?: string; // if provided, show only tours for this package
};

export default function PackageTable({ packageId }: Props) {
  // global filters
  const { filters, setFilters } = useResourceGlobalFilters();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  // stores
  const toursGlobal = useTourStore((s) => s.tours);
  const setCurrentTour = useTourStore((s) => s.setCurrentTour);

  const toursByPackage = usePackageStore((s) => s.toursByPackage);
  const packages = usePackageStore((s) => s.packages);

  // loaders
  const { loading: loadingAll, fetchTours } = useFetchTours();
  const { fetchPackageTours, loading: loadingPkgTours } =
    useFetchPackageTours();
  const { deleteOneTour } = useDeleteOneTour();

  const [expandedRows, setExpandedRows] = useState<any | DataTableExpandedRows>(
    null,
  );
  const [deleteTourObj, setDeleteTourObj] = useState<TourDTO | null>(null);

  // decide data source
  const tableRows: TourDTO[] = useMemo(() => {
    if (packageId) {
      return toursByPackage[packageId] ?? [];
    }
    return toursGlobal;
  }, [packageId, toursByPackage, toursGlobal]);

  // fetch data depending on context
  useEffect(() => {
    if (packageId) {
      // only fetch tours for this package if we have tour IDs and haven’t already loaded them
      const pkg = packages.find((p) => p.id === packageId);
      const hasAnyIds = Array.isArray(pkg?.tours) && pkg!.tours!.length > 0;
      const alreadyLoaded = Boolean(toursByPackage[packageId]);

      if (hasAnyIds && !alreadyLoaded) {
        fetchPackageTours(packageId);
      }
    } else {
      // tours page: ensure global tours are loaded
      if (toursGlobal.length === 0) {
        fetchTours();
      }
    }
  }, [
    packageId,
    packages,
    toursByPackage,
    toursGlobal.length,
    fetchPackageTours,
    fetchTours,
  ]);

  // compute loading state
  const loading = packageId
    ? loadingPkgTours && tableRows.length === 0
    : loadingAll;

  // robust expander: works for object/map/array
  const hasActivities = (t: TourDTO) => {
    const a: any = (t as any).activities;
    if (!a) return false;
    if (Array.isArray(a)) return a.length > 0;
    if (a instanceof Map) return a.size > 0;
    if (typeof a === "object") return Object.keys(a).length > 0;
    return false;
  };

  // datatable config with the resolved rows
  const dataTableConfig = useDataTableConfig(
    ContextType.tour,
    tableRows,
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
        rowExpansionTemplate={(row: TourDTO) => (
          <div className="expansion-container container-fluid">
            <ActivityTable activities={(row as any).activities} />
          </div>
        )}
        {...dataTableConfig}
      >
        <Column
          expander={(row: TourDTO) => hasActivities(row)}
          style={{ width: "5rem" }}
        />

        {tourColumnTemplates.map((template) => {
          const extra: any = {};
          if (template.field === "actions") {
            extra.body = (row: TourDTO) => (
              <div className="row-action-btns">
                <div className="row-edit">
                  <Link href={`/admin/tours/${row.id}`}>
                    <Edit2Icon
                      onClick={() => setCurrentTour(row)}
                      size="18px"
                    />
                  </Link>
                </div>
                <div className="row-view">
                  <Link target="_blank" href={`/tours/${row.id}`}>
                    <ExternalLinkIcon
                      onClick={() => setCurrentTour(row)}
                      size="18px"
                    />
                  </Link>
                </div>
                <div className="row-delete">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setDeleteTourObj(row);
                    }}
                  >
                    <Trash2Icon size="18px" />
                  </a>
                </div>
              </div>
            );
          }
          return <Column key={template.field} {...template} {...extra} />;
        })}
      </DataTable>

      <ConfirmationDialog
        isOpen={deleteTourObj !== null}
        onClose={() => setDeleteTourObj(null)}
        onConfirm={() => {
          if (deleteTourObj) {
            deleteOneTour(deleteTourObj);
            setDeleteTourObj(null);
          }
        }}
        title="Delete"
        message={`Do you want to delete ${deleteTourObj?.name}?`}
      />
    </>
  );
}
