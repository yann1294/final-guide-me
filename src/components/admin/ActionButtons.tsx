import { CONTEXT, ContextType } from '@/lib/utils/contextUtils';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export function ActionButtons({
  context,
}: {
  context: CONTEXT,
}) {
  return (
    <div className="action-buttons">
      <div onClick={() => {
        console.log("New clicked");
        // setAddAction(true)
      }} className="add-resource">
        <PlusIcon size="14px" /> New {context === ContextType.tour ? "Tour" : "Package"}
      </div>
      <div className="delete-resource">
        <Trash2Icon size="14px" /> Delete {context === ContextType.tour ? "Tour" : "Package"}
      </div>
    </div>
  );
}
