# Component Framework Test

This project is a Vue component framework scaffold with a separate Vite harness app for local development and debugging.

The UI source is intentionally kept separate from the harness app so the reusable components can be included in other Vue projects by git submodule, subtree, or another source-code sharing approach.

## Project Layout

```text
component-framework-test/
  ui/
    src/
      components/
      css/
        core.css
        reset.css
        theme.css
      index.ts

  harness/
    src/
      App.vue
      main.ts
    vite.config.ts

  vitest.config.ts
  eslint.config.mjs
```

`ui/` contains reusable Vue components and public exports.

The UI CSS files are also public framework entry points:

- `css/reset.css` normalizes common browser defaults.
- `css/theme.css` defines light and dark theme color tokens.
- `css/core.css` defines shared UI framework styles.

`harness/` is a local Vite app used to render, inspect, debug, and test components during development.

## Install

From this folder:

```sh
npm install
```

## Run The Harness

Start the Vite harness app:

```sh
npm run dev
```

This runs:

```sh
vite harness --open
```

The harness app imports UI components through the `@ui` alias configured in `harness/vite.config.ts`.
It also imports the public framework CSS files directly from `ui/src`.

## Add A Component

Create a component under:

```text
ui/src/components/
```

Export it from:

```text
ui/src/index.ts
```

Example:

```ts
export { default as CoreButton } from './components/CoreButton.vue';
```

Use it in the harness:

```vue
<template>
  <CoreButton label="Save changes" />
</template>

<script setup lang="ts">
import { CoreButton } from '@ui';
</script>
```

## Debug Components With The Harness

Use `harness/src/App.vue` as the manual test page.

Add each component state you want to inspect there, for example default state, loading state, disabled state, long labels, validation errors, and different layout widths.

Run:

```sh
npm run dev
```

Then use the browser and Vue DevTools to inspect props, emitted events, component state, styling, and layout behavior.

The harness should stay focused on development and debugging. UI framework code should stay inside `ui/`.

## Unit Tests

Unit tests use Vitest, jsdom, and Vue Test Utils.

Run tests in watch mode:

```sh
npm run test:unit
```

Run tests once:

```sh
npm run test:unit -- --run
```

Place UI component tests under:

```text
ui/src/__tests__/
```

## Lint And Format

Run ESLint:

```sh
npm run lint
```

Run the formatter:

```sh
npm run format
```

The Vue single-file component block order is enforced as:

```text
template
script
style
```

## Build

Build and type-check the harness:

```sh
npm run build
```

The build output is generated under `harness/dist/` and is ignored by git.

## Using The Framework In Another Vue App

Include this project in the consuming app by git submodule or similar. A git submodule is a good default because the consuming app records the exact UI framework commit it uses.

From the consuming app repository, add this UI framework project as a submodule:

```sh
git submodule add <ui-framework-repository-url> src/vendor/component-framework-test
git commit -m "Add UI framework submodule"
```

That creates or updates two things in the consuming app:

```text
.gitmodules
src/vendor/component-framework-test
```

The submodule path is stored in the consuming app as a commit pointer. That commit pointer is the lock. Other developers and deployments will get the same UI framework version until the consuming app deliberately updates it.

Clone a consuming app with submodules:

```sh
git clone --recurse-submodules <consuming-app-repository-url>
```

If the consuming app was already cloned:

```sh
git submodule update --init --recursive
```

Lock the consuming app to a specific UI framework commit:

```sh
cd src/vendor/component-framework-test
git fetch
git checkout <ui-framework-commit-id>
cd ../../..
git add src/vendor/component-framework-test
git commit -m "Lock UI framework to <ui-framework-commit-id>"
```

Update the consuming app to a newer UI framework commit:

```sh
cd src/vendor/component-framework-test
git fetch
git checkout <new-ui-framework-commit-id>
cd ../../..
git add src/vendor/component-framework-test
git commit -m "Update UI framework to <new-ui-framework-commit-id>"
```

Check which UI framework commit is currently locked:

```sh
git submodule status
```

Use `git status` in the consuming app after changing the submodule commit. The submodule path should appear as modified until you commit the new pointer.

Then add a Vite alias in the consuming app:

```ts
resolve: {
  alias: {
    '@ui': fileURLToPath(
      new URL('./src/vendor/component-framework-test/ui/src', import.meta.url)
    )
  }
}
```

Import components from the public UI export:

```ts
import { CoreButton } from '@ui';
```

Import the framework CSS once from the consuming app entry file. Keep this order so reset styles load first, theme tokens load before components use them, and core component styles load before app-specific overrides:

```ts
import '@ui/css/reset.css';
import '@ui/css/theme.css';
import '@ui/css/core.css';
```

The default theme is light. Set `data-theme="dark"` or `data-theme="light"` on the document root to choose a theme explicitly:

```ts
document.documentElement.dataset.theme = 'dark';
```
