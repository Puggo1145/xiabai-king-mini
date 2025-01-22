import { defineStore } from "pinia";
import type { UninitializedUser } from "@/types/user";
import { checkSignInStatus, signUp, signIn } from "@/apis/auth";

export const useUserStore = defineStore("user", {
    state: () => ({
        openid: null,
        username: null,
        avatarUrl: null,
        totalGames: 0,
        totalWins: 0,
        totalScore: 0,
        isOnline: false,
        currentRoomId: null,
        lastLoginAt: null,
    }) as UninitializedUser,
    actions: {
        async checkSignInStatus() {
            const user = await checkSignInStatus();
            this.$state = user;
        },
        async signUp(params: Parameters<typeof signUp>[0]) {
            const user = await signUp(params);
            this.$state = user;
        },
        async signIn(params: Parameters<typeof signIn>[0]) {
            const user = await signIn(params);
            this.$state = user;
        },
    },
});
