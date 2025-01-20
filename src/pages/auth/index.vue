<script setup lang="ts">
import cusPage from '@/components/ui/cus-page.vue';
import cusAvatar from '@/components/ui/cus-avatar.vue';
import cusInput from '@/components/ui/cus-input.vue';
import cusButton from '@/components/ui/cus-button.vue';
</script>

<template>
    <cus-page
        header-type="nav"
        padding-x="16"
    >
        <view class="flex flex-col items-center gap-y-8
        w-full h-full py-6">
            <text class="text-4xl font-smiley text-center">
                创建个人信息
            </text>
            <cus-avatar
                size="xl"
                className="border-secondary border-solid border-2"
            />
            <view class="w-full flex flex-col gap-y-2">
                <text class="ml-4 text-sm text-foreground/50">
                    用户名
                </text>
                <cus-input placeholder="名字也是可以瞎掰的 (1-10个字)" />
            </view>
            <cus-button
                size="lg"
                className="w-full mt-auto"
            >
                搞定
            </cus-button>
        </view>
    </cus-page>
</template>
