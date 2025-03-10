import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        sourcemap: true,
    },
    optimizeDeps: {
        exclude: ['chunk-JVVZIASD.js?v=84b97b9a'],
    },
});
