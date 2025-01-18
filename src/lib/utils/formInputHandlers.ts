import { ActivityDTO, TourDTO } from "@/dto/tour.dto";
import { InputNumberValueChangeEvent } from "primereact/inputnumber";
import { Dispatch, SetStateAction } from "react";

export function handleFileUpload(event: any, setPhotos: Dispatch<SetStateAction<Map<number, { file: File; dataString: string }>>>, photos: Map<number, { file: File; dataString: string }>) {
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

export const handleTourInputChange = (
    e: any,
    origin: 'number' | 'text' = 'text',
    setUpdatedTourFields: Dispatch<SetStateAction<Set<string>>>,
    setTour: Dispatch<SetStateAction<TourDTO>>
) => {
    // Track which fields have been updated (preserving structure)
    setUpdatedTourFields((prevFields) => new Set(prevFields).add(name));
    const { name, value } = e.target;
    setTour((prev) => ({ ...prev, [name]: value }));
};

export const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof TourDTO['location'],
    setUpdatedTourFields: Dispatch<SetStateAction<Set<string>>>,
    setTour: Dispatch<SetStateAction<TourDTO>>
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
export const handleInputChange = (
    e: any, key: number,
    setUpdatedActivitiesFields: Dispatch<SetStateAction<Set<string>>>,
    setActivities: Dispatch<SetStateAction<Map<number, ActivityDTO>>>
) => {
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

export const generateUpdatedData = (origin: "tour" | "activities", updatedFields: Set<string>, dataSource: TourDTO | Map<number, ActivityDTO>) => {
    const updated = {}; // Holds the final nested structure
    const source = origin === 'tour' ? dataSource : Object.fromEntries((dataSource as Map<number, ActivityDTO>).entries());

    updatedFields.forEach((path) => {
        const keys = path.split('.'); // Split the path into keys
        let currentSource: any = source; // Traverse source object to get value
        let currentUpdated: any = updated; // Traverse updated object to build structure

        keys.forEach((key, index) => {
            // Fetch the value from the source object
            if (currentSource && key in currentSource) {
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
