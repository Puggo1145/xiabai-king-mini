<script setup lang="ts">
import cusPage from '@/components/ui/cus-page.vue';
import HeroLogo from './_components/hero-logo.vue'
import cusButton from '@/components/ui/cus-button.vue';
import landingBg from '@/static/images/landing-bg.jpeg'
</script>

<template>
    <cus-page padding-x="16">
        <view class="flex flex-col justify-between h-full">
            <HeroLogo />
            <cus-button
                size="lg"
                class-name="mb-12 h-20 !rounded-full tracking-widest font-smiley"
                press-animation
            >
                开始瞎掰
            </cus-button>
        </view>
    </cus-page>
    <image
        :src="landingBg"
        mode="aspectFill"
        class="-z-10 fixed top-0 left-0 w-screen h-screen"
    />
</template>
