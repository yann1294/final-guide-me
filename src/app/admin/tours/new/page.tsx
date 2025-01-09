'use client';
import { ActivityDTO, TourDTO } from '@/dto/tour.dto';
import {
  emptyActivityObject,
  emptyTourObject,
} from '@/lib/utils/empty_objects';
import { ImagePlusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Image } from 'primereact/image';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { FormEvent, useState } from 'react';

export default function CreateTour() {
  const [tour, setTour] = useState<TourDTO>(emptyTourObject);
  const [activities, setActivities] = useState<
    Map<number, typeof emptyActivityObject>
  >(new Map([[0, emptyActivityObject]]));
  const [photos, setPhotos] = useState<
    Map<number, { file: File; dataString: string }>
  >(new Map());

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

  const handleTourInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTour((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof TourDTO['location'],
  ) => {
    const { value } = e.target;
    setTour((prev) => ({
      ...prev,
      location: { ...prev.location, [field]: value },
    }));
  };

  return (
    <div className="container create-form mt-20">
      <h2>Create a New Tour</h2>
      <div className="create-form-section-title  mt-20">Tour Details</div>
      <div className="action-buttons mb-0 mt-20 justify-content-between align-item-center">
      <div className="guide-area p-0">
      <select className='form-select m-0 w-auto' defaultValue={""}>
            <option value="">Assign guide to tour</option>
            <option value="">Guide 1</option>
          </select>
        </div>
        <div className="save-button add-resource">Save tour</div>
      </div>
      <div className="row">
        {/* Tour Name */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Tour Name
            </label>
            <InputText
              className="form-control"
              id="name"
              name="name"
              value={tour.name}
              onChange={handleTourInputChange}
              required
            />
          </div>
        </div>

        {/* Location Name */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="locationName" className="form-label">
              Location Name
            </label>
            <InputText
              className="form-control"
              id="locationName"
              value={tour.location.name}
              onChange={(e) => handleNestedChange(e, 'name')}
              required
            />
          </div>
        </div>

        {/* City */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <InputText
              className="form-control"
              id="city"
              value={tour.location.city}
              onChange={(e) => handleNestedChange(e, 'city')}
              required
            />
          </div>
        </div>

        {/* Country */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <InputText
              className="form-control"
              id="country"
              value={tour.location.country}
              onChange={(e) => handleNestedChange(e, 'country')}
              required
            />
          </div>
        </div>

        {/* Price */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Price (USD)
            </label>
            <InputNumber
              className="form-control"
              id="price"
              value={tour.price}
              onValueChange={(e) =>
                setTour((prev) => ({ ...prev, price: e.value } as TourDTO))
              }
              mode="currency"
              currency="USD"
              required
            />
          </div>
        </div>

        {/* Duration (Days) */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="durationDays" className="form-label">
              Duration (Days)
            </label>
            <InputNumber
              className="form-control"
              id="durationDays"
              value={tour.durationDays}
              onValueChange={(e) =>
                setTour(
                  (prev) => ({ ...prev, durationDays: e.value } as TourDTO),
                )
              }
              required
            />
          </div>
        </div>

        {/* Discount */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="discount" className="form-label">
              Discount (%)
            </label>
            <InputNumber
              className="form-control"
              id="discount"
              value={tour.discount}
              onValueChange={(e) =>
                setTour((prev) => ({ ...prev, discount: e.value } as TourDTO))
              }
            />
          </div>
        </div>

        {/* Number of Seats */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="numberOfSeats" className="form-label">
              Number of Seats
            </label>
            <InputNumber
              className="form-control"
              id="numberOfSeats"
              value={tour.numberOfSeats}
              onValueChange={(e) =>
                setTour(
                  (prev) => ({ ...prev, numberOfSeats: e.value } as TourDTO),
                )
              }
              required
            />
          </div>
        </div>

        {/* Date */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <Calendar
              className="form-control date-element"
              id="date"
              // value={tour.date}
              // onChange={(e) => setTour((prev) => ({ ...prev, date: e.value }))}
              showTime
              showIcon={true}
              required
            />
          </div>
        </div>

        {/* Availability */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="isAvailable" className="form-label">
              Is Available
            </label>
            <Checkbox
              inputId="isAvailable"
              checked={tour.isAvailable}
              onChange={(e) =>
                setTour((prev) => ({
                  ...prev,
                  isAvailable: e.checked!,
                }))
              }
            />
          </div>
        </div>

        {/* Description */}
        <div className="field col-12">
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <InputTextarea
              className="form-control"
              id="description"
              value={tour.description}
              onChange={handleTourInputChange}
              rows={1}
              onInput={(e) => {
                let desc = document.getElementById('description');
                if (desc) {
                  desc.style.height = 'auto';
                  desc.style.height = desc.scrollHeight + 'px';
                }
              }}
              required
            />
          </div>
        </div>
      </div>
      {/* <hr /> */}
      <div className="tour-activities-actions mt-40">
        <div className="create-form-section-title ">Tour Activities</div>
        <div
          onClick={() => {
            const activity = new Map(activities);
            activity.set(new Date().getMilliseconds(), emptyActivityObject);
            setActivities(activity);
          }}
          className="add-activity"
        >
          <PlusIcon />
        </div>
      </div>
      <div className="container">
        {Array.from(activities.entries()).map(([key, activity]) => (
          <div id={`${key}`} key={key} className="row activity-card">
            <div className="field col-md-3">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Activity Name
                </label>
                <InputText
                  className="form-control"
                  id="name"
                  name="name"
                  value={activity.name}
                  onChange={handleTourInputChange}
                  required
                />
              </div>
            </div>

            <div className="field col-md-3">
              <div className="form-group">
                <label htmlFor="durationHours" className="form-label">
                  Duration (Hours)
                </label>
                <InputNumber
                  className="form-control"
                  id="durationHours"
                  name="durationHours"
                  value={activity.durationHours}
                  required
                />
              </div>
            </div>

            <div className="field col-md-3">
              <div className="form-group">
                <label htmlFor="locationName" className="form-label">
                  Location Name
                </label>
                <InputText
                  className="form-control"
                  id="locationName"
                  name="location.name"
                  value={activity.location.name}
                  onChange={handleTourInputChange}
                  required
                />
              </div>
            </div>

            <div className="field col-md-3">
              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <InputText
                  className="form-control"
                  id="city"
                  name="location.city"
                  value={activity.location.city}
                  onChange={handleTourInputChange}
                  required
                />
              </div>
            </div>

            <div className="field col-md-3">
              <div className="form-group">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <InputText
                  className="form-control"
                  id="country"
                  name="location.country"
                  value={activity.location.country}
                  onChange={handleTourInputChange}
                  required
                />
              </div>
            </div>

            <div className="field col-md-3">
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <InputText
                  className="form-control"
                  id="address"
                  name="location.address"
                  value={activity.location.address}
                  onChange={handleTourInputChange}
                  required
                />
              </div>
            </div>

            <div className="field col-md-3">
              <div className="form-group">
                <label htmlFor="arrivalTime" className="form-label">
                  Arrival Time
                </label>
                <Calendar
                  className="form-control date-element"
                  id="arrivalTime"
                  // value={tour.date}
                  // onChange={(e) => setTour((prev) => ({ ...prev, date: e.value }))}
                  showTime
                  showIcon={true}
                  required
                />
              </div>
            </div>

            <div className="field col-md-3">
              <div className="form-group">
                <label htmlFor="departureTime" className="form-label">
                  Departure Time
                </label>
                <Calendar
                  className="form-control date-element"
                  id="departureTime"
                  // value={tour.date}
                  // onChange={(e) => setTour((prev) => ({ ...prev, date: e.value }))}
                  showTime
                  showIcon={true}
                  required
                />
              </div>
            </div>

            <div className="field col-md-3">
              <div className="form-group">
                <label htmlFor="transportType" className="form-label">
                  Transportation Type
                </label>
                <InputText
                  className="form-control"
                  id="transportType"
                  name="transportation.type"
                  value={activity.transportation.type}
                  onChange={handleTourInputChange}
                  required
                />
              </div>
            </div>

            <div className="field col-md-3">
              <div className="form-group">
                <label htmlFor="accommodationType" className="form-label">
                  Accommodation Type
                </label>
                <InputText
                  className="form-control"
                  id="accommodationType"
                  name="accommodation.type"
                  value={activity.accommodation.type}
                  onChange={handleTourInputChange}
                  required
                />
              </div>
            </div>

            <div className="field col-md-3">
              <div className="form-group">
                <label htmlFor="accommodationName" className="form-label">
                  Accommodation Name
                </label>
                <InputText
                  className="form-control"
                  id="accommodationName"
                  name="accommodation.name"
                  value={activity.accommodation.name}
                  onChange={handleTourInputChange}
                  required
                />
              </div>
            </div>

            <div className="remove-activity">
              <Trash2Icon
                onClick={() => {
                  let activity = new Map<number, ActivityDTO>(activities);
                  activity.delete(key);
                  setActivities(activity);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Uploading photos */}
      <div className="tour-activities-actions mt-40">
        <div className="create-form-section-title ">Tour Photos</div>
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
