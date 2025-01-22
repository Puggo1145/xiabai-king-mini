<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app';
import { initiator } from '@/utils/initiator';

onLaunch(() => {
    initiator.init();
});
</script>

<style>
@import './main.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
