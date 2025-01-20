<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  options: {
    virtualHost: true
  }
})

interface Props {
  type?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  error?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  className: '',
  error: false
})

const baseStyles = computed(() => {
  return [
    // 基础样式
    'w-full h-16 px-6 rounded-full',
    'bg-secondary text-base text-foreground placeholder:text-gray-400',
    'border border-input transition-colors',
    // 状态样式
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    // 错误状态
    props.error ? 'border-destructive focus:ring-destructive' : ''
  ].join(' ')
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [event: Event]
  input: [event: Event]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}

const handleChange = (event: Event) => {
  emit('change', event)
}
</script>

<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="[baseStyles, className]"
    @input="handleInput"
    @change="handleChange"
  />
</template> 