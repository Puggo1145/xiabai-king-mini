<script setup lang="ts">
import cusAvatar from '@/components/ui/cus-avatar.vue';

const handleUserClick = () => {
    uni.navigateTo({
        url: '/pages/settings/index',
    });
};
</script>

<template>
    <view @click="handleUserClick" class="mt-2">
        <cus-avatar className="ml-4" />
    </view>
</template>
