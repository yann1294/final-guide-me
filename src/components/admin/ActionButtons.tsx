import { CONTEXT, ContextType } from '@/lib/utils/contextUtils';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export function ActionButtons({
  context,
  actions,
}: {
  context: CONTEXT;
  actions: ('create' | 'delete')[];
}) {
  return (
    <div className="action-buttons">
      {actions.includes('create') && (
        <div
          onClick={() => {
            window.location.assign(`${context.context}/new`);
          }}
          className="add-resource"
        >
          <PlusIcon size="14px" /> New{' '}
          {context === ContextType.tour ? 'Tour' : 'Package'}
        </div>
      )}
      {actions.includes('delete') && (
        <div className="delete-resource">
          <Trash2Icon size="14px" /> Delete{' '}
          {context === ContextType.tour ? 'Tour' : 'Package'}
        </div>
      )}
    </div>
  );
}
