import { CircleAlertIcon } from 'lucide-react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Fragment } from 'react';

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}) {
  return (
    <Dialog
      visible={isOpen}
      style={{ width: '32rem' }}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      header={title}
      modal
      className="confirmation-dialog"
      onHide={onClose}
      footer={() => (
        <Fragment>
          <Button label="No" outlined onClick={onClose} />
          <Button label="Yes" severity="danger" onClick={onConfirm} />
        </Fragment>
      )}
    >
      <CircleAlertIcon size="32px" className="text-danger" />
      {message}
    </Dialog>
  );
}
