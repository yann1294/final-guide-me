import { PlusIcon, Trash2Icon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export function ActionButtons({
  setAddAction,
  setDeleteAction,
}: {
  setAddAction: Dispatch<SetStateAction<boolean>>;
  setDeleteAction: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="action-buttons">
      <div onClick={() => {
        console.log("New clicked");
        setAddAction(true)
      }} className="add-resource">
        <PlusIcon size="14px" /> New
      </div>
      <div onClick={() => setDeleteAction(true)} className="delete-resource">
        <Trash2Icon size="14px" /> Delete
      </div>
    </div>
  );
}
