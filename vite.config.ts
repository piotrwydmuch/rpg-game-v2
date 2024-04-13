import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    watch: {
      /*  HotReload not working because I am using WSL2:  
          https://vitejs.dev/config/server-options.html#server-watch 

          Note that usePolling leads to high CPU utilization.
      */
      usePolling: true,
    }
  },
  resolve: {
    alias: {
      '@features': path.resolve(__dirname, './src/features'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
