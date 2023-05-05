import type { ExecSyncOptionsWithBufferEncoding } from 'node:child_process'
import { execSync } from 'node:child_process'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'

export default createUnplugin<Options[]>((options) => {
  let timers: NodeJS.Timer[] = []

  options = options.filter(item => !item.invoke || item.invoke() !== false)

  async function execute(script: string | Function, options?: ExecSyncOptionsWithBufferEncoding) {
    if (typeof script === 'function')
      await script()
    else
      execSync(script, options)
  }

  async function executeAll() {
    const scripts = options.map(({ script, options }) => execute(script, options))
    await Promise.all(scripts)
  }

  function pollingAll() {
    const scripts = options.filter(v => typeof v.interval !== 'undefined')
    timers = scripts.map(({ script, interval, options }) => {
      return setInterval(() => execute(script, options), interval)
    })
  }

  function clearAll() {
    timers.forEach(timer => clearInterval(timer))
  }
  return {
    name: 'unplugin-scripts',
    async buildStart() {
      await executeAll()
    },
    async buildEnd() {
      clearAll()
    },
    vite: {
      configResolved(config) {
        if (config.command === 'serve')
          pollingAll()
      },
    },
    webpack(compiler) {
      if (compiler.options.mode === 'development')
        pollingAll()
    },
    esbuild: {
      setup(build) {
        if (build.initialOptions.watch)
          pollingAll()
      },
    },
  }
})
