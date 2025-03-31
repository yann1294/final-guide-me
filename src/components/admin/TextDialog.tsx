import { Dialog } from 'primereact/dialog';
import { Dispatch, SetStateAction } from 'react';

export default function TextDialog({
  text, title,
  setText,
}: {
    title: string;
  text: string | null;
  setText: Dispatch<SetStateAction<string | null>>;
}) {
  return (
    <Dialog
      visible={text !== null}
      style={{ width: '32rem' }}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      header={title}
      modal
      resizable
      onHide={() => setText(null)}
    >
      <div className="tour-description">{text}</div>
    </Dialog>
  );
}
