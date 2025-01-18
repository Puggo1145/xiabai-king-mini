<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  className: '',
  disabled: false,
  loading: false
})

const variantStyles = computed(() => {
  const styles: Record<string, string> = {
    default: 'bg-primary text-primary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'border border-input bg-background',
    secondary: 'bg-secondary text-secondary-foreground',
    ghost: '',
    link: 'text-primary underline-offset-4'
  }
  return styles[props.variant]
})

const sizeStyles = computed(() => {
  const styles: Record<string, string> = {
    default: 'h-14 w-full px-4 py-2 text-base',
    sm: 'h-9 w-full rounded-lg px-3 text-sm',
    lg: 'h-16 w-full px-8 text-lg',
    icon: 'h-12 w-12'
  }
  return styles[props.size]
})

const baseStyles = computed(() => {
  return [
    'inline-flex items-center justify-center rounded-2xl font-medium ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50'
  ].join(' ')
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :disabled="disabled || loading"
    :class="[baseStyles, variantStyles, sizeStyles, className]"
    hover-class="button-hover"
    hover-stay-time="100"
    @click="handleClick"
  >
    <view
      v-if="loading"
      class="mr-2 h-4 w-4 animate-spin"
    >
      <!-- 加载图标 -->
      <view class="i-lucide-loader-2 size-4" />
    </view>
    <slot />
  </button>
</template>

<style>
.button-hover {
  filter: brightness(0.8);
}
</style>