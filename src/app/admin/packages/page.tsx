"use client";
import SideBar from "@/components/common/SideBar";
import { DataTable, DataTableExpandedRows } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  resourceGlobalFilterFields,
  useResourceGlobalFilters,
} from "@/lib/config/globalSearchConfig";
import { modifyElement } from "@/components/admin/FilterTemplates";
import { ActionButtons } from "@/components/admin/ActionButtons";
import usePackageStore from "@/stores/packageStore";
import { ContextType } from "@/lib/utils/contextUtils";
import { useEffect, useState } from "react";
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
} from "lucide-react";
import TourTable from "@/components/admin/TourTable";
import { useDataTableConfig } from "@/lib/config/dataTableConfig";
import { packageColumnConfigs } from "@/lib/config/packageColumnConfig";
import {
  useDeleteOnePackage,
  useFetchPackages,
} from "@/hooks/packages/usePackages";
import { PackageDTO } from "@/dto/package.dto";
import Link from "next/link";
import ConfirmationDialog from "@/components/admin/ConfirmationDialog";
import PackageTable from "@/components/admin/PackageTable";

export default function AdminPackagesPage() {
  // State and hooks initialization
  const { filters, setFilters } = useResourceGlobalFilters(); // Global filter state and setter
  const [globalFilterValue, setGlobalFilterValue] = useState<string>(""); // Local state for global filter value
  const { packages, setCurrentPackage } = usePackageStore(); // Packages from the store
  const { loading, fetchPackages } = useFetchPackages(); // Loading state and fetch function for packages
  const [expandedRows, setExpandedRows] = useState<any | DataTableExpandedRows>(
    null,
  );
  const [deleteTourObj, setDeleteTourObj] = useState<PackageDTO | null>(null);
  const { deleteOnePackage } = useDeleteOnePackage();
  const packageRows: PackageDTO[] = packages;
  // Fetch packages on mount if not already fetched
  useEffect(() => {
    if (packages.length === 0) {
      fetchPackages();
    }
  }, [fetchPackages, packages.length]);

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
            <ActionButtons actions={["create"]} context={ContextType.package} />

            {/* Data table */}
            <DataTable
              value={packageRows}
              dataKey="id"
              expandedRows={expandedRows}
              onRowToggle={(e) => setExpandedRows(e.data)}
              rowExpansionTemplate={(row: PackageDTO) => (
                <div className="expansion-container container-fluid">
                  <PackageTable packageId={row.id as string} />
                </div>
              )}
              {...dataTableConfig}
            >
              <Column
                expander={(row: PackageDTO) =>
                  Array.isArray(row.tours) && row.tours.length > 0
                }
                style={{ width: "5rem" }}
              />

              {packageColumnConfigs.map((template) => {
                const additional: any = {};

                if (template.field === "id") {
                  additional.body = (data: PackageDTO) =>
                    modifyElement(
                      <CopyIcon
                        onClick={() =>
                          navigator.clipboard.writeText(data.id as string)
                        }
                        size="18px"
                      />,
                      "Copy package ID",
                    );
                }

                if (template.field === "actions") {
                  additional.body = (data: PackageDTO) => (
                    <div className="row-action-btns">
                      <div className="row-edit">
                        <Link href={`/admin/packages/${data.id}`}>
                          <Edit2Icon
                            onClick={() => setCurrentPackage(data)}
                            size="18px"
                          />
                        </Link>
                      </div>
                      <div className="row-view">
                        <Link target="_blank" href={`/packages/${data.id}`}>
                          <ExternalLinkIcon size="18px" />
                        </Link>
                      </div>
                      <div className="row-delete">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setDeleteTourObj(data);
                          }}
                        >
                          <Trash2Icon size="18px" />
                        </a>
                      </div>
                    </div>
                  );
                }

                return (
                  <Column key={template.field} {...template} {...additional} />
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
