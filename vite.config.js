// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/Vig-frontend-demos/",
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        PC: resolve(__dirname, "PC/index.html"),
        RNC: resolve(__dirname, "RNC/index.html"),
        TNV: resolve(__dirname, "TNV/index.html"),
        CR: resolve(__dirname, "CR/index.html"),
        PS: resolve(__dirname, "PS/index.html"),
        VW: resolve(__dirname, "VW/index.html"),
      },
    },
  },
});
