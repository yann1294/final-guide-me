import { TourDTO } from '@/dto/tour.dto';
import { CONTEXT } from '@/lib/utils/contextUtils';
import { tourTestData } from '@/lib/utils/test.data';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dispatch, SetStateAction, useState } from 'react';

export default function CreateDialog({
  context,
  addResource,
  setAddResource,
}: {
  context: CONTEXT;
  addResource: boolean;
  setAddResource: Dispatch<SetStateAction<boolean>>;
}) {
  const [tour, setTour] = useState<TourDTO>(tourTestData[0] as TourDTO);

  const handleInputChange = (
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  };
  return (
    <Dialog
      visible={addResource}
      style={{ width: '32rem' }}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      header="Create A New Tour"
      modal
      resizable
      onHide={() => setAddResource(false)}
      className="create-dialog"
      footer={() => (
        <div className="field col-md-12">
          <Button label="Save" type="submit" className="mt-3 save-resource" />
        </div>
      )}
    >
      <div className="container">
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
                onChange={handleInputChange}
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
                className="form-control"
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
                onChange={handleInputChange}
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
      </div>
    </Dialog>
  );
}
