import { modifyElement } from "@/components/admin/FilterTemplates";
import { ColumnProps } from "primereact/column";
import { timestampToDate } from "../utils/dateUtils";
import { CopyIcon } from "lucide-react";

export const activityColumnConfigs = [
  {
    field: 'id',
    header: 'ID',
    sortable: true,
    body: (data) =>
      modifyElement(
        <CopyIcon
          onClick={() => {
            navigator.clipboard.writeText(data.id);
          }}
          size="18px"
        />,
        'Copy activity ID',
      ),
  },
  { field: 'name', header: 'Tour Name', sortable: true },
  { field: 'durationHours', header: 'Duration (Hours)', sortable: true },
  { field: 'location.name', header: 'Location Name', sortable: true },
  { field: 'location.city', header: 'City', sortable: true },
  { field: 'location.country', header: 'Country', sortable: true },
  { field: 'location.address', header: 'Address', sortable: true },
  { field: 'transportation.type', header: 'Transport Type', sortable: true },
  {
    field: 'transportation.arrivalTime',
    header: 'Arrival Time',
    sortable: true,
    body: (data) => "timestampToDate(data.transportation.arrivalTime)",
    style: { maxWidth: '200px' },
  },
  {
    field: 'transportation.departureTime',
    header: 'Departure Time',
    sortable: true,
    body: (data) => "timestampToDate(data.transportation.departureTime)",
    style: { maxWidth: '200px' },
  },
  { field: 'accommodation.type', header: 'Accommodation Type', sortable: true },
  { field: 'accommodation.name', header: 'Accommodation Name', sortable: true },
] as ColumnProps[];
