import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),commonjs()],
  define:{
    "global":{}
  }
  // optimizeDeps: {
  //   include: ['aws-amplify'],
  //   // exclude: ['@aws-sdk/*'],
  // },
})

// ,'@aws-amplify/api', '@aws-amplify/core'