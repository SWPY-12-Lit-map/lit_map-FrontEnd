import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.litmap.store",
        changeOrigin: true,
        secure: false, // 필요한 경우 SSL 인증서가 없는 백엔드 서버를 처리하기 위해 사용
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
