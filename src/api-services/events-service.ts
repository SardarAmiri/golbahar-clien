import axios from "axios";
import { EventType } from "../interfaces/index";
import { ApiResponse } from "../interfaces/index";

export const createEvent = async (data: EventType): Promise<EventType> => {
  const response = await axios.post<EventType>(
    "/api/events/create-event",
    data
  );
  return response.data;
};

export const getEvents = async (): Promise<{ data: EventType[] }> => {
  const response = await axios.get<{ data: EventType[] }>(
    "/api/events/get-events"
  );
  return response.data;
};

export const getEventById = async (
  id: string
): Promise<ApiResponse<EventType>> => {
  const response = await axios.get<ApiResponse<EventType>>(
    `/api/events/get-event/${id}`
  );
  return response.data;
};

export const updateEvent = async (
  id: string,
  data: EventType
): Promise<EventType> => {
  const response = await axios.put<EventType>(
    `/api/events/update-event/${id}`,
    data
  );
  return response.data;
};

export const deleteEvent = async (
  id: string
): Promise<{ success: boolean }> => {
  const response = await axios.delete<{ success: boolean }>(
    `/api/events/delete-event/${id}`
  );
  return response.data;
};
