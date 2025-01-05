import { Column } from 'primereact/column';
import { ActivityColumnConfigs } from './FilterTemplates';
import { Edit2Icon, Trash2Icon } from 'lucide-react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { ActivityDTO } from '@/dto/tour.dto';

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
      {ActivityColumnConfigs.map((template) => {
        console.log(template.field);
        const additionalConfig: any = {};
        if (template.field === 'actions') {
          additionalConfig['body'] = (data: any) => (
            <div className="row-action-btns">
              <div className="row-edit">
                <Edit2Icon
                  onClick={() => {
                    console.log('Edit clicked');
                  }}
                  size={'18px'}
                />
              </div>
              <div className="row-delete">
                <Trash2Icon
                  onClick={() => {
                    console.log('Delete clicked');
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
