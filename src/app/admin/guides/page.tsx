"use client";

import SideBar from "@/components/common/SideBar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import useUserStore from "@/stores/userStore";
import { guideColumnConfigs } from "@/lib/config/guideColumnConfig";

import {
  userGlobalSearchFields,
  useUserGlobalFilters,
} from "@/lib/config/globalSearchConfig";
import { modifyElement } from "@/components/admin/FilterTemplates";

import { Dropdown } from "primereact/dropdown";
import { SelectItem } from "primereact/selectitem";
import { CopyIcon } from "lucide-react";

import { GuideDTO } from "@/dto/guide.dto";
import { useFetchGuides, useUpdateOneGuide } from "@/hooks/useUsers";

export default function AdminGuidesPage() {
  // Zustand store slice
  const { guides, guidesTotal } = useUserStore();

  // Server-side pagination/sort/search hook
  const { fetchGuides: fetchGuidesPage, loading } = useFetchGuides();

  // Update (approve/reject/pending)
  const {
    updateOneGuide,
    error: updateError,
    loading: updating,
    updateStatus,
  } = useUpdateOneGuide();

  // PrimeReact DataTable state
  const [rows, setRows] = useState(25);
  const [first, setFirst] = useState(0); // index of first row
  const [sortField, setSortField] = useState<string>();
  const [sortOrder, setSortOrder] = useState<1 | -1 | 0>(0);

  // Global filters (if you use them elsewhere)
  const { filters, setFilters } = useUserGlobalFilters();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  // local UI state for staged approval dropdowns
  const [approved, setApproved] = useState<{
    [uid: string]: {
      old: "pending" | "approved" | "rejected";
      new: "pending" | "approved" | "rejected";
    };
  }>({});

  // Loader combined
  const isBusy = loading || updating;

  // Fetch current page from server and persist to store (hook already does the persisting)
  const loadPage = useCallback(async () => {
    const page = Math.floor(first / rows) + 1;
    await fetchGuidesPage({
      page,
      limit: rows,
      sortField,
      sortOrder: sortOrder === 0 ? undefined : (sortOrder as 1 | -1),
      q: globalFilterValue || undefined,
      status: "all",
    });
  }, [first, rows, sortField, sortOrder, globalFilterValue, fetchGuidesPage]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  // DataTable handlers
  const handlePage = (e: any) => {
    setFirst(e.first);
    setRows(e.rows);
  };

  const handleSort = (e: any) => {
    setSortField(e.sortField as string);
    setSortOrder(e.sortOrder as 1 | -1 | 0);
  };

  // Columns with custom cell overrides
  const columns = useMemo(() => {
    return guideColumnConfigs.map((template) => {
      const extra: any = {};

      if (template.field === "uid") {
        extra.body = (row: any) =>
          modifyElement(
            <CopyIcon
              onClick={() => {
                navigator.clipboard.writeText(row.uid);
                alert(`UID Copied: ${row.uid}`);
              }}
              size="18px"
            />,
            "Copy UID",
          );
      }

      if (template.field === "approvalStatus") {
        extra.body = (row: any) =>
          modifyElement(
            <Dropdown
              style={{ minWidth: 110 }}
              options={
                [
                  { label: "Pending", value: "pending" },
                  { label: "Approved", value: "approved" },
                  { label: "Rejected", value: "rejected" },
                ] as SelectItem[]
              }
              value={
                approved[row.uid] === undefined
                  ? row.approvalStatus
                  : approved[row.uid].new
              }
              onChange={async (e) => {
                const newStatus = e.value as
                  | "pending"
                  | "approved"
                  | "rejected";
                setApproved((prev) => ({
                  ...prev,
                  [row.uid]: { old: row.approvalStatus, new: newStatus },
                }));

                // fire update and reload only current page
                await updateOneGuide(
                  row as GuideDTO,
                  {
                    uid: row.uid,
                    approvalStatus: newStatus,
                  } as GuideDTO,
                );

                await loadPage();
              }}
            />,
          );
      }

      return <Column key={String(template.field)} {...template} {...extra} />;
    });
  }, [approved, loadPage, updateOneGuide]);

  return (
    <>
      <div className="container mt-40">
        <div className="row">
          {/* Flash success */}
          {!updateError && updateStatus !== "initial" && (
            <div
              className="alert alert-success alert-dismissible fade show mt-20"
              role="alert"
            >
              {updateStatus}
              <button type="button" className="btn-close" aria-label="Close" />
            </div>
          )}

          <div className="page-header col-12">
            <h2>Guides</h2>
          </div>

          {isBusy && (
            <div className="circular-loader-container">
              <div className="circular-loader"></div>
            </div>
          )}

          <div className="col-12 management-container">
            <DataTable
              value={guides}
              dataKey="uid"
              // --- server-side (lazy) pagination/sort/search ---
              lazy
              paginator
              rows={rows}
              first={first}
              totalRecords={guidesTotal}
              onPage={handlePage}
              onSort={handleSort}
              sortField={sortField}
              sortOrder={sortOrder}
              rowsPerPageOptions={[10, 25, 50, 100]}
              loading={isBusy}
              // global search (if you wire an input to setGlobalFilterValue)
              globalFilterFields={[...userGlobalSearchFields, "approvalStatus"]}
              // keep your existing filter object if you rely on it elsewhere
              filters={filters as any}
              // ------------------------------------------------
              editMode="cell"
              onRowEditChange={(e) => console.log(e)}
            >
              {columns}
            </DataTable>
          </div>
        </div>
      </div>

      <SideBar />
    </>
  );
}
