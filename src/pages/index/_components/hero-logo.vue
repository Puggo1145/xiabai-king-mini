<script setup lang="ts">
import cusBadge from '@/components/ui/cus-badge.vue';
</script>

<template>
    <view class="flex flex-col items-center justify-center">
        <text class="text-[#f2c255] text-8xl font-smiley font-bold text-center tracking-wider mt-6 
            [text-shadow:_-3px_-3px_0_#000000,_3px_-3px_0_#000000,_-3px_3px_0_#000000,_3px_3px_0_#000000]">
            瞎掰王
        </text>
        <cus-badge
            variant="secondary"
            size="lg"
            class="-mt-3 -rotate-6"
            class-name="border-2 border-black text-xl"
        >
            online
        </cus-badge>
    </view>
</template>
