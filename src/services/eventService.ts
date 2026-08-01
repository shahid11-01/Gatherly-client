import api from "../api/axios";
import { CreateEventRequest, EventAllResponse, EventCategory, EventResponse } from '../types/event';


//이벤트 생성
export const createEvent = async (eventData: CreateEventRequest):
  Promise<number> => {
    const response = await api.post<number>("/event/create",eventData);
    return response.data;
    
  };

//이벤트 수정하기
export const updateEvent = async(eventData:CreateEventRequest, eventId: number):
  Promise<void> => {
     await api.put(`event/updateEvent/${eventId}`, eventData);
};

//이벤트 삭제하기
export const deleteEvent = async(eventId: number):
  Promise<void> => {
    const response = await api.delete(`/event/delete/${eventId}`);
    return response.data;
};

// profile: hosted / joined
//인기 있는
export async function getFeatured(page = 0): Promise<EventAllResponse<EventResponse>> {
  const response = await api.get(`/event/featured/${page}`);
  return response.data;
}
//최근 이벤트
export async function getNearby(page =0): Promise<EventAllResponse<EventResponse>> {
  const response = await api.get(`/event/nearby/${page}`);
  return response.data;
}
//카테고리별로
export async function getEvents(page:0, category?: EventCategory):Promise<EventAllResponse<EventResponse>> {
  const response = await api.get(`/event/eventAll/${page}`,  {
    params: category? {category} : {},
  });
  return response.data;
}

export async function getHosted(page=0): Promise<EventAllResponse<EventResponse>> {
  const response = await api.get(`/event/hosted/${page}`);
  return response.data;
  
}

export async function getJoined(page = 0): Promise<EventAllResponse<EventResponse>> {
    const response = await api.get(`/event/joined/${page}`);
    return response.data;
}

export async function getPending(page = 0):Promise<EventAllResponse<EventResponse>> {
  const response = await api.get(`/event/pending/${page}`);
  return response.data;
  
}
//해당 이벤트를 가져오기
export async function getEvent(eventId:number): Promise<EventResponse> {
  const response = await api.get(`/event/${eventId}`);
  return response.data;
  
}


