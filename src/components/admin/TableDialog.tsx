import { ActivityDTO, TourDTO } from '@/dto/tour.dto';
import { CONTEXT, ContextType } from '@/lib/utils/context.utils';
import { Edit2Icon, LayoutListIcon, ListIcon, ReceiptTextIcon, Trash2Icon, ViewIcon } from 'lucide-react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { ActivityColumnConfigs, modifyElement, TourColumnTemplates } from './FilterTemplates';
import usePackageStore from '@/stores/packageStore';
import { useFetchPackageTours } from '@/hooks/usePackages';
import { PackageDTO } from '@/dto/package.dto';

export default function TableDialog({
  context,
  activityDialogData,
  setActivityDialogData,
  setPackageTourDialogData,
  packageTourDialogData,
  setTourDescription,
  setResource,
  setEditResource,
  setDeleteResource,
  setImages,
}: {
  setTourDescription?: Dispatch<SetStateAction<string | null>>;
  setResource?: Dispatch<SetStateAction<any>>;
  setEditResource?: Dispatch<SetStateAction<boolean>>;
  setDeleteResource?: Dispatch<SetStateAction<boolean>>;
  setImages?: Dispatch<SetStateAction<string[] | null>>;
  context: CONTEXT;
  activityDialogData?: Map<string, ActivityDTO> | null;
  packageTourDialogData?: PackageDTO | null;
  setActivityDialogData: Dispatch<
    SetStateAction<Map<string, ActivityDTO> | null>
  >;
  setPackageTourDialogData?: Dispatch<SetStateAction<PackageDTO | null>>;
}) {
  const { tours } = usePackageStore();
  const { loading, fetchPackageTours } = useFetchPackageTours();

  useEffect(() => {
    // check whether package tours already exist
    if (packageTourDialogData && !tours.has(packageTourDialogData.id ?? '')) {
      fetchPackageTours(packageTourDialogData.id ?? '');
    }
  });
  return (
    <Dialog
      visible={
        context === ContextType.tour
          ? activityDialogData !== null
          : packageTourDialogData !== null
      }
      style={{ width: '32rem' }}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      header={context === ContextType.tour ? "Tour Activities" : "Package Tours"}
      className={'table-dialog'}
      modal
      resizable
      onHide={() => {
        if (context === ContextType.tour && setActivityDialogData) {
          setActivityDialogData(null);
        }

        if (context === ContextType.package && setPackageTourDialogData) {
          setPackageTourDialogData(null);
        }
      }}
    >
      <DataTable
          value={
            context === ContextType.tour
              ? Object.values(activityDialogData ?? {})
              : (tours.get(packageTourDialogData?.id ?? '') ?? []) as TourDTO[]
          }
          paginator
          rows={5}
          dataKey="id"
          loading={loading}
          resizableColumns
          emptyMessage="No activity found."
          header= {context === ContextType.tour ? "Manage Tour Activities" : "Manage Package Tours"}
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
          {(context === ContextType.tour
            ? ActivityColumnConfigs
            : TourColumnTemplates
          ).map((template) => {
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
            if (setActivityDialogData && template.field === 'activities') {
              additionalConfig['body'] = (data: any) =>
                modifyElement(
                  <LayoutListIcon
                    onClick={() => {
                      setActivityDialogData(
                        data.activities as Map<string, ActivityDTO>,
                      );
                    }}
                    size="18px"
                  />,
                  'View Tour Activities',
                );
            }
            
            if (setTourDescription && template.field === 'description') {
              additionalConfig['body'] = (data: any) =>
                modifyElement(
                  <ReceiptTextIcon
                    onClick={() => {
                      setTourDescription(data.description);
                    }}
                    size="18px"
                  />,
                  'View Tour Description',
                );
            }
    
            if (setImages && template.field === 'images') {
              additionalConfig['body'] = (data: any) =>
                modifyElement(
                  <ViewIcon
                    onClick={() => {
                      setImages(data.images);
                    }}
                    size="18px"
                  />,
                  'View Tour Images',
                );
            }
    
            if (setPackageTourDialogData && template.field === 'tours') {
              additionalConfig['body'] = (data: any) =>
                modifyElement(
                  <ListIcon
                    onClick={() => {
                      
                      setPackageTourDialogData(data);
                    }}
                    size="18px"
                  />,
                  'View Package Tours',
                );
            }
    
            if (setDeleteResource && setEditResource && setResource && template.field === 'actions') {
              additionalConfig['body'] = (data: any) => (
                <div className="row-action-btns">
                  <div className="row-edit">
                    <Edit2Icon
                      onClick={() => {
                        setResource(data);
                        setEditResource(true);
                      }}
                      size={'18px'}
                    />
                  </div>
                  <div className="row-delete">
                    <Trash2Icon
                      onClick={() => {
                        setResource(data);
                        setDeleteResource(true);
                      }}
                      size={'18px'}
                    />
                  </div>
                </div>
              );
            }
            
            return (
              <Column
                key={template.field}
                {...template}
                {...additionalConfig}
              />
            );
          })}
        </DataTable>
    </Dialog>
  );
}
