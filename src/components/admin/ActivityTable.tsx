import { Column } from 'primereact/column';
import { Edit2Icon, Trash2Icon } from 'lucide-react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { ActivityDTO } from '@/dto/tour.dto';
import { activityColumnConfigs } from '@/lib/config/activityColumsConfig';

export default function ActivityTable({
  activities,
}: {
  activities: Map<number, ActivityDTO> | null;
}) {
  return (
    <DataTable
      value={Object.values(activities ?? {})}
      paginator
      rows={5}
      dataKey="id"
      resizableColumns
      emptyMessage="No activity found."
      header={'Tour Activities'}
      loading={activities === null}
      loadingIcon={
        <div className="circular-loader-container">
          <div className="circular-loader"></div>
        </div>
      }
    >
      {activityColumnConfigs.map((template) => <Column key={template.field} {...template} /> )}
    </DataTable>
  );
}
