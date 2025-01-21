<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({
  options: {
    virtualHost: true
  }
})

interface Props {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'default' | 'lg' | 'xl'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  alt: '',
  fallback: '',
  size: 'default',
  className: ''
})

const hasError = ref(false)

const sizeStyles = computed(() => {
  const styles: Record<string, string> = {
    sm: 'size-8 text-xs',
    default: 'size-12 text-base',
    lg: 'size-16 text-lg',
    xl: 'size-24 text-xl'
  }
  return styles[props.size]
})

const baseStyles = computed(() => {
  return [
    'relative shrink-0 overflow-hidden rounded-full',
    'bg-gray-200'
  ].join(' ')
})

const getFallbackText = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const handleError = () => {
  hasError.value = true
}
</script>

<template>
  <view :class="[baseStyles, sizeStyles, props.className]">
    <image
      v-if="src && !hasError"
      :src="src"
      :alt="alt"
      mode="aspectFill"
      class="h-full w-full object-cover"
      @error="handleError"
    />
    <view
      v-else
      class="flex h-full w-full items-center justify-center font-medium text-primary"
    >
      {{ fallback ? getFallbackText(fallback) : alt?.[0]?.toUpperCase() }}
    </view>
    <text class="text-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        📷
    </text>
  </view>
</template> 