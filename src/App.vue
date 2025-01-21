<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app';
// stores
import { useStatusBarHeightStore } from '@/stores/use-status-bar-height';

// 初始化获取状态栏高度
onLaunch(() => {
    const statusBarHeightStore = useStatusBarHeightStore();
    statusBarHeightStore.setStatusBarHeight(uni.getMenuButtonBoundingClientRect().top - 15);
});
</script>

<style>
@import './main.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
