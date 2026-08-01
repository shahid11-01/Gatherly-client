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

//호스트가 승인되 참가자를 삭제하려고
export async function deleteParticipant(participantUserId:number, eventId:number): Promise<void> {
    await api.patch(`/participant/deleteParticipant/${participantUserId}/${eventId}`);
}

//참가자 이벤트에서 나가
export async function leaveEvent(eventId:number): Promise<void> {
    await api.delete(`/participant/leaveEvent/${eventId}`);
    
}
//참가자 요청을 취소하기
export async function cancelRequest(eventId:number): Promise<void> {
    await api.delete(`/participant/cancel/${eventId}`);
    
}
