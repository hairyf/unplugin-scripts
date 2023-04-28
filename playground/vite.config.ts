import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../src/vite'

export default defineConfig(({ command }) => {
  return {
    plugins: [
      Inspect(),
      Unplugin([
        {
          script: () => {
            // eslint-disable-next-line no-console
            console.log('interval -- 5000')
          },
          interval: 5000,
        },
        {
          script: () => {
            // eslint-disable-next-line no-console
            console.log('invoke - build')
          },
          invoke: () => command === 'build',
        },
        { script: 'tsx scripts/log.ts', interval: 5000, execa: { stdout: 'inherit' } },
        // { script: 'tsc --noEmit', interval: 10000, execa: { stdout: 'inherit' } },
      ]),
    ],
  }
})
