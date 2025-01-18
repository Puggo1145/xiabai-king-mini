<script setup lang="ts">
import { computed, ref, withDefaults } from 'vue';
import { onMounted } from 'vue';

interface Props {
    // 内置 nav bar 样式: default 只令页面在状态栏之下，nav 会显示一个包含返回按钮的 header
    headerType?: "none" | "default" | "nav";
    // 页面两侧边距 => 为了保证页面高度一致使用了 overflow-hidden，因此会裁切掉部分内容，需要酌情使用
    paddingX?: number | string;
    className?: string;
    backPage?: string;
}
const props = withDefaults(defineProps<Props>(), {
    headerType: "default",
    paddingX: 0,
    className: ""
});

const statusBarHeight = ref(0);
const paddingTop = computed(() => {
    return props.headerType === "none"
        ? '0px'
        : statusBarHeight.value.toString() + 'px'
});
onMounted(() => {
    // 处理 status bar height
    statusBarHeight.value = uni.getMenuButtonBoundingClientRect().top - 15;
});

const goBack = () => {
    if (props.backPage) {
        uni.navigateTo({
            url: props.backPage
        })
    } else {
        uni.navigateBack()
    }
}
</script>

<template>
    <view
        class="w-screen h-screen flex flex-col fixed"
        :style="{ paddingTop: paddingTop }"
    >
        <!-- nav bar -->
        <view
            v-if="props.headerType === 'nav'"
            class="w-full h-[60px] flex px-4 items-center"
        >
            <view
                class="overflow-hidden size-6"
                @click="goBack"
            >
                <!-- <image :src="icons.back" class="size-full" /> -->
                <text>返回</text>
            </view>
        </view>
        <!-- 页面 -->
        <view
            class="w-screen overflow-y-hidden flex-1 flex flex-col"
            :class="props.className"
            :style="{
                paddingLeft: props.paddingX + 'px',
                paddingRight: props.paddingX + 'px',
            }"
        >
            <slot />
        </view>
    </view>
</template>