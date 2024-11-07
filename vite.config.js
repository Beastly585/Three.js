import { defineConfig } from 'vite';
import restart from 'vite-plugin-restart';

export default defineConfig({
    root: 'src/', // Keep 'src' as the root directory
    publicDir: '../static/', // Static assets directory
    base: '/Three.js/', // Replace <REPO_NAME> with your GitHub repo name
    server: {
        host: true, // Allow network access
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open browser unless in sandbox
    },
    build: {
        outDir: '../docs', // Output to 'docs' for GitHub Pages
        emptyOutDir: true, // Clears old files
    },
    plugins: [
        restart({ restart: ['../static/**'] }) // Monitor changes in static folder
    ],
});