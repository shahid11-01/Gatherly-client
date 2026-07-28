import api from "../api/axios";
import { EventImageResponse } from "../types/event";

export async function uploadEventImages(
    eventId:number,
    imageUris: string[],
): Promise<EventImageResponse[]> {

    const formData = new FormData();
    imageUris.forEach((uri,index) => {
        const fileName = uri.split("/").pop() ?? `image_${index}.jpg`;
        const ext = fileName.split(".").pop()?.toLowerCase() ?? "jpg";
        const mimeType = ext === "png" ? "image/png" : "image/jpeg";

        //파일 shape
        formData.append("images",{
            uri,
            name: fileName,
            type: mimeType,
        } as any);

    });

    const response = await api.post(`/event/${eventId}/images`, formData, {
        headers: {"Content-Type": "multipart/form-data"},
    });
    return response.data;
    
}