export interface CreateEventRequest {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    maxParticipants: number;
    category: EventCategory;
    
}

export interface EventResponse{ 
    eventId: number;
    title: string;
    description: string;
    startDate: string;
    participantCount?: number;
    imageUrls:string[];
    endDate: string;
    maxParticipants: number;
    category: EventCategory;
    hostName:string;
}

export interface EventImageResponse {
    id: number;
    url: string;
}


export type EventCategory =
  | "MUSIC"
  | "SPORTS"
  | "OUTDOOR"
  | "TECH"
  | "FOOD_AND_DRINK"
  | "ARTS"
  | "GAMING"
  | "COOKING"
  | "EDUCATION"
  | "OTHER";

export interface EventAllResponse<T> {
    events: T[];
    page: number;
    size: number;
    total: number;
    totalPages: number;
    last: boolean;
}