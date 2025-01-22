import { useStatusBarHeightStore } from "@/stores/use-status-bar-height";
import { useUserStore } from "@/stores/use-user";

class Initiator {
    private static instance: Initiator;
    private constructor() {}

    public static getInstance(): Initiator {
        if (!Initiator.instance) {
            Initiator.instance = new Initiator();
        }
        return Initiator.instance;
    }

    public async init() {
        this.getStatusBarHeight();
        await this.checkSignInStatus();
    }

    private getStatusBarHeight() {
        const statusBarHeight = uni.getMenuButtonBoundingClientRect().top - 15;
        useStatusBarHeightStore().setStatusBarHeight(statusBarHeight);
    }

    private async checkSignInStatus() {
        const token = uni.getStorageSync("access_token");
        if (!token) {
            uni.switchTab({ url: "/pages/index/index" });
            return
        }

        await useUserStore().checkSignInStatus();
    }
}

export const initiator = Object.freeze(Initiator.getInstance());
