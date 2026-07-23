import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

//토큰 저장
export const saveTokens = async(
    accessToken: string,
    refreshToken: string
)=> {
    await SecureStore.setItemAsync
    (ACCESS_TOKEN_KEY, accessToken);

    await SecureStore.setItemAsync
    (REFRESH_TOKEN_KEY, refreshToken);
};

export const getAccessToken = async(): Promise<string | null>=>{
    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = async():Promise<string | null>=>{
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
};

export const removeTokens = async():Promise<void> => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);

    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);

};
//로그인 여부 확인
export const hasToken = async():Promise<boolean>=> {
    const token = await getAccessToken();
    return token !== null;
};
