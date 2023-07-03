import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/worker.ts'],
  bundle: true,
  outfile: '../dist/worker/worker.js',
  target: 'node16',
  platform: 'node',
  minify: true,
  external: ['jsdom', 'ytdl-core'],
  sourcemap: 'inline',
  define: {
    'process.env.NODE_ENV': '"production"',
  },
})
