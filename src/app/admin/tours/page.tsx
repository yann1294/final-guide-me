'use client';

import { ActionButtons } from "@/components/admin/ActionButtons";
import TourTable from "@/components/admin/TourTable";
import SideBar from "@/components/common/SideBar";
import { ContextType } from "@/lib/utils/contextUtils";

export default function AdminToursPage() {
  return (
    <>
      <div className="container mt-40">
        <div className="row">
          <div className="page-header col-12">
            <h2>Tours</h2>
          </div>

          <div className="col-12 management-container">
            {/* Action buttons (e.g., Add, Edit, Delete) */}
            <ActionButtons context={ContextType.tour} actions={["create"]} />
            <TourTable />
          </div>
        </div>
      </div>

      {/* Sidebar component */}
      <SideBar />
    </>
  );
}
