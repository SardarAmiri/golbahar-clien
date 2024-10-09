import axios from "axios";
import { BookingType } from "../interfaces/index";

export const createBooking = async (
  data: BookingType
): Promise<BookingType> => {
  const response = await axios.post<BookingType>(
    "/api/bookings/create-booking",
    data
  );
  return response.data;
};

export const getUserBookings = async () => {
  const response = await axios.get("/api/bookings/get-user-bookings");
  return response.data;
};

export const getAllBookings = async () => {
  const response = await axios.get("/api/bookings/get-all-bookings");
  return response.data;
};

export const cancelBooking = async (data: {
  bookingId: string;
}): Promise<{ success: boolean }> => {
  const response = await axios.post<{ success: boolean }>(
    "/api/bookings/cancel-bookings",
    data
  );
  return response.data;
};
