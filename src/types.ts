import type { SyncOptions } from 'execa'

export interface Options {
  script: string | Function
  interval?: number
  execa?: SyncOptions
  invoke?: () => boolean | undefined
}
