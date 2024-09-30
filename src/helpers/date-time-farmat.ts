import dayjs from "dayjs";

export const getDateFormat = (date: string) => {
  return dayjs(date).format("DD MMM YYYY");
};

export const getDateTimeFormat = (date: string) => {
  return dayjs(date).format("DD MMM YYYY hh:mm A");
};

export const formatDateForGoogleCalendar = (date: Date): string => {
  const isoString = date.toISOString();
  return isoString.replace(/-|:|\.\d{3}/g, "");
};

export const formatDateForGoogleCalendarPay = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
};
