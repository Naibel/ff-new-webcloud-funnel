import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@ovhcloud/ods-react/styles': path.resolve(__dirname, 'node_modules/@ovhcloud/ods-react/src/style'),
    },
  },
})
