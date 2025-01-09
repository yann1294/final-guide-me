'use client';
import { PackageDTO } from '@/dto/package.dto';
import { emptyPackageObject } from '@/lib/utils/emptyObjects';
import { ImagePlusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Image } from 'primereact/image';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useState } from 'react';

export default function CreatePackage() {
  const [pkg, setPackage] = useState<PackageDTO>(emptyPackageObject);
  const [photos, setPhotos] = useState<Map<number, { file: File; dataString: string }>>(new Map());

  function handleFileUpload(event: any) {
    const file = event.target.files[0]; // Get the first uploaded file
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const dataUrl = e.target?.result; // The Data URL as a string
        let photo = new Map(photos);
        photo.set(new Date().getMilliseconds(), {
          file: file,
          dataString: dataUrl as string,
        });

        setPhotos(photo);
        console.log('Data URL:', dataUrl);
      };

      reader.onerror = (e) => {
        console.error('Error reading file:', e);
      };

      reader.readAsDataURL(file); // Convert the file to a Data URL
    } else {
      console.log('No file selected.');
    }
  }

  const handlePackageInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPackage((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof PackageDTO['location']) => {
    const { value } = e.target;
    setPackage((prev) => ({
      ...prev,
      location: { ...prev.location, [field]: value },
    }));
  };

  const handleDateChange = (e: any) => {
    setPackage((prev) => ({
      ...prev,
      date: e.value.getTime(),
    }));
  };

  return (
    <div className="container create-form mt-20">
      <h2>Create a New Package</h2>
      <div className="create-form-section-title mt-20">Package Details</div>
      <div className="action-buttons mb-0 mt-20 justify-content-between align-item-center">
        <div className="guide-area p-0">
          <select className="form-select m-0 w-auto" defaultValue={''}>
            <option value="">Assign guide to package</option>
            <option value="">Guide 1</option>
          </select>
        </div>
        <div className="save-button add-resource">Save package</div>
      </div>
      <div className="row">
        {/* Tour Name */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Package Name</label>
            <InputText
              className="form-control"
              id="name"
              name="name"
              value={pkg.name}
              onChange={handlePackageInputChange}
              required
            />
          </div>
        </div>

        {/* Location Name */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="locationName" className="form-label">Location Name</label>
            <InputText
              className="form-control"
              id="locationName"
              value={pkg.location.name}
              onChange={(e) => handleNestedChange(e, 'name')}
              required
            />
          </div>
        </div>

        {/* City */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="city" className="form-label">City</label>
            <InputText
              className="form-control"
              id="city"
              value={pkg.location.city}
              onChange={(e) => handleNestedChange(e, 'city')}
              required
            />
          </div>
        </div>

        {/* Country */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="country" className="form-label">Country</label>
            <InputText
              className="form-control"
              id="country"
              value={pkg.location.country}
              onChange={(e) => handleNestedChange(e, 'country')}
              required
            />
          </div>
        </div>

        {/* Price */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="price" className="form-label">Price (USD)</label>
            <InputNumber
              className="form-control"
              id="price"
              value={pkg.price}
              onValueChange={(e: any) => setPackage((prev) => ({ ...prev, price: e.value }))}
              mode="currency"
              currency="USD"
              required
            />
          </div>
        </div>

        {/* Duration (Days) */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="durationDays" className="form-label">Duration (Days)</label>
            <InputNumber
              className="form-control"
              id="durationDays"
              value={pkg.durationDays}
              onValueChange={(e: any) => setPackage((prev) => ({ ...prev, durationDays: e.value }))}
              required
            />
          </div>
        </div>

        {/* Discount */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="discount" className="form-label">Discount (%)</label>
            <InputNumber
              className="form-control"
              id="discount"
              value={pkg.discount}
              onValueChange={(e: any) => setPackage((prev) => ({ ...prev, discount: e.value }))}
            />
          </div>
        </div>

        {/* Number of Seats */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="numberOfSeats" className="form-label">Number of Seats</label>
            <InputNumber
              className="form-control"
              id="numberOfSeats"
              value={pkg.numberOfSeats}
              onValueChange={(e: any) => setPackage((prev) => ({ ...prev, numberOfSeats: e.value }))}
              required
            />
          </div>
        </div>

        {/* Date */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="date" className="form-label">Date</label>
            <Calendar
              className="form-control date-element"
              id="date"
              value={pkg.date}
              onChange={handleDateChange}
              showTime
              showIcon={true}
              required
            />
          </div>
        </div>

        {/* Availability */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="isAvailable" className="form-label">Is Available</label>
            <Checkbox
              inputId="isAvailable"
              checked={pkg.isAvailable}
              onChange={(e) => setPackage((prev) => ({ ...prev, isAvailable: e.checked! }))}
            />
          </div>
        </div>

        {/* Description */}
        <div className="field col-12">
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <InputTextarea
              className="form-control"
              id="description"
              value={pkg.description}
              onChange={handlePackageInputChange}
              rows={3}
              required
            />
          </div>
        </div>
      </div>

      {/* Tour Photos */}
      <div className="tour-activities-actions mt-40">
        <div className="create-form-section-title ">Package Photos</div>
        <div
          onClick={() => {
            var file = document.getElementById('image-file');
            file?.click();
          }}
          className="add-activity"
        >
          <ImagePlusIcon />
        </div>
        <input
          type="file"
          id="image-file"
          hidden
          accept=".jpg,.jpeg,.png"
          onChange={(event) => handleFileUpload(event)}
        />
      </div>
      <div className="container">
        <div className="row photos-container">
          {Array.from(photos.entries()).map(([key, photo]) => (
            <div key={key} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="image-card mt-3">
                <div className="remove-activity">
                  <Trash2Icon
                    onClick={() => {
                      let newPhotos = new Map(photos);
                      newPhotos.delete(key);
                      setPhotos(newPhotos);
                    }}
                  />
                </div>
                <Image src={photo.dataString ?? ''} preview />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
