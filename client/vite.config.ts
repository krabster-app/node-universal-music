import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: '__tla',
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`,
    }),
    tsconfigPaths({
      root: resolve(__dirname, './'),
      projects: [resolve(__dirname, './tsconfig.json')],
      loose: true,
    }),
    svgr(),
    {
      name: 'vite-current-line',
      transform(code, id) {
        const LINE_MARKER = '$line'

        return code
          .split('\n')
          .map((line, i) => {
            if (line.includes(LINE_MARKER) && !line.includes('declare')) {
              const currentLineId =
                id.split('/').slice(-3).join('/') + ':' + (i + 1)
              return line.replace(LINE_MARKER, `'${currentLineId}'`)
            }

            return line
          })
          .join('\n')
      },
    },
  ],
  envDir: resolve(__dirname, '..'),
  envPrefix: 'SOVOK_',

  build: {
    outDir: resolve(__dirname, '../dist/client'),
    emptyOutDir: true,
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
