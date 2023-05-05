import type { ExecSyncOptionsWithBufferEncoding } from 'node:child_process'

export interface Options {
  script: string | Function
  interval?: number
  options?: ExecSyncOptionsWithBufferEncoding
  invoke?: () => boolean | undefined
}
