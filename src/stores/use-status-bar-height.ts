import { defineStore } from 'pinia'

export const useStatusBarHeightStore = defineStore('statusBarHeight', {
  state: () => ({
    statusBarHeight: 0
  }),
  actions: {
    setStatusBarHeight(height: number) {
      this.statusBarHeight = height
    }
  },
})
