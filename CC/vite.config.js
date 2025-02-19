// vite.config.js
import{ defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: "/Vig-pages/CC/",
    build: {
        outDir: "docs",
        rollupOptions : {
            input: {
                main: resolve(__dirname, 'index.html'),
                CC: resolve(__dirname, 'CC/index.html'),
                RPG: resolve(__dirname, 'RPG/index.html'),
                MP: resolve(__dirname, 'MP/index.html'),
                PC: resolve(__dirname, 'PC/index.html')
            }
        }
    }
});
   