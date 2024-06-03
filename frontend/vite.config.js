import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets:"/src/assets",
      components: "/src/components",
      store: "/src/store",
      api: "/src/api",
      midleware: "/src/utils/midleware",
      storage: "/src/utils/storage",
      hooks: "/src/hooks",
    },
  },
})
