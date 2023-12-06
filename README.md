# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Vitest setup 
### Installation
- vitest 
- @vue/test-utils 
- @vitejs/plugin-vue
- @vitest/coverage-v8 
- @pinia/testing
- jsdom

### Configuration
create `vitest.config.ts`:
```
import path from 'path'
import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [Vue()],
  test: {
    globals: true,
    environment: "jsdom"
  },
  root: ".", 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
});
```
### Add testing scriptsd
`packsge.json`:

```
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage",
  }
```


### First test
`test-vitest-setup.spec.js`
```
import { describe, expect, test } from "vitest";

describe('vitest is installed properly', () => {
  test('2*2 is 4', () => {
    expect(2 * 2).toBe(4)
  })
})
```
