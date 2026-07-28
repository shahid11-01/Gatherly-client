import api from "../api/axios";
import { CreateEventRequest, EventResponse } from '../types/event';


//이벤트 생성
export const createEvent = async (eventData: CreateEventRequest):
  Promise<EventResponse> => {
    const response = await api.post("/event/create",eventData);
    return response.data;
  };

//이벤트 수정하기
export const updateEvent = async(eventData:CreateEventRequest, eventId: number):
  Promise<EventResponse> => {
    const response = await api.put(`/event/${eventId}`, eventData);
    return response.data;
};
//이벤트 삭제하기
export const deleteEvent = async(eventId: number):
  Promise<void> => {
    const response = await api.delete(`/event/${eventId}`);
    return response.data;
};


