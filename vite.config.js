import { defineConfig } from 'vite';
// import { peerDependencies, dependencies } from './package.json';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'zyklus.ts'),
      formats: ['es', 'cjs'],
      fileName: (ext) => `zyklus.${ext}.js`,
      // for UMD name: 'GlobalName'
    },
    rollupOptions: {
      // external: [...Object.keys(peerDependencies), ...Object.keys(dependencies)],
    },
    target: 'esnext',
  },
});
