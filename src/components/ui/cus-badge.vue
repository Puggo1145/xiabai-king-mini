<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  className: ''
})

const variantStyles = computed(() => {
  const styles: Record<string, string> = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground border border-input hover:bg-accent hover:text-accent-foreground'
  }
  return styles[props.variant]
})

const sizeStyles = computed(() => {
  const styles: Record<string, string> = {
    default: 'rounded-full px-2.5 py-0.5 text-xs',
    sm: 'rounded-full px-2 py-px text-xs',
    lg: 'rounded-full px-3 py-1 text-sm'
  }
  return styles[props.size]
})
</script>

<template>
  <view
    class="inline-flex items-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    :class="[variantStyles, sizeStyles, props.className]"
  >
    <slot />
  </view>
</template>
