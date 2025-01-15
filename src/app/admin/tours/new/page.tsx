'use client';
import { ActivityDTO } from '@/dto/tour.dto';
import { useTourManagement } from '@/hooks/useTourManagement';
import { convertSecondsToDate, getDateValue } from '@/lib/utils/dateUtils';
import { emptyActivityObject } from '@/lib/utils/emptyObjects';
import {
  handleFileUpload,
  handleInputChange,
  handleNestedChange,
  handleTourInputChange,
} from '@/lib/utils/formInputHandlers';
import { ImagePlusIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Image } from 'primereact/image';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

export default function CreateTour({
  origin = 'new',
}: {
  origin: 'new' | 'edit/view';
}) {
  const uTm = useTourManagement(origin);

  let tourInputChangeHandler = (e: any) => {
    return handleTourInputChange(
      e,
      'text',
      uTm.setUpdatedTourFields,
      uTm.setTour,
    );
  };

  let handleActivityInputChange = (e: any, key: any) => {
    return handleInputChange(
      e,
      key,
      uTm.setUpdatedActivitiesFields,
      uTm.setActivities,
    );
  };

  return (
    <div className="container create-form mt-20">
      <h2>Create a New Tour </h2>
      {((uTm.action === 'creating' && !uTm.createTourError) ||
        (uTm.action === 'updating' && !uTm.updateTourError)) && (
        <div
          className="alert alert-success alert-dismissible fade show mt-20"
          role="alert"
        >
          Successfully {uTm.action === 'updating' ? 'updated' : 'created'}{' '}
          <strong>{uTm.tour.name}!</strong>.
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => uTm.setAction('nothing')}
          ></button>
        </div>
      )}

      {(uTm.createTourError || uTm.updateTourError) && (
        <div
          className="alert alert-danger alert-dismissible fade show mt-20"
          role="alert"
        >
          {uTm.createTourError ?? uTm.updateTourError}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => uTm.setAction('nothing')}
          ></button>
        </div>
      )}
      {origin !== 'new' && uTm.fetchingTourData && (
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
            onChange={tourInputChangeHandler}
            value={uTm.tour?.guide}
            required
          >
            <option value={''} key={'initial'}>
              Assign guide to tour
            </option>
            {uTm.guides.map((guide) => (
              <option key={guide.uid} value={guide.uid}>
                {guide.firstName} {guide.lastName}
              </option>
            ))}
          </select>
        </div>
        <div
          onClick={uTm.saveTourHandler}
          className={
            uTm.isCreatingTour ||
            uTm.isUpdatingTour ||
            (uTm.updatedTourFields.size === 0 &&
              uTm.updatedActivitiesFields.size === 0)
              ? 'disabled-button'
              : '' + ' save-button add-resource'
          }
        >
          {uTm.isCreatingTour
            ? 'Creating...'
            : uTm.isUpdatingTour
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
              value={uTm.tour.name}
              onChange={tourInputChangeHandler}
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
              value={uTm.tour.location.name}
              onChange={(e) =>
                handleNestedChange(
                  e,
                  'name',
                  uTm.setUpdatedTourFields,
                  uTm.setTour,
                )
              }
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
              value={uTm.tour.location.city}
              onChange={(e) =>
                handleNestedChange(
                  e,
                  'city',
                  uTm.setUpdatedTourFields,
                  uTm.setTour,
                )
              }
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
              value={uTm.tour.location.country}
              onChange={(e) =>
                handleNestedChange(
                  e,
                  'country',
                  uTm.setUpdatedTourFields,
                  uTm.setTour,
                )
              }
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
              value={uTm.tour.price}
              onValueChange={tourInputChangeHandler}
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
              value={uTm.tour.durationDays}
              onValueChange={tourInputChangeHandler}
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
              value={uTm.tour.discount}
              min={0}
              max={100}
              onValueChange={tourInputChangeHandler}
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
              value={uTm.tour.numberOfSeats}
              onValueChange={tourInputChangeHandler}
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
                origin === 'new' || uTm.updatedTourFields.has('date')
                  ? (uTm.tour.date as Date)
                  : convertSecondsToDate(uTm.tour.date._seconds)
              }
              onChange={tourInputChangeHandler}
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
              checked={uTm.tour.isAvailable}
              onChange={(e) => {
                uTm.setTour((prev) => ({
                  ...prev,
                  isAvailable: e.checked!,
                }));
                // Track which fields have been updated (preserving structure)
                uTm.setUpdatedTourFields((prevFields) =>
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
              value={uTm.tour.description}
              onChange={tourInputChangeHandler}
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

              const activity = new Map(uTm.activities);
              let activityObject = emptyActivityObject;
              activityObject.id = new Date().getTime();
              activity.set(activityObject.id, activityObject);

              uTm.setActivities(activity);
            }
          }}
          className="add-activity"
        >
          <PlusIcon />
        </div>
      </div>
      <div className="container">
        {Array.from(uTm.activities.entries()).map(([key, activity]) => {
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
                    onChange={(e) => handleActivityInputChange(e, key)}
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
                    onChange={(e) => handleActivityInputChange(e, key)}
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
                    onChange={(e) => handleActivityInputChange(e, key)}
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
                    onChange={(e) => handleActivityInputChange(e, key)}
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
                    onChange={(e) => handleActivityInputChange(e, key)}
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
                    onChange={(e) => handleActivityInputChange(e, key)}
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
                      let temp = new Map(uTm.activities);
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

                      uTm.setUpdatedActivitiesFields(
                        new Set(
                          Array.from(uTm.updatedActivitiesFields).filter(
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

                      uTm.setActivities(temp);
                      uTm.setActivityType({ type: e.target.value, key: key });
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
                (uTm.activityType.type === 'transportation' &&
                  uTm.activityType.key === key)) && (
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
                        onChange={(e) => handleActivityInputChange(e, key)}
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
                            handleActivityInputChange(
                              {
                                target: {
                                  name: 'transportation.arrivalTime',
                                  value: e.target.value,
                                },
                              },
                              key,
                            );
                          }

                          handleActivityInputChange(e, key);
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
                        onChange={(e) => handleActivityInputChange(e, key)}
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
                (uTm.activityType.type == 'accommodation' &&
                  uTm.activityType.key == key)) && (
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
                        onChange={(e) => handleActivityInputChange(e, key)}
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
                        onChange={(e) => handleActivityInputChange(e, key)}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="remove-activity">
                <Trash2Icon
                  onClick={() => {
                    let activity = new Map<number, ActivityDTO>(uTm.activities);
                    activity.delete(key);
                    uTm.setActivities(activity);
                  }}
                />
              </div>
            </form>
          );
        })}

        {Array.from(uTm.activities.entries()).length === 0 && (
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
          onChange={(event) =>
            handleFileUpload(event, uTm.setPhotos, uTm.photos)
          }
        />
      </div>
      <div className="container">
        <div className="row photos-container">
          {Array.from(uTm.photos.entries()).map(([key, photo]) => (
            <div key={key} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="image-card mt-3">
                <div className="remove-activity">
                  <Trash2Icon
                    onClick={() => {
                      let newPhotos = new Map(uTm.photos);
                      newPhotos.delete(key);
                      uTm.setPhotos(newPhotos);
                    }}
                  />
                </div>
                <Image src={photo.dataString ?? ''} preview />
              </div>
            </div>
          ))}
          {Array.from(uTm.activities.entries()).length === 0 && (
            <div className="flex justify-content-center">No Images</div>
          )}
        </div>
      </div>
    </div>
  );
}
