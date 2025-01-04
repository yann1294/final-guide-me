import { Trash2Icon } from "lucide-react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { Dispatch, SetStateAction } from "react";

export default function ImagesDialog({ tourImages, setTourImages, setAddResource }: { tourImages: string[] | null, setTourImages: Dispatch<SetStateAction<string[] | null>>, setAddResource: Dispatch<SetStateAction<boolean>> }) {
    return (
        <Dialog
              visible={tourImages !== null}
              style={{ width: '32rem' }}
              breakpoints={{ '960px': '75vw', '641px': '90vw' }}
              header="Tour Images"
              className='images-dialog'
              modal
              resizable
              onHide={() => setTourImages(null)}
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
                  {tourImages?.map((image) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
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