// vite.config.js
import{ defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        outDir: 'docs',
        rollupOptions : {
            input: {
                main: resolve(__dirname, 'index.html'),
                about : resolve(__dirname, 'about/index.html'),
            }
        }
    }
});
        