import api from "../api/axios";

export interface ParticipantResponse {
    participantId: number;
    userId: number;
    userName: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    requestedAt: string;
}
export  async function joinRequest(eventId: number):
Promise<void>{
    await api.post(`/participant/join/${eventId}`);

};

export async function getParticipants(eventId:number): Promise<ParticipantResponse[]> {
    const response = await api.get(`/participant/participants/${eventId}`);
    return response.data;   
}

export async function approveRequest(participantUserId:number, eventId: number):Promise<void> {
    await api.patch(`/participant/approve/${participantUserId}/${eventId}`);
}

export async function rejectRequest(participantUserId:number, eventId:number):Promise<void> {
    await api.patch(`/participant/reject/${participantUserId}/${eventId}`);

}