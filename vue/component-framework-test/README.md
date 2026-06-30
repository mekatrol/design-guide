# Component Framework Test

This project is a Vue component framework scaffold with a separate Vite harness app for local development and debugging.

The framework source is intentionally kept separate from the harness app so the reusable components can be included in other Vue projects by git submodule, subtree, or another source-code sharing approach.

## Project Layout

```text
component-framework-test/
  framework/
    src/
      components/
      index.ts

  harness/
    src/
      App.vue
      main.ts
    vite.config.ts

  vitest.config.ts
  eslint.config.mjs
```

`framework/` contains reusable Vue components and public exports.

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

The harness app imports framework components through the `@framework` alias configured in `harness/vite.config.ts`.

## Add A Component

Create a component under:

```text
framework/src/components/
```

Export it from:

```text
framework/src/index.ts
```

Example:

```ts
export { default as DgButton } from './components/DgButton.vue';
```

Use it in the harness:

```vue
<template>
  <DgButton label="Save changes" />
</template>

<script setup lang="ts">
import { DgButton } from '@framework';
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

The harness should stay focused on development and debugging. Framework code should stay inside `framework/`.

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

Place framework component tests under:

```text
framework/src/__tests__/
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

Include this project in the consuming app by git submodule or similar. A git submodule is a good default because the consuming app records the exact framework commit it uses.

From the consuming app repository, add this framework project as a submodule:

```sh
git submodule add <framework-repository-url> src/vendor/component-framework-test
git commit -m "Add component framework submodule"
```

That creates or updates two things in the consuming app:

```text
.gitmodules
src/vendor/component-framework-test
```

The submodule path is stored in the consuming app as a commit pointer. That commit pointer is the lock. Other developers and deployments will get the same framework version until the consuming app deliberately updates it.

Clone a consuming app with submodules:

```sh
git clone --recurse-submodules <consuming-app-repository-url>
```

If the consuming app was already cloned:

```sh
git submodule update --init --recursive
```

Lock the consuming app to a specific framework commit:

```sh
cd src/vendor/component-framework-test
git fetch
git checkout <framework-commit-id>
cd ../../..
git add src/vendor/component-framework-test
git commit -m "Lock component framework to <framework-commit-id>"
```

Update the consuming app to a newer framework commit:

```sh
cd src/vendor/component-framework-test
git fetch
git checkout <new-framework-commit-id>
cd ../../..
git add src/vendor/component-framework-test
git commit -m "Update component framework to <new-framework-commit-id>"
```

Check which framework commit is currently locked:

```sh
git submodule status
```

Use `git status` in the consuming app after changing the submodule commit. The submodule path should appear as modified until you commit the new pointer.

Then add a Vite alias in the consuming app:

```ts
resolve: {
  alias: {
    '@framework': fileURLToPath(
      new URL('./src/vendor/component-framework-test/framework/src', import.meta.url)
    )
  }
}
```

Import components from the public framework export:

```ts
import { DgButton } from '@framework';
```
