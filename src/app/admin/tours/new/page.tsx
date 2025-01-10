'use client';
import { ActivityDTO, TourDTO } from '@/dto/tour.dto';
import { useCreateOneTour, useFetchOneTour, useUpdateOneTour } from '@/hooks/useTours';
import { useFetchGuides } from '@/hooks/useUsers';
import { convertSecondsToDate } from '@/lib/utils/dateUtils';
import { emptyActivityObject, emptyTourObject } from '@/lib/utils/emptyObjects';
import useTourStore from '@/stores/tourStore';
import useUserStore from '@/stores/userStore';
import { ImagePlusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/router';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Image } from 'primereact/image';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { FormEvent, useEffect, useState } from 'react';

export default function CreateTour({
  origin = 'new',
}: {
  origin: 'new' | 'edit/view';
}) {
  const { currentTour, setCurrentTour, updateTour } = useTourStore();
  const [tour, setTour] = useState<TourDTO>(emptyTourObject);
  const [action, setAction] = useState<'creating' | 'updating' | 'nothing'>(
    'nothing',
  );
  const { guides } = useUserStore();
  const { fetchOneTour, loading: fetchingTourData } = useFetchOneTour();
  const { updateOneTour, loading: isUpdatingTour } = useUpdateOneTour();
  const { fetchGuides, loading, error } = useFetchGuides();
  const [updatedTourFields, setUpdatedTourFields] = useState<Set<string>>(new Set());
  const {
    createOneTour,
    loading: isCreatingTour,
    error: createTourError,
  } = useCreateOneTour();
  const [activities, setActivities] = useState<Map<number, ActivityDTO>>(
    new Map(),
  );
  const [photos, setPhotos] = useState<
    Map<number, { file: File; dataString: string }>
  >(new Map());
  const [activityType, setActivityType] = useState<{
    type: string;
    key: number;
  }>({ type: 'normal', key: new Date().getMilliseconds() });

  useEffect(() => {
    // fetch guides if guides do not exist
    if (guides.length === 0) {
      fetchGuides();
    }

    // fetch tour if tour does not exist
    if (!currentTour && origin !== "new") {
      fetchOneTour(window.location.pathname.split('/').slice(-1)[0]);
    }
    console.log(currentTour);
  }, [fetchGuides, guides, fetchOneTour, currentTour]);

  // Effect to update `tour` when `currentTour` changes
  useEffect(() => {
    if (origin === 'edit/view' && currentTour) {
      // update tour
      setTour(currentTour);

      // update activities
      setActivities(currentTour.activities);
    } else {
      setTour(emptyTourObject);
    }
  }, [currentTour, origin]);

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | InputNumberValueChangeEvent | any,
    origin: "number" | "text" = "text",
  ) => {
    // Track which fields have been updated (preserving structure)
    setUpdatedTourFields((prevFields) => new Set(prevFields).add(name));
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
    // Track which fields have been updated (preserving structure)
    setUpdatedTourFields((prevFields) =>
      new Set(prevFields).add(`location.${field}`),
    );
  };

  // Handle change in the input fields
  const handleInputChange = (e: any, key: number) => {
    const { name, value } = {
      name: (e.target ?? e.originalEvent.target).name,
      value: (e.target ?? e.originalEvent.target).value,
    };
    const [mainKey, subKey] = name.split('.'); // Handle nested keys with dot notation

    setActivities((prevActivities) => {
      const updatedActivities = new Map(prevActivities);
      const activity = updatedActivities.get(key);

      const newActivity: any = Object.assign({}, activity ?? {});
      console.log(newActivity);
      // Check if it's a nested field and update accordingly
      if (subKey) {
        let temp: any = {};
        temp[subKey] = value;
        newActivity[mainKey] = { ...newActivity[mainKey], ...temp };
      } else {
        newActivity[mainKey] = value;
      }
      console.log(newActivity);
      // remove accommodation or transportation
      if (mainKey === 'accommodation') {
        delete newActivity['transportation'];
      } else if (mainKey === 'transportation') {
        delete newActivity['accommodation'];
      }

      updatedActivities.set(key, (newActivity ?? {}) as ActivityDTO); // Set updated activity back
      return updatedActivities;
    });
  };

  const generateUpdatedData = () => {
    let updated: any = {}; // This will hold the final structure
  
    updatedTourFields.forEach((path) => {
      const keys = path.split('.'); // Split path (e.g., 'location.city')
      let current = updated; // Start at the root of `updated`
      let source: any = tour; // Start at the root of `tour`
  
      keys.forEach((key, index) => {
        // Traverse `tour` to fetch the nested value
        if (source && key in source) {
          source = source[key]; // Go deeper into `tour`
        } else {
          source = undefined; // If the key doesn't exist, break out
        }
  
        // Build the structure in `updated`
        if (!current[key]) {
          if (index === keys.length - 1) {
            current[key] = source; // Assign the final value
          } else {
            current[key] = {}; // Create a nested object if not at the last key
          }
        }
        current = current[key]; // Move deeper into `updated`
      });
    });
  
    return updated; // Return the final nested structure
  };
  

  return (
    <div className="container create-form mt-20">
      <h2>Create a New Tour</h2>
      {action === 'creating' && !createTourError && (
        <div
          className="alert alert-success alert-dismissible fade show mt-20"
          role="alert"
        >
          Successfully created <strong>{tour.name}!</strong>.
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setAction('nothing')}
          ></button>
        </div>
      )}
      { origin !== 'new' && fetchingTourData && (
        <div className="circular-loader-container">
          <div className="circular-loader"></div>
        </div>
      )}

      <div className="create-form-section-title  mt-20">Tour Details</div>
      <div className="action-buttons mb-0 mt-20 justify-content-between align-item-center">
        <div
          style={{
            border: '1px solid #ced4da',
            padding: '0',
            paddingLeft: '10px',
            backgroundColor: '#6BC8B4',
          }}
          className="guide-area"
        >
          <span style={{ color: 'white', fontWeight: 'bold' }}>Guide</span>{' '}
          <select
            style={{
              height: '40px',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            className="form-select m-0 w-auto"
            name="guide"
            onChange={handleTourInputChange}
            value={origin === 'new' ? '' : tour?.guide}
            required
          >
            <option key={'initial'}>Assign guide to tour</option>
            {guides.map((guide) => (
              <option key={guide.uid} value={guide.uid}>
                {guide.firstName} {guide.lastName}
              </option>
            ))}
          </select>
        </div>
        <div
          onClick={
            isCreatingTour
              ? () => {}
              : () => {
                  const form = document.getElementById(
                    'create-tour-form',
                  ) as HTMLFormElement;

                  // Check if the form is valid (using HTML5 checkValidity)
                  if (form.checkValidity()) {
                    console.log(updatedTourFields);
                    
                    // check if origin is new
                    if (origin === "new"){
                    
                    // check whether guide was assigned
                    if (tour.guide.trim() !== '') {
                      // combine activities and tour
                      tour.activities = activities;

                      // create tour
                      createOneTour(tour);
                      setAction('creating');
                    } else {
                      alert('Please select a guide');
                    }}else {
                      // get generated data
                      let newTour = generateUpdatedData();

                      // update id
                      newTour["id"] = currentTour?.id;

                      // update data
                      updateOneTour(newTour as Partial<TourDTO>);

                      // update tour store
                      updateTour(tour);

                      // update current
                      setCurrentTour(tour);

                    }
                  } else {
                    // Form is invalid, trigger validation
                    console.log('Form is invalid!');
                    form.reportValidity(); // This will show the built-in validation messages
                  }
                }
          }
          className="save-button add-resource"
        >
          {isCreatingTour ? 'Creating...' : 'Save'}
        </div>
      </div>
      <form id="create-tour-form" className="row">
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
              name="location.name"
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
              name='price'
              value={tour.price}
              onValueChange={handleTourInputChange}
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
              name="durationDays"
              value={tour.durationDays}
              onValueChange={handleTourInputChange}
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
              name="discount"
              value={tour.discount}
              min={0}
              max={100}
              onValueChange={handleTourInputChange}
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
              name="numberOfSeats"
              value={tour.numberOfSeats}
              onValueChange={handleTourInputChange}
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
              name="date"
              value={
                origin === 'new' || updatedTourFields.has('date')
                  ? (tour.date as Date)
                  : convertSecondsToDate(tour.date._seconds)
              }
              onChange={handleTourInputChange}
              showTime
              showIcon={true}
              minDate={new Date()}
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
              onChange={(e) => {
                setTour((prev) => ({
                  ...prev,
                  isAvailable: e.checked!,
                }));
                // Track which fields have been updated (preserving structure)
                setUpdatedTourFields((prevFields) =>
                  new Set(prevFields).add('isAvailable'),
                );
              }}
            />
          </div>
        </div>

        {/* Description */}
        <div className="field col-12">
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              name="description"
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
            ></textarea>
          </div>
        </div>
      </form>
      {/* <hr /> */}
      <div className="tour-activities-actions mt-40">
        <div className="create-form-section-title ">Tour Activities</div>
        <div
          onClick={() => {
            const form = document.querySelector(
              '.create-activity-form',
            ) as HTMLFormElement;

            // Check if the form is valid (using HTML5 checkValidity)
            if (form.checkValidity()) {
              // Form is valid, proceed with submission or any other action
              console.log('Form is valid!');

              const activity = new Map(activities);
              activity.set(new Date().getMilliseconds(), emptyActivityObject);
              setActivities(activity);
            } else {
              // Form is invalid, trigger validation
              console.log('Form is invalid!');
              form.reportValidity(); // This will show the built-in validation messages
            }
          }}
          className="add-activity"
        >
          <PlusIcon />
        </div>
      </div>
      <div className="container">
        {activities.size !== 0 &&
          Object.entries(activities).map(([keyObj, activityObj]) => {
            const key: number = parseInt(keyObj);
            const activity: ActivityDTO = activityObj as ActivityDTO;
            return (
              <form
                id={`${key}`}
                key={key}
                className="row activity-card create-activity-form"
              >
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
                      onChange={(e) => handleInputChange(e, key)}
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
                      onChange={(e) => handleInputChange(e, key)}
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
                      onChange={(e) => handleInputChange(e, key)}
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
                      onChange={(e) => handleInputChange(e, key)}
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
                      onChange={(e) => handleInputChange(e, key)}
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
                      onChange={(e) => handleInputChange(e, key)}
                      required
                    />
                  </div>
                </div>

                <div className="filed col-md-3">
                  <div className="form-group">
                    <label htmlFor="activityType" className="form-label">
                      Arrival Time
                    </label>
                    <select
                      onChange={(e) => {
                        setActivityType({ type: e.target.value, key: key });
                      }}
                      style={{ height: '40px' }}
                      defaultValue={'normal'}
                      name="activityType"
                      id="activityType"
                      className="activityType form-select"
                    >
                      <option value="normal">Normal</option>
                      <option value="accommodation">Accommodation</option>
                      <option value="transportation">Transportation</option>
                    </select>
                  </div>
                </div>

                {activityType.type == 'transportation' &&
                  activityType.key == key && (
                    <>
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
                            onChange={(e) => handleInputChange(e, key)}
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
                            name="transportation.departureTime"
                            value={
                              origin === 'new'
                                ? (activity.transportation.departureTime as any)
                                : convertSecondsToDate(tour.date._seconds)
                            }
                            onChange={(e) => handleInputChange(e, key)}
                            showTime
                            showIcon={true}
                            required
                            minDate={new Date()}
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
                            name="transportation.arrivalTime"
                            value={
                              origin === 'new'
                                ? (activity.transportation.arrivalTime as any)
                                : convertSecondsToDate(
                                    activity.transportation.arrivalTime
                                      ._seconds,
                                  )
                            }
                            onChange={(e) => handleInputChange(e, key)}
                            showTime
                            showIcon={true}
                            minDate={
                              origin === 'new'
                                ? (activity.transportation.departureTime as any)
                                : convertSecondsToDate(
                                    (
                                      activity.transportation
                                        .departureTime as any
                                    )._seconds,
                                  )
                            }
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                {activityType.type == 'accommodation' &&
                  activityType.key == key && (
                    <>
                      <div className="field col-md-3">
                        <div className="form-group">
                          <label
                            htmlFor="accommodationType"
                            className="form-label"
                          >
                            Accommodation Type
                          </label>
                          <InputText
                            className="form-control"
                            id="accommodationType"
                            name="accommodation.type"
                            value={activity.accommodation.type}
                            onChange={(e) => handleInputChange(e, key)}
                            required
                          />
                        </div>
                      </div>

                      <div className="field col-md-3">
                        <div className="form-group">
                          <label
                            htmlFor="accommodationName"
                            className="form-label"
                          >
                            Accommodation Name
                          </label>
                          <InputText
                            className="form-control"
                            id="accommodationName"
                            name="accommodation.name"
                            value={activity.accommodation.name}
                            onChange={(e) => handleInputChange(e, key)}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                <div className="remove-activity">
                  <Trash2Icon
                    onClick={() => {
                      let activity = new Map<number, ActivityDTO>(activities);
                      activity.delete(key);
                      setActivities(activity);
                    }}
                  />
                </div>
              </form>
            );
          })}

        {Object.entries(activities).length === 0 && (
          <div className="flex justify-content-center">No Activities</div>
        )}
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
          {Object.entries(photos).map(([key, photo]) => (
            <div key={key} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="image-card mt-3">
                <div className="remove-activity">
                  <Trash2Icon
                    onClick={() => {
                      let newPhotos = new Map(photos);
                      newPhotos.delete(parseInt(key));
                      setPhotos(newPhotos);
                    }}
                  />
                </div>
                <Image src={photo.dataString ?? ''} preview />
              </div>
            </div>
          ))}
          {Object.entries(activities).length === 0 && (
            <div className="flex justify-content-center">No Images</div>
          )}
        </div>
      </div>
    </div>
  );
}
