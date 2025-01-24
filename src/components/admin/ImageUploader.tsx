import { usePhotoManagement } from '@/hooks/tours/usePhotoManagement';
import { Trash2Icon } from 'lucide-react';
import { Image } from 'primereact/image';

export default function ImageUploader({
  origin = 'new',
}: {
  origin: 'new' | 'edit/view';
}) {
  const uPm = usePhotoManagement(origin);

  return (
    <>
      <div className="tour-activities-actions mt-40 action-buttons">
        <div className="create-form-section-title disable-hover">
          Tour Photos ({uPm.photos.size.toString().padStart(2, '0')})
        </div>
        <div className="flex disable-hover">
          <div className={"add-resource "+ (uPm.photos.size === 0 || uPm.loading ? "disabled-button" : "") }
          onClick={uPm.uploadImagesHandler}
          >{
            uPm.loading ? "Saving..." : "Save Photos"
          }</div>
          <div
            onClick={() => {
              var file = document.getElementById('image-file');
              file?.click();
            }}
            className={"add-resource"}
          >
            <div className="disable-hover">Add Photo</div>
          </div>
        </div>
      </div>
      {!uPm.loading && !uPm.error && uPm.status !== "initial" && (
        <div
          className="alert alert-success alert-dismissible fade show mt-20 col-12"
          role="alert"
        >
          Successfully uploaded
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
      )}
      {uPm.loading && (
        <div className="circular-loader-container">
          <div className="circular-loader"></div>
        </div>
      )}
      <div className="container">
        <input
          type="file"
          id="image-file"
          hidden
          accept=".jpg,.jpeg,.png"
          onChange={(event) => uPm.addPhoto(new Date().getTime(), event)}
        />
        <div className="row photos-container">
          {Array.from(uPm.photos.entries()).map(([key, photo]) => (
            <div key={key} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="image-card mt-3">
                <div className="remove-activity">
                  <Trash2Icon onClick={() => uPm.removePhoto(key)} />
                </div>
                <Image src={photo.dataString ?? ''} preview />
              </div>
            </div>
          ))}
          {Array.from(uPm.photos.entries()).length === 0 && (
            <div className="flex justify-content-center">No Images</div>
          )}
        </div>
      </div>
    </>
  );
}
