export function convertSecondsToDateString(seconds: number): string {
  const date = new Date(seconds * 1000); // Convert seconds to milliseconds
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

export function convertSecondsToDate(seconds: number): Date {
  return new Date(seconds * 1000); // Convert seconds to milliseconds
}


export const timestampToDate = (timestamp: { _seconds: number; _nanoseconds: number }) => {
  const date = new Date(timestamp._seconds * 1000);
  return date.toLocaleString('en-US', {
    weekday: 'long', // Full name of the day (e.g., Monday)
    year: 'numeric',
    month: 'long', // Full name of the month (e.g., January)
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export function getDateValue(
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