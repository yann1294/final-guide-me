'use client';

import { modifyElement } from "@/components/admin/FilterTemplates";
import SideBar from "@/components/common/SideBar";
import { useFetchTourists } from "@/hooks/useUsers";
import { useDataTableConfig } from "@/lib/config/dataTableConfig";
import { userGlobalSearchFields, useUserGlobalFilters } from "@/lib/config/globalSearchConfig";
import { touristColumnConfigs } from "@/lib/config/touristColumnConfig";
import { ContextType } from "@/lib/utils/contextUtils";
import useUserStore from "@/stores/userStore";
import { CopyIcon } from "lucide-react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";

export default function AdminTouristsPage() {
  // Global filter state and actions
  const { filters, setFilters } = useUserGlobalFilters();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  // Fetching tours from the store and hook
  const { tourists } = useUserStore();
  const { loading, fetchTourists } = useFetchTourists();

  // Fetch tours when component mounts if not already fetched
  useEffect(() => {
    if (tourists.length === 0) {
      fetchTourists();
    }
  }, [fetchTourists, tourists.length]);

  // Get DataTable configuration
  const dataTableConfig = useDataTableConfig(
    ContextType.tourists,
    tourists,
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
          <div className="page-header col-12">
            <h2>Tourists</h2>
          </div>

          <div className="col-12 management-container">
            <DataTable {...dataTableConfig}
            globalFilterFields={userGlobalSearchFields}
            >
              {/* Render columns based on templates */}
              {touristColumnConfigs.map((template) => {
                // Initialize column-specific configurations
                let additionalConfig: any = {};

                // Modify the element based on the template
                // Define custom column bodies based on field type
                if (template.field === 'uid') {
                    additionalConfig['body'] = (data: any) =>
                      modifyElement(
                        <CopyIcon
                          onClick={() => {
                            navigator.clipboard.writeText(data.uid);
                            // display alert with copied uid
                            alert(`UID Copied: ${data.uid}`);
                          }}
                          size="18px"
                        />,
                        'Copy UID',
                      );
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
            </DataTable>{' '}
          </div>
        </div>
      </div>

      {/* Sidebar component */}
      <SideBar />
    </>
  );
}
