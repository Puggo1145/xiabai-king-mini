<script setup lang="ts">
import { ChevronRight } from '@/constants/icons';

const props = withDefaults(defineProps<{
    title: string;
    backgroundImageSrc: string;
    className?: string;
}>(), {
    backgroundImageSrc: '',
    className: ''
});
</script>

<template>
    <view 
        :class="props.className" 
        class="w-[330px] h-[394px] bg-secondary rounded-[42px] p-8"
    >
        <view class="flex items-center">
            <text class="text-4xl font-smiley">
                {{ props.title }}
            </text>
            <image
                :src="ChevronRight"
                class="size-9"
            />
        </view>
    </view>
</template>
