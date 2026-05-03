# structure-example

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Format Code

```sh
npm run format
```

Formatting uses `oxfmt` with these rules:

- Semicolons are required.
- Trailing commas are not allowed.
- Single quotes are required.

### Lint Code

```sh
npm run lint
```

Linting uses ESLint flat config with JavaScript, TypeScript, and Vue recommended rules. The project also enforces these local rules:

- Promise rejections must use `Error` objects.
- Lines must be 200 characters or less, except lines matching `^\s*\/`.
- Strings must use single quotes.
- Template literals are only allowed when interpolation is needed.
- `require` usage is allowed for plain CommonJS modules.
- `debugger` is only an error in production.
- `console` is a warning in development and an error in production. `console.warn` and `console.error` are allowed.
- Core `no-unused-vars` is disabled so TypeScript-aware unused variable checking is used instead.
- `var` is not allowed.
- Arrow functions are required for callbacks.
- Function declarations are not allowed. Use `const name = (...) => ...`.
- Unused variables are errors, but `_` and underscore-prefixed arguments are allowed.
- Function return types are required.

The Vue formatting-style lint rules that conflict with `oxfmt` are disabled:

- `vue/html-closing-bracket-newline`
- `vue/html-self-closing`
- `vue/max-attributes-per-line`
- `vue/singleline-html-element-content-newline`

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
