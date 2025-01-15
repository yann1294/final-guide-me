'use client';
import { ActivityDTO, TourDTO } from '@/dto/tour.dto';
import {
  useCreateOneTour,
  useFetchOneTour,
  useUpdateOneTour,
} from '@/hooks/useTours';
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
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
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
  const {
    updateOneTour,
    loading: isUpdatingTour,
    error: updateTourError,
  } = useUpdateOneTour();
  const { fetchGuides, loading, error } = useFetchGuides();
  const [updatedTourFields, setUpdatedTourFields] = useState<Set<string>>(
    new Set(),
  );
  const [updatedActivitiesFields, setUpdatedActivitiesFields] = useState<
    Set<string>
  >(new Set());
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
  }>({ type: 'normal', key: new Date().getTime() });

  useEffect(() => {
    // fetch guides if guides do not exist
    if (guides.length === 0) {
      fetchGuides();
    }

    // fetch tour if tour does not exist
    if (!currentTour && origin !== 'new') {
      fetchOneTour(window.location.pathname.split('/').slice(-1)[0]);
    }
    
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
        photo.set(new Date().getTime(), {
          file: file,
          dataString: dataUrl as string,
        });

        setPhotos(photo);
        
      };

      reader.onerror = (e) => {
        console.error('Error reading file:', e);
      };

      reader.readAsDataURL(file); // Convert the file to a Data URL
    } else {
      
    }
  }

  const handleTourInputChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | InputNumberValueChangeEvent
      | any,
    origin: 'number' | 'text' = 'text',
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
      
      // Check if it's a nested field and update accordingly
      if (subKey) {
        let temp: any = {};
        temp[subKey] = value;
        newActivity[mainKey] = { ...newActivity[mainKey], ...temp };
      } else {
        newActivity[mainKey] = value;
      }
      setUpdatedActivitiesFields((prevFields) =>
        new Set(prevFields).add(`${key}.${name}`),
      );
      updatedActivities.set(key, (newActivity ?? {}) as ActivityDTO); // Set updated activity back
      return updatedActivities;
    });
  };

  const generateUpdatedData = (origin: 'tour' | 'activity') => {
    const updated: Record<string, any> = {}; // Holds the final nested structure
    const fields =
      origin === 'tour' ? updatedTourFields : updatedActivitiesFields;
    const source =
      origin === 'tour' ? tour : Object.fromEntries(activities.entries());
    

    fields.forEach((path) => {
      const keys = path.split('.'); // Split the path into keys
      let currentSource: any = source; // Traverse source object to get value
      let currentUpdated = updated; // Traverse updated object to build structure

      keys.forEach((key, index) => {
        // Fetch the value from the source object
        if (currentSource && key in currentSource) {
          console.log(
            key,
            currentSource,
            currentSource && key in currentSource,
          );

          currentSource = currentSource[key];
          
        } else {
          currentSource = undefined; // Stop if key doesn't exist
        }

        // Build the updated object structure
        if (index === keys.length - 1) {
          // Assign the final value
          currentUpdated[key] = currentSource;
        } else {
          // Create nested object if it doesn't exist
          if (!currentUpdated[key] || typeof currentUpdated[key] !== 'object') {
            currentUpdated[key] = {};
          }
          currentUpdated = currentUpdated[key]; // Move deeper into `updated`
        }
      });
    });

    return updated; // Return the final nested structure
  };

  return (
    <div className="container create-form mt-20">
      <h2>Create a New Tour </h2>
      {((action === 'creating' && !createTourError) ||
        (action === 'updating' && !updateTourError)) && (
        <div
          className="alert alert-success alert-dismissible fade show mt-20"
          role="alert"
        >
          Successfully {action === 'updating' ? 'updated' : 'created'}{' '}
          <strong>{tour.name}!</strong>.
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setAction('nothing')}
          ></button>
        </div>
      )}

      {(createTourError || updateTourError) && (
        <div
          className="alert alert-danger alert-dismissible fade show mt-20"
          role="alert"
        >
          {createTourError ?? updateTourError}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setAction('nothing')}
          ></button>
        </div>
      )}
      {origin !== 'new' && fetchingTourData && (
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
            value={tour?.guide}
            required
          >
            <option value={''} key={'initial'}>
              Assign guide to tour
            </option>
            {guides.map((guide) => (
              <option key={guide.uid} value={guide.uid}>
                {guide.firstName} {guide.lastName}
              </option>
            ))}
          </select>
        </div>
        <div
          onClick={
            isCreatingTour ||
            isUpdatingTour ||
            (updatedTourFields.size === 0 && updatedActivitiesFields.size === 0)
              ? () => {
                  
                }
              : () => {
                  const form = document.getElementById(
                    'create-tour-form',
                  ) as HTMLFormElement;
                  const activityForm = document.querySelectorAll(
                    '.create-activity-form',
                  ) as NodeListOf<HTMLFormElement>;
                  let activityFormIsValid = true;

                  // Check if the form is valid
                  activityForm.forEach((form) => {
                    if (!form.checkValidity()) {
                      form.reportValidity();
                      activityFormIsValid = false;
                    }
                  });

                  // Check if the form is valid (using HTML5 checkValidity)
                  if (form.checkValidity() && activityFormIsValid) {
                    

                    // check if origin is new
                    if (origin === 'new') {
                      // check whether guide was assigned
                      
                      if (tour.guide.trim() !== '') {
                        // checking whether activities is present
                        if (activities.size === 0) {
                          alert('At least one tour activity is required');
                          return;
                        }
                        // combine activities and tour
                        tour.activities = activities;
                        

                        // create tour
                        createOneTour(tour);
                        setAction('creating');
                        updatedTourFields.clear();
                        updatedActivitiesFields.clear();
                        // setTour({ ...emptyTourObject, ...{ name: tour.name } });
                      } else {
                        alert('Please select a guide');
                      }
                    } else {
                      let newTour: any = {};
                      // get generated data
                      if (updatedTourFields.size !== 0) {
                        newTour = generateUpdatedData('tour');
                      }

                      if (updatedActivitiesFields.size !== 0) {
                        newTour['activities'] = generateUpdatedData('activity');
                      }

                      // update id
                      newTour['id'] = currentTour?.id;

                      // update action
                      setAction('updating');

                      // update data
                      updateOneTour(newTour as Partial<TourDTO>);

                      // update tour store
                      updateTour(tour);

                      // update current
                      setCurrentTour(tour);

                      // clear updated field
                      updatedTourFields.clear();
                      updatedActivitiesFields.clear();
                    }
                  } else {
                    // Form is invalid, trigger validation
                    
                    form.reportValidity(); // This will show the built-in validation messages
                  }
                }
          }
          className={
            isCreatingTour ||
            isUpdatingTour ||
            (updatedTourFields.size === 0 && updatedActivitiesFields.size === 0)
              ? 'disabled-button'
              : '' + ' save-button add-resource'
          }
        >
          {isCreatingTour
            ? 'Creating...'
            : isUpdatingTour
            ? 'Updating...'
            : 'Save'}
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
              name="price"
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
            const form = document.querySelectorAll(
              '.create-activity-form',
            ) as NodeListOf<HTMLFormElement>;
            let isValid = true;

            // Check if the form is valid (using HTML5 checkValidity)
            form.forEach((form) => {
              if (!form.checkValidity()) {
                form.reportValidity();
                isValid = false;
              }
            });

            if (!form || isValid) {
              // Form is valid, proceed with submission or any other action
              

              const activity = new Map(activities);
              let activityObject = emptyActivityObject;
              activityObject.id = new Date().getTime();
              activity.set(activityObject.id, activityObject);
              
              setActivities(activity);
              
            }
          }}
          className="add-activity"
        >
          <PlusIcon />
        </div>
      </div>
      <div className="container">
        {Array.from(activities.entries()).map(([keyObj, activityObj]) => {
          const key: number = keyObj;
          // const key: number = parseInt(keyObj);
          const activity: ActivityDTO = activityObj as ActivityDTO;

          function getDateValue(
            origin: 'transportation' | 'accommodation',
            obj: any,
            field: string,
          ): Date | null {
            
            let date = new Date();

            if (!obj || !obj[field]) return null;

            if (origin === 'transportation') {
              // check whether date contains _seconds
              if (Object.keys(obj[field]).includes('_seconds')) {
                date = convertSecondsToDate(obj[field]['_seconds']);
              } else {
                date = obj[field];
              }
            }
            return date;
          }

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
                    Arrival Type
                  </label>
                  <select
                    onChange={(e) => {
                      
                      let temp = new Map(activities);
                      // update activity information based on selected type
                      switch (e.target.value) {
                        case 'accommodation':
                          // delete transportation
                          delete temp.get(key)?.transportation;
                          break;

                        case 'transportation':
                          // delete accommodation
                          delete temp.get(key)?.accommodation;
                          break;
                        case 'normal':
                          // delete transportation and accommodation
                          delete temp.get(key)?.transportation;
                          delete temp.get(key)?.accommodation;
                          break;
                        default:
                          break;
                      }

                      setUpdatedActivitiesFields(
                        new Set(
                          Array.from(updatedActivitiesFields).filter(
                            (field) => {
                              if (e.target.value === 'normal') {
                                return (
                                  !field.includes('accommodation') &&
                                  !field.includes('transportation')
                                );
                              }
                              return !field.includes(e.target.value);
                            },
                          ),
                        ),
                      );

                      setActivities(temp);
                      setActivityType({ type: e.target.value, key: key });
                    }}
                    style={{ height: '40px' }}
                    defaultValue={
                      activity.accommodation
                        ? 'accommodation'
                        : activity.transportation
                        ? 'transportation'
                        : 'normal'
                    }
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

              {(activity.transportation !== undefined ||
                (activityType.type === 'transportation' &&
                  activityType.key === key)) && (
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
                        value={activity.transportation?.type}
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
                        value={getDateValue(
                          'transportation',
                          activity.transportation,
                          'departureTime',
                        )}
                        onChange={(e) => {
                          const arrivalTime =
                            activity.transportation?.arrivalTime;
                          let arrivalIsGreat = true;

                          if (arrivalTime instanceof Date && e.target.value) {
                            arrivalIsGreat = arrivalTime > e.target.value;
                          } else if (arrivalTime?._seconds && e.target.value) {
                            arrivalIsGreat =
                              convertSecondsToDate(arrivalTime?._seconds) >
                              e.target.value;
                          }

                          if (!arrivalIsGreat) {
                            handleInputChange(
                              {
                                target: {
                                  name: 'transportation.arrivalTime',
                                  value: e.target.value,
                                },
                              },
                              key,
                            );
                          }

                          handleInputChange(e, key);
                        }}
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
                        value={getDateValue(
                          'transportation',
                          activity.transportation,
                          'arrivalTime',
                        )}
                        onChange={(e) => handleInputChange(e, key)}
                        showTime
                        showIcon={true}
                        minDate={
                          getDateValue(
                            'transportation',
                            activity.transportation,
                            'departureTime',
                          ) ?? undefined
                        }
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {(activity.accommodation !== undefined ||
                (activityType.type == 'accommodation' &&
                  activityType.key == key)) && (
                <>
                  <div className="field col-md-3">
                    <div className="form-group">
                      <label htmlFor="accommodationType" className="form-label">
                        Accommodation Type
                      </label>
                      <InputText
                        className="form-control"
                        id="accommodationType"
                        name="accommodation.type"
                        value={activity.accommodation?.type}
                        onChange={(e) => handleInputChange(e, key)}
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
                        value={activity.accommodation?.name}
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

        {Array.from(activities.entries()).length === 0 && (
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
          {Array.from(activities.entries()).length === 0 && (
            <div className="flex justify-content-center">No Images</div>
          )}
        </div>
      </div>
    </div>
  );
}
