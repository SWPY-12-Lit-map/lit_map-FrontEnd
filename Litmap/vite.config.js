import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.litmap.store',
        changeOrigin: true,
        secure: false, // 필요한 경우 SSL 인증서가 없는 백엔드 서버를 처리하기 위해 사용
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
