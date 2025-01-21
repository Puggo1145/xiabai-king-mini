<script setup lang="ts">
import { ref, computed } from 'vue';
import gameOptionCard from './game-option-card.vue';

const gameOptions = [
    {
        title: '加入房间',
        backgroundImageSrc: '',
        className: ''
    },
    {
        title: '创建房间',
        backgroundImageSrc: '',
        className: 'bg-yellow-500'
    }
]

const currentIndex = ref(0);
const touchStartX = ref(0);
const touchDeltaX = ref(0);
const isDragging = ref(false);

// 计算滑动进度，范围 -1 到 1
const slideProgress = computed(() => {
    if (!isDragging.value) return 0;
    return Math.max(-1, Math.min(1, touchDeltaX.value / 150));
});

const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    touchStartX.value = e.touches[0].clientX;
    isDragging.value = true;
};

const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging.value) return;
    touchDeltaX.value = e.touches[0].clientX - touchStartX.value;
};

const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging.value = false;
    // 如果滑动超过一定距离，切换卡片
    if (Math.abs(touchDeltaX.value) > 75) {
        if (touchDeltaX.value > 0 && currentIndex.value > 0) {
            currentIndex.value--;
        } else if (touchDeltaX.value < 0 && currentIndex.value < gameOptions.length - 1) {
            currentIndex.value++;
        }
    }
    touchDeltaX.value = 0;
};

const getCardStyle = (index: number) => {
    const diff = index - currentIndex.value;
    const baseStyle = {
        transform: `
            rotate(${diff > 0 ? 20 : diff < 0 ? -20 : 0}deg)
            translateX(${diff > 0 ? 200 : diff < 0 ? -200 : 0}px)
            translateY(${diff !== 0 ? -96 : 0}px)
            scale(${diff !== 0 ? 0.9 : 1})
        `,
        zIndex: diff === 0 ? 10 : 0,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: Math.abs(diff) <= 1 ? 1 : 0
    };
    
    // 如果不是拖动状态，直接返回基础样式
    if (!isDragging.value) return baseStyle;
    
    const progress = slideProgress.value;
    const absProgress = Math.abs(progress);
    
    // 计算移动进度
    const moveProgress = absProgress < 0.5 ? 
        (diff === 0 ? progress * 2 : diff) : // 前半段
        (diff === 0 ? (progress > 0 ? 1 : -1) : // 当前卡片后半段
         diff === 1 && progress < 0 ? 1 + (progress + 0.5) * 2 : // 右卡片后半段
         diff === -1 && progress > 0 ? -1 + (progress - 0.5) * 2 : // 左卡片后半段
         diff); // 其他情况保持原位
    
    // z-index 切换逻辑
    const zIndexProgress = Math.abs(progress - 0.5);
    const shouldSwitchZIndex = zIndexProgress < 0.1;
    
    return {
        transform: `
            rotate(${diff === 0 ? progress * 20 : diff > 0 ? 20 * (1 + (progress < 0 ? progress : 0)) : -20 * (1 - (progress > 0 ? progress : 0))}deg)
            translateX(${moveProgress * 200}px)
            translateY(${diff === 0 ? -absProgress * 20 : -96 - absProgress * 20}px)
            scale(${diff === 0 ? 1 - absProgress * 0.1 : 0.9 + absProgress * 0.1})
        `,
        zIndex: shouldSwitchZIndex ? 5 : (absProgress > 0.5 ? (diff === 0 ? 0 : 10) : (diff === 0 ? 10 : 0)),
        transition: 'none',
        opacity: Math.abs(diff) <= 1 ? 1 : 0
    };
};
</script>

<template>
    <view class="relative mt-16">
        <text class="z-50 absolute left-4 top-4 text-5xl font-smiley">
            选择游戏方式
        </text>
        <view 
            class="h-[600px] relative touch-none overflow-hidden"
            @touchstart.prevent="handleTouchStart"
            @touchmove.prevent="handleTouchMove"
            @touchend.prevent="handleTouchEnd"
            @touchcancel.prevent="handleTouchEnd"
        >
            <view
                v-for="(option, index) in gameOptions"
                :key="index"
                class="absolute left-6 top-28 w-[330px] origin-center touch-none"
                :style="getCardStyle(index)"
            >
                <game-option-card
                    :title="option.title"
                    :className="option.className"
                />
            </view>
        </view>
    </view>
</template>

<style>
.touch-none {
    touch-action: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
}
</style>
