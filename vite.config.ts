import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/_redirects",
          dest: ".", // Salin ke root dist saat build
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@pages": path.resolve(__dirname, "./client/pages"),
      "@components": path.resolve(__dirname, "./client/components"),
      "@contexts": path.resolve(__dirname, "./client/contexts"),
    },
  },
  build: {
    outDir: "dist/spa",
    emptyOutDir: true,
  },
  base: "/",
});
