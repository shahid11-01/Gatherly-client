import api from "../api/axios";


export async function updateUser(data: {userName: string, userPhone: string, email: string}): Promise<void> {
    await api.put("/auth/update", data);
}

export async function changePassword(data: {currentPassword: string, newPassword: string}): Promise<void> {
    await api.post("/auth/changePassword", data);

}

export async function verifyPassword(data: string): Promise<void> {
    await api.post("/auth/verify", {password: data});
}

export async function uploadProfileImage(uri: string): Promise<string> {
    const formData = new FormData();
    const name = uri.split("/").pop() || "profile.jpg";
    formData.append("image", {uri, name, type: "image/jpeg"} as any);
    const res = await api.post("/auth/user/me/image", formData, {
        headers: {"Content-Type": "multipart/form-data"},
    });
    return res.data; //전체 url
}