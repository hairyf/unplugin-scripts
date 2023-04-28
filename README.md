# unplugin-scripts

Better use of scripts for Vite, Webpack, Rollup and esbuild. With TypeScript support. Powered by [unplugin](https://github.com/unjs/unplugin).


## Install

```bash
npm i unplugin-scripts
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Scripts from 'unplugin-scripts/vite'

export default defineConfig({
  plugins: [
    Scripts([/* options */]),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Scripts from 'unplugin-scripts/rollup'

export default {
  plugins: [
    Scripts([/* options */]),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-scripts/webpack')([/* options */])
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['unplugin-scripts/nuxt', [/* options */]],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-scripts/webpack')([/* options */]),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Scripts from 'unplugin-scripts/esbuild'

build({
  plugins: [Scripts()],
})
```

<br></details>

## Basic for Vite

```ts
// vite.config.ts
import Scripts from 'unplugin-scripts/vite'

function clear() {
  // ...
}

export default defineConfig(({ command }) => {
  return {
    plugins: [
      Scripts([
        // only execute once
        { script: 'node scripts/update.js' },
        // continuously executing scripts
        { script: 'api-generate', interval: 100000 },
        // only build execute
        {
          script: 'vue-tsc',
          invoke: () => command === 'prod'
        },
        // execute function
        { script: clear },
      ]),
    ],
  }
})
```

## License

[MIT](./LICENSE) License © 2023 [Hairyf](https://github.com/hairyf)
