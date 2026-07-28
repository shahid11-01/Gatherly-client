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
    endDate: string;
    maxParticipants: number;
    category: EventCategory;
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
