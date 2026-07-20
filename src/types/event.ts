export interface CreateEventRequest {
    "title": string;
    "description": string;
    "startDate": string;
    "endDate": string;
    "maxParticipants": number;
    
}

export interface EventResponse{ 
    "eventId": number;
    "title": string;
    "description": string;
    "startDate": string;
    "endDate": string;
    "maxParticipants": number;
}
