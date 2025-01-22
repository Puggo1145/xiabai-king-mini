import { NonNullable } from "./util";

export interface UninitializedUser {
    openid: string | null;
    username: string | null;
    avatarUrl: string | null;
    totalGames: number;
    totalWins: number;
    totalScore: number;
    isOnline: boolean;
    currentRoomId: string | null;
    lastLoginAt: string | null;
}

export type User = {
    [K in keyof UninitializedUser]: NonNullable<UninitializedUser[K]>;
}
