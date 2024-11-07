import { defineConfig } from 'vite';
import staticSite from 'vite-plugin-static-site';

export default defineConfig({
    root: 'src/', // Keep 'src' as the root for the Vite server
    publicDir: '../static/', // Ensure Vite serves static files from the 'static' directory
    base: '/<REPO_NAME>/', // Set this to your GitHub repository name
    server: {
        host: true, // Allows access from the local network
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Opens browser unless on sandbox
    },
    build: {
        outDir: '../docs', // Outputs the build to the 'docs' folder for GitHub Pages
        emptyOutDir: true, // Clears out any old files in the output directory
    },
    plugins: [
        restart({ restart: ['../static/**'] }) // Monitors changes in the 'static' folder
    ],
});