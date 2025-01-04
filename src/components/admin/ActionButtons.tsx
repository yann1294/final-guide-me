import { PlusIcon, Trash2Icon } from 'lucide-react';

export function ActionButtons() {
  return (
    <div className="action-buttons">
      <div className="add-resource">
        <PlusIcon size="14px" /> New
      </div>
      <div className="delete-resource">
        <Trash2Icon size="14px" /> Delete
      </div>
    </div>
  );
}
