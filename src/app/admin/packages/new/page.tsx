'use client';
import CreateActivityComponent from '@/components/admin/CreateActivityComponent';
import ImageUploader from '@/components/admin/ImageUploader';
import TourCard from '@/components/tours/TourCard';
import { TourDTO } from '@/dto/tour.dto';
import { usePackageManagement } from '@/hooks/packages/usePackageManagement';
import { convertSecondsToDate } from '@/lib/utils/dateUtils';
import {
  handleNestedChange,
  handlePackageInputChange,
  handleTourInputChange,
} from '@/lib/utils/formInputHandlers';
import { EyeIcon } from 'lucide-react';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { useState } from 'react';

export default function CreatePackage({
  origin = 'new',
  title = 'Create a New Package',
}: {
  origin: 'new' | 'edit/view';
  title: string;
}) {
  const uPkgM = usePackageManagement(origin);
  const [selectedTours, setSelectedTours] = useState<TourDTO[]>([]);

  let packageInputChangeHandler = (e: any) => {
    return handlePackageInputChange(
      e,
      'text',
      uPkgM.setUpdatedPackageFields,
      uPkgM.setPackage,
    );
  };

  return (
    <div className="container create-form mt-20">
      <h2>{title}</h2>
      {((uPkgM.action === 'creating' && !uPkgM.createPackageError) ||
        (uPkgM.action === 'updating' && !uPkgM.updatePackageError)) && (
        <div
          className="alert alert-success alert-dismissible fade show mt-20"
          role="alert"
        >
          Successfully {uPkgM.action === 'updating' ? 'updated' : 'created'}{' '}
          <strong>{uPkgM.pkg.name}!</strong>.
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => uPkgM.setAction('nothing')}
          ></button>
        </div>
      )}

      {(uPkgM.createPackageError || uPkgM.updatePackageError) && (
        <div
          className="alert alert-danger alert-dismissible fade show mt-20"
          role="alert"
        >
          {uPkgM.createPackageError ?? uPkgM.updatePackageError}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => uPkgM.setAction('nothing')}
          ></button>
        </div>
      )}
      {origin !== 'new' && uPkgM.loading && (
        <div className="circular-loader-container">
          <div className="circular-loader"></div>
        </div>
      )}

      <div className="create-form-section-title  mt-20">Package Details</div>
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
            onChange={packageInputChangeHandler}
            value={uPkgM.pkg?.guide}
            required
          >
            <option value={''} key={'initial'}>
              Assign guide to package
            </option>
            {uPkgM.guides.map((guide) => (
              <option key={guide.uid} value={guide.uid}>
                {guide.firstName} {guide.lastName}
              </option>
            ))}
          </select>
        </div>
        <div
          onClick={
            uPkgM.isCreatingPackage ||
            uPkgM.isUpdatingPackage ||
            uPkgM.updatedPackageFields.size === 0
              ? () => {
                  console.log('Save tour: Not completed');
                }
              : uPkgM.savePackageHandler
          }
          className={
            uPkgM.isCreatingPackage ||
            uPkgM.isUpdatingPackage ||
            uPkgM.updatedPackageFields.size === 0
              ? 'disabled-button'
              : '' + ' save-button add-resource'
          }
        >
          {uPkgM.isCreatingPackage
            ? 'Creating...'
            : uPkgM.isUpdatingPackage
            ? 'Updating...'
            : 'Save Package Details'}
        </div>
      </div>
      <form id="create-tour-form" className="row">
        {/* Package Name */}
        <div className="field col-md-6">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Package Name
            </label>
            <InputText
              className="form-control"
              id="name"
              name="name"
              value={uPkgM.pkg.name}
              onChange={packageInputChangeHandler}
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
              value={uPkgM.pkg.location.name}
              onChange={(e) =>
                handleNestedChange(
                  e,
                  'name',
                  uPkgM.setUpdatedPackageFields,
                  uPkgM.setPackage,
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
              value={uPkgM.pkg.location.city}
              onChange={(e) =>
                handleNestedChange(
                  e,
                  'city',
                  uPkgM.setUpdatedPackageFields,
                  uPkgM.setPackage,
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
              value={uPkgM.pkg.location.country}
              onChange={(e) =>
                handleNestedChange(
                  e,
                  'country',
                  uPkgM.setUpdatedPackageFields,
                  uPkgM.setPackage,
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
              value={uPkgM.pkg.price}
              onValueChange={packageInputChangeHandler}
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
              value={uPkgM.pkg.durationDays}
              onValueChange={packageInputChangeHandler}
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
              value={uPkgM.pkg.discount}
              min={0}
              max={100}
              onValueChange={packageInputChangeHandler}
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
              value={uPkgM.pkg.numberOfSeats}
              onValueChange={packageInputChangeHandler}
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
                origin === 'new' || uPkgM.updatedPackageFields.has('date')
                  ? (uPkgM.pkg.date as Date)
                  : convertSecondsToDate(uPkgM.pkg.date._seconds)
              }
              onChange={packageInputChangeHandler}
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
              checked={uPkgM.pkg.isAvailable}
              onChange={(e) => {
                uPkgM.setPackage((prev) => ({
                  ...prev,
                  isAvailable: e.checked!,
                }));
                // Track which fields have been updated (preserving structure)
                uPkgM.setUpdatedPackageFields((prevFields) =>
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
              value={uPkgM.pkg.description}
              onChange={packageInputChangeHandler}
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
      {/* Tours */}
      <div className="tour-activities-actions mt-40 action-buttons">
        <div className="create-form-section-title disable-hover">
          Package tours ({selectedTours.length.toString().padStart(2, '0')})
        </div>
        <div className="flex disable-hover">
          <div
            className={
              'add-resource ' + (selectedTours.length === 0 ? 'disabled-button' : '')
            }
            onClick={() => {
              if (selectedTours.length > 0) {
                uPkgM.saveTours(selectedTours.map((tour) => tour.id) as string[]);
              }
            }}
          >
            {false ? 'Saving...' : 'Save Tours'}
          </div>
          <MultiSelect
            value={selectedTours}
            filter
            filterBy="name"
            filterPlaceholder="Search Tours"
            selectAll={false}
            maxSelectedLabels={1}
            onChange={(e) => {
              console.log('Tours: ', e.value);
              setSelectedTours(e.value);
              console.log('Selected Tours: ', selectedTours);
            }}
            // panelHeaderTemplate={() => (<h5 className='p-multiselect-header'>Tours</h5>)}
            options={uPkgM.tours}
            itemTemplate={(option) => (
              <div className="tour-item">
                <div>{option.name}</div>
                {/* <a href="#" className="view-tour">
                  <EyeIcon size="20px" />
                </a> */}
              </div>
            )}
            optionLabel="name"
            placeholder="Select Tours"
            className="add-resource"
            style={{ minWidth: '14rem' }}
          />
        </div>
      </div>
      <div className="row photos-container">
        {
          // Display the selected tours
          selectedTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))
        }
        {uPkgM.pkg.tours.length === 0 && selectedTours.length === 0 && (
          <div className="flex justify-content-center">No Tours</div>
        )}
      </div>
      {/* Uploading photos */}
      <ImageUploader page="package" origin={origin} />
    </div>
  );
}
