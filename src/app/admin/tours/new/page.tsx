"use client";
import CreateActivityComponent from "@/components/admin/CreateActivityComponent";
import ImageUploader from "@/components/admin/ImageUploader";
import { useTourManagement } from "@/hooks/tours/useTourManagement";
import { convertSecondsToDate } from "@/lib/utils/dateUtils";
import {
  handleNestedChange,
  handleTourInputChange,
} from "@/lib/utils/formInputHandlers";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

function isErrorObject(err: unknown): err is Error {
  return (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as any).message === "string"
  );
}

interface PageProps {
  searchParams?: {
    origin?: "new" | "edit/view";
    title?: string;
  };
}

export default function CreateTour({ searchParams }: PageProps) {
  const origin = searchParams?.origin === "edit/view" ? "edit/view" : "new";
  const title = searchParams?.title || "Create a New Tour";
  const uTm = useTourManagement(origin);

  let tourInputChangeHandler = (e: any) => {
    return handleTourInputChange(
      e,
      "text",
      uTm.setUpdatedTourFields,
      uTm.setTour,
    );
  };

  // Grab whichever error is present
  const rawError = uTm.createTourError ?? uTm.updateTourError;

  // Narrow it down to a string if we can
  let errorMessage: string | undefined;

  if (typeof rawError === "string") {
    errorMessage = rawError;
  } else if (isErrorObject(rawError)) {
    errorMessage = rawError.message;
  }

  return (
    <div className="container create-form mt-20">
      <h2>{title}</h2>
      {((uTm.action === "creating" && !uTm.createTourError) ||
        (uTm.action === "updating" && !uTm.updateTourError)) && (
        <div
          className="alert alert-success alert-dismissible fade show mt-20"
          role="alert"
        >
          Successfully {uTm.action === "updating" ? "updated" : "created"}{" "}
          <strong>{uTm.tour.name}!</strong>.
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => uTm.setAction("nothing")}
          ></button>
        </div>
      )}

      {(uTm.createTourError || uTm.updateTourError) && (
        <div
          className="alert alert-danger alert-dismissible fade show mt-20"
          role="alert"
        >
          {typeof uTm.createTourError === "string"
            ? uTm.createTourError
            : (uTm.createTourError?.message ??
              (typeof uTm.updateTourError === "string"
                ? uTm.updateTourError
                : uTm.updateTourError?.message))}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => uTm.setAction("nothing")}
          ></button>
        </div>
      )}
      {origin !== "new" && uTm.fetchingTourData && (
        <div className="circular-loader-container">
          <div className="circular-loader"></div>
        </div>
      )}

      <div className="create-form-section-title  mt-20">Tour Details</div>
      <div className="action-buttons mb-0 mt-20 justify-content-between align-item-center">
        <div
          style={{
            border: "1px solid #ced4da",
            padding: "0",
            paddingLeft: "10px",
            backgroundColor: "#6BC8B4",
          }}
          className="guide-area"
        >
          <span style={{ color: "white", fontWeight: "bold" }}>Guide</span>{" "}
          <select
            style={{
              height: "40px",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            className="form-select m-0 w-auto"
            name="guide"
            onChange={tourInputChangeHandler}
            value={uTm.tour?.guide}
            required
          >
            <option value={""} key={"initial"}>
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
          onClick={
            uTm.isCreatingTour ||
            uTm.isUpdatingTour ||
            uTm.updatedTourFields.size === 0
              ? () => {
                  console.log("Save tour: Not completed");
                }
              : uTm.saveTourHandler
          }
          className={
            uTm.isCreatingTour ||
            uTm.isUpdatingTour ||
            uTm.updatedTourFields.size === 0
              ? "disabled-button"
              : "" + " save-button add-resource"
          }
        >
          {uTm.isCreatingTour
            ? "Creating..."
            : uTm.isUpdatingTour
              ? "Updating..."
              : "Save Tour Details"}
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
                  "name",
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
                  "city",
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
                  "country",
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
                origin === "new" || uTm.updatedTourFields.has("date")
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
                  new Set(prevFields).add("isAvailable"),
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
                let desc = document.getElementById("description");
                if (desc) {
                  desc.style.height = "auto";
                  desc.style.height = desc.scrollHeight + "px";
                }
              }}
              required
            ></textarea>
          </div>
        </div>
      </form>
      {/* Activities */}
      <CreateActivityComponent origin={origin} />

      {/* Uploading photos */}
      <ImageUploader origin={origin} />
    </div>
  );
}
