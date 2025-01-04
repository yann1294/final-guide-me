import { ActivityDTO } from '@/dto/tour.dto';
import { timestampToDate } from '@/lib/utils/utils';
import { Edit2Icon, Trash2Icon } from 'lucide-react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dispatch, SetStateAction } from 'react';

export default function TableDialog({
  activityDialogData,
  setActivityDialogData,
}: {
  activityDialogData: Map<string, ActivityDTO> | null;
  setActivityDialogData: Dispatch<
    SetStateAction<Map<string, ActivityDTO> | null>
  >;
}) {
  return (
    <Dialog
      visible={activityDialogData !== null}
      style={{ width: '32rem' }}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      header="Tour Activities"
      className={"table-dialog"}
      modal
      resizable
      onHide={() => setActivityDialogData(null)}
    >
      <DataTable
        value={Object.values(activityDialogData ?? {})}
        paginator
        rows={5}
        dataKey="id"
        resizableColumns
        emptyMessage="No activity found."
        header="Manage Tour Activities"
        footer={() => (
          <div className="field col-md-12">
            <Button
              label="Add Activity"
              className="mt-3 save-resource"
              onClick={() => console.log('Add activity clicked')}
            />
          </div>
        )}
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
          style={{ maxWidth: '200px' }}
          body={(data) => timestampToDate(data.transportation.arrivalTime)}
          header="Arrival Time"
          sortable
        />
        <Column
          style={{ maxWidth: '200px' }}
          body={(data) => timestampToDate(data.transportation.departureTime)}
          header="Departure Time"
          sortable
        />
        <Column
          field="accommodation.type"
          header="Accommodation Type"
          sortable
        />
        <Column
          field="accommodation.name"
          header="Accommodation Name"
          sortable
        />
        <Column
        header="Actions"
          body={(options) => {
            return (
              <div className="row-action-btns">
                <div className="row-edit">
                  <Edit2Icon size={'18px'} />
                </div>
                <div className="row-delete">
                  <Trash2Icon size={'18px'} />
                </div>
              </div>
            );
          }}
          exportable={false}
        ></Column>
      </DataTable>
    </Dialog>
  );
}
