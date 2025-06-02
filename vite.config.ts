import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  define: {
    // Vite's env handling
    'import.meta.env.VITE_PAYHERE_MERCHANT_ID': JSON.stringify(process.env.VITE_PAYHERE_MERCHANT_ID),
    'import.meta.env.VITE_PAYHERE_MERCHANT_SECRET': JSON.stringify(process.env.VITE_PAYHERE_MERCHANT_SECRET),
  },
  server: {
    host: "::",
    port: 8080,
  },
});
