import fs from 'fs'
import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill'

export default () => {
  return defineConfig({
    plugins: [react()],
    define: {
      global: 'globalThis'
    },
    server: {
      port: 3001,
      proxy: 'https://pixinvent.com/',
      cors: {
        origin: ['https://pixinvent.com/', 'http://localhost:3001'],
        methods: ['GET', 'PATCH', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ['node_modules', './src/assets']
        }
      },
    },
    resolve: {
      alias: [
        {
          find: /^~.+/,
          replacement: val => {
            return val.replace(/^~/, '')
          }
        },

        { find: '@src', replacement: path.resolve(__dirname, 'src') },
        { find: '@views', replacement: path.resolve(__dirname, 'src/views') },
        { find: '@components', replacement: path.resolve(__dirname, 'src/components') },

      ]
    },
    esbuild: {
      loader: 'jsx',
      include: /.\/src\/.*\.js?$/,
      exclude: [],
      jsx: 'automatic'
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx'
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true
          }),
          {
            name: 'load-js-files-as-jsx',
            setup(build) {
              build.onLoad({ filter: /src\\.*\.js$/ }, async args => ({
                loader: 'jsx',
                contents: await fs.readFileSync(args.path, 'utf8')
              }))
            }
          }
        ]
      }
    },
    build: {
      rollupOptions: {
        plugins: [rollupNodePolyFill()]
      }
    }
  })
}
