import { useActivityManagement } from '@/hooks/tours/useActivityManagement';
import { convertSecondsToDate, getDateValue } from '@/lib/utils/dateUtils';
import { Trash2Icon } from 'lucide-react';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

export default function CreateActivityComponent({
  origin = 'new',
}: {
  origin: 'new' | 'edit/view';
}) {
  const uAm = useActivityManagement(origin);
  return (
    <>
      <div className="tour-activities-actions mt-40 action-buttons">
        <div className="create-form-section-title disable-hover">
          Tour Activities ({uAm.activities.size.toString().padStart(2, '0')})
        </div>
        <div className="flex disable-hover">
          <div
            className={
              'add-resource ' +
              (uAm.activities.size === 0 ? 'disabled-button' : '')
            }
            onClick={uAm.saveActivitiesHandler}
          >
            Save Activities
          </div>
          <div
            onClick={uAm.addActivity}
            className="add-activity add-resource flex"
          >
            <div className="disable-hover">Add Activity</div>
          </div>
        </div>
      </div>
      {!uAm.loading && !uAm.error && (
        <div
          className="alert alert-success alert-dismissible fade show mt-20 col-12"
          role="alert"
        >
          Successfully {origin === 'new' ? 'created' : 'updated'}{' '}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
      )}
      {uAm.loading && (
        <div className="circular-loader-container">
          <div className="circular-loader"></div>
        </div>
      )}
      <div className="container">
        {Array.from(uAm.activities.entries()).map(([key, activity]) => {
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
                    onChange={(e) => uAm.handleInputChange(e, key)}
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
                    onChange={(e) => uAm.handleInputChange(e, key)}
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
                    onChange={(e) => uAm.handleInputChange(e, key)}
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
                    onChange={(e) => uAm.handleInputChange(e, key)}
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
                    onChange={(e) => uAm.handleInputChange(e, key)}
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
                    onChange={(e) => uAm.handleInputChange(e, key)}
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
                    onChange={(e) => uAm.handleActivityTypeChange(e, key)}
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
                (uAm.activityType.type === 'transportation' &&
                  uAm.activityType.key === key)) && (
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
                        onChange={(e) => uAm.handleInputChange(e, key)}
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
                            uAm.handleInputChange(
                              {
                                target: {
                                  name: 'transportation.arrivalTime',
                                  value: e.target.value,
                                },
                              },
                              key,
                            );
                          }

                          uAm.handleInputChange(e, key);
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
                        onChange={(e) => uAm.handleInputChange(e, key)}
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
                (uAm.activityType.type == 'accommodation' &&
                  uAm.activityType.key == key)) && (
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
                        onChange={(e) => uAm.handleInputChange(e, key)}
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
                        onChange={(e) => uAm.handleInputChange(e, key)}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="remove-activity">
                <Trash2Icon onClick={() => uAm.removeActivity(key)} />
              </div>
            </form>
          );
        })}

        {Array.from(uAm.activities.entries()).length === 0 && (
          <div className="flex justify-content-center">No Activities</div>
        )}
      </div>
    </>
  );
}
