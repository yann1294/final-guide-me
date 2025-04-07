import { CONTEXT, ContextType } from '@/lib/utils/contextUtils';
import { Trash2Icon } from 'lucide-react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { Dispatch, SetStateAction } from 'react';

export default function ImagesDialog({
  context,
   images,
  setImages,
  setAddResource,
}: {
  context: CONTEXT;
  images: string[] | null;
  setImages: Dispatch<SetStateAction<string[] | null>>;
  setAddResource: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog
      visible={images !== null}
      style={{ width: '32rem' }}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      header={context === ContextType.tour ? "Tour Images" : "Package Images"}
      className="images-dialog"
      modal
      resizable
      onHide={() => setImages(null)}
      footer={() => (
        <div className="field col-md-12">
          <Button
            label="Add Image"
            className="mt-3 save-resource"
            onClick={() => setAddResource(true)}
          />
        </div>
      )}
    >
      <div className="container">
        <div className="row">
          {images?.map((image) => (
            <div key={image} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="image-container">
                <div className="delete-image">
                  <Trash2Icon size="18px" />
                </div>
                <Image src={image} alt="Image" width="250" preview />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
}
