import { http } from "@/utils/request";
import type { User } from "@/types/user";

export const checkSignInStatus = async () => {
    return await http.get<User>("/auth/check-sign-in-status");
};

interface SignInParams {
    code: string;
}
interface SignInResponse {
    user: User;
    access_token: string;
}
export const signIn = async (data: SignInParams) => {
    const res = await http.post<SignInResponse>("/auth/wx/sign-in", data);
    uni.setStorageSync("access_token", res.access_token);
    return res.user;
};

interface SignUpParams {
    code: string;
    username: string;
    avatarUrl?: string;
}
interface SignUpResponse {
    user: User;
    access_token: string;
}
export const signUp = async (data: SignUpParams) => {
    const res = await http.post<SignUpResponse>("/auth/wx/sign-up", data);
    uni.setStorageSync("access_token", res.access_token);
    return res.user;
};

export const getWxCode = async () => {
    try {
        const res = await uni.login();
        return res.code;
    } catch (error) {
        console.log(error);

        uni.showToast({
            title: '获取微信信息失败',
            icon: 'error'
        });
        return null;
    }
};