import { createUnplugin } from 'unplugin'
import type { SyncOptions } from 'execa'
import execa from 'execa'
import type { Options } from './types'

export default createUnplugin<Options[]>((options) => {
  let timers: NodeJS.Timer[] = []

  options = options.filter(item => !item.invoke || item.invoke() !== false)

  async function execute(script: string | Function, options?: SyncOptions) {
    if (typeof script === 'function')
      await script()
    else
      execa.sync(script, options)
  }

  async function executeAll() {
    const scripts = options.map(({ script, execa }) => execute(script, execa))
    await Promise.all(scripts)
  }

  function pollingAll() {
    const scripts = options.filter(v => typeof v.interval !== 'undefined')
    timers = scripts.map(({ script, interval, execa }) => {
      return setInterval(() => execute(script, execa), interval)
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
