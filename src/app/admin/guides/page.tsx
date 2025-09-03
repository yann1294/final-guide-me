"use client";

import SideBar from "@/components/common/SideBar";
import useTourStore from "@/stores/tourStore";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import {
  userGlobalSearchFields,
  useUserGlobalFilters,
} from "@/lib/config/globalSearchConfig";
import { modifyElement } from "@/components/admin/FilterTemplates";
import { useFetchTours } from "@/hooks/tours/useTours";
import { ContextType } from "@/lib/utils/contextUtils";
import { ActionButtons } from "@/components/admin/ActionButtons";
import {
  CopyIcon,
  Edit2Icon,
  LayoutListIcon,
  ListIcon,
  ReceiptTextIcon,
  Trash2Icon,
  ViewIcon,
} from "lucide-react";
import TourTable from "@/components/admin/TourTable";
import useUserStore from "@/stores/userStore";
import {
  useFetchGuides,
  useFetchTourists,
  useUpdateOneGuide,
} from "@/hooks/useUsers";
import { guideColumnConfigs } from "@/lib/config/guideColumnConfig";
import { useDataTableConfig } from "@/lib/config/dataTableConfig";
import { Checkbox } from "primereact/checkbox";
import { GuideDTO } from "@/dto/guide.dto";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { Dropdown } from "primereact/dropdown";
import { SelectItem } from "primereact/selectitem";

export default function AdminGuidesPage() {
  // Global filter state and actions
  const { filters, setFilters } = useUserGlobalFilters();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  // update hook
  const {
    updateOneGuide,
    error: updateError,
    loading: updating,
    updateStatus,
  } = useUpdateOneGuide();

  // guide approve status
  const [approved, setApproved] = useState<{
    [uid: string]: {
      old: "pending" | "approved" | "rejected";
      new: "pending" | "approved" | "rejected";
    };
  }>({});

  // Fetching tours from the store and hook
  const { guides } = useUserStore();
  const { loading, fetchGuides } = useFetchGuides();

  // Fetch tours when component mounts if not already fetched
  useEffect(() => {
    fetchGuides();
    // nice-to-have: refresh when window regains focus
    //const onFocus = () => fetchGuides();
    //window.addEventListener("focus", onFocus);
    //return () => window.removeEventListener("focus", onFocus);
  }, []);

  // Get DataTable configuration
  const dataTableConfig = useDataTableConfig(
    ContextType.guides,
    guides,
    filters,
    setFilters,
    globalFilterValue,
    setGlobalFilterValue,
    loading,
    userGlobalSearchFields,
  );

  return (
    <>
      <div className="container mt-40">
        <div className="row">
          {/* Display success alert */}
          {!updateError && updateStatus !== "initial" && (
            <div
              className="alert alert-success alert-dismissible fade show mt-20"
              role="alert"
            >
              {updateStatus}
              {/* <strong>{uTm.tour.name}!</strong>. */}
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
          )}
          <div className="page-header col-12">
            <h2>Guides</h2>
          </div>

          {(loading || updating) && (
            <div className="circular-loader-container">
              <div className="circular-loader"></div>
            </div>
          )}
          <div className="col-12 management-container">
            <DataTable
              value={guides} // ✅ give DataTable fresh rows explicitly
              dataKey="uid" // ✅ helps PrimeReact diff row
              {...dataTableConfig}
              editMode={"cell"}
              onRowEditChange={(e) => console.log(e)}
              globalFilterFields={[...userGlobalSearchFields, "approvalStatus"]}
            >
              {/* Render columns based on templates */}
              {guideColumnConfigs.map((template) => {
                // Initialize column-specific configurations
                let additionalConfig: any = {};

                // Modify the element based on the template
                // Define custom column bodies based on field type
                if (template.field === "uid") {
                  additionalConfig["body"] = (data: any) =>
                    modifyElement(
                      <CopyIcon
                        onClick={() => {
                          navigator.clipboard.writeText(data.uid);
                          // display alert with copied uid
                          alert(`UID Copied: ${data.uid}`);
                        }}
                        size="18px"
                      />,
                      "Copy UID",
                    );
                }

                // edit button for account status
                if (template.field === "approvalStatus") {
                  additionalConfig["body"] = (data: any) => {
                    return modifyElement(
                      //   <TriStateCheckbox
                      //     value={}
                      //     onChange={(e) => {
                      //       setApproved({
                      //         ...approved,
                      //         [data.uid]: { old: data.accountStatus, new: e.checked ? 'active' : 'inactive' },
                      //       });
                      //       updateOneGuide(data as GuideDTO, { uid: data.uid, accountStatus: e.checked ? 'active' : 'inactive' } as GuideDTO);
                      //     }}
                      //     checked={approved[data.uid] === undefined ? data.accountStatus === 'active' : approved[data.uid].new === 'active'}
                      //   />,
                      //   data.accountStatus === 'active'
                      //     ? 'Disapprove guide'
                      //     : 'Approve guide',
                      // );
                      <Dropdown
                        style={{ minWidth: "110px" }}
                        options={
                          [
                            { label: "Pending", value: "pending" },
                            { label: "Approved", value: "approved" },
                            { label: "Rejected", value: "rejected" },
                          ] as SelectItem[]
                        }
                        onChange={(e) => {
                          const newStatus = e.value;
                          setApproved({
                            ...approved,
                            [data.uid]: {
                              old: data.approvalStatus,
                              new: newStatus,
                            },
                          });
                          const updatedGuide = updateOneGuide(
                            data as GuideDTO,
                            {
                              uid: data.uid,
                              approvalStatus: newStatus,
                            } as GuideDTO,
                          );
                          fetchGuides();
                        }}
                        value={
                          approved[data.uid] === undefined
                            ? data.approvalStatus
                            : approved[data.uid].new
                        }
                      />,
                    );
                  };
                }

                // Return the configured column
                return (
                  <Column
                    key={template.field}
                    {...template}
                    {...additionalConfig}
                  />
                );
              })}
            </DataTable>{" "}
          </div>
        </div>
      </div>

      {/* Sidebar component */}
      <SideBar />
    </>
  );
}
