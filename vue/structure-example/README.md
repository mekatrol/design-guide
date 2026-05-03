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

## Project Structure Notes

This example follows the repository Vue project structure guide:

- Shared transport code lives in `src/services/http.service.ts`.
- Shared authentication API code lives in `src/services/auth.service.ts`.
- Shared reusable composables live in `src/composables` and use `use`-prefixed filenames.
- Feature-owned API functions live near their feature, such as `src/features/users/services/users.api.ts`.
- Cross-feature data contracts live in `src/types`.
- URL composition and normalization live in `src/utils/url.ts`.
- App-wide request busy state and authenticated-user state live in `src/stores/app.store.ts`.

### HTTP Service

Use `src/services/http.service.ts` for shared HTTP transport behavior. It provides typed helpers for `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`, plus API error normalization, timeout handling, validation error storage, optional bearer-token headers, optional refresh-token retry, and app busy-state tracking.

Feature services should import the shared helpers instead of calling `fetch` directly:

```ts
import { httpGet } from '@/services/http.service';

import type { User } from '@/features/users/types/user.types';

export const listUsers = async (): Promise<User[]> => {
  return await httpGet<User[]>('/users');
};
```

Authentication token lookup and persisted-token loading are configured by `src/services/auth.service.ts` during app startup:

```ts
import { configureAuthTransport, useAuthService } from '@/services/auth.service';

configureAuthTransport();
void useAuthService().loadStorageToken();
```

`readJson` remains in the HTTP service for local mocked data used by this example. Replace mocked feature services with the HTTP helpers when connecting to a real API.

### Authentication

`src/services/auth.service.ts` owns auth API calls for login, logout, refresh-token, and current-user loading. Auth data contracts live in `src/types/auth.types.ts` so the app store can hold auth state without importing the auth service.

`src/stores/app.store.ts` exposes:

- `userToken` and `user` for authenticated state.
- `isAuthenticated` for read-only auth status.
- `setUserToken`, `setUser`, and `clearUser` for auth state updates.

`src/composables/useLogin.ts` owns route-aware login and logout behavior. It calls the auth service, stores successful tokens, loads the current user, and returns users to the `return` query path when present.

Persisted auth tokens use `src/composables/useLocalSession.ts` and the `TOKEN_SESSION_KEY` constant from the app store.

### Shared Composables

Shared composables live in `src/composables` and follow the `use` filename/function convention:

- `useIntervalTimer` starts an interval on mount, prevents overlapping async ticks, and stops on unmount.
- `useLanguageInfo` reads browser language, base language, and optional variant.
- `useLocalSession` provides typed local-storage accessors for JSON objects, strings, booleans, and integers.
- `useLogin` coordinates login/logout flows with auth services and routing.
- `useScreenSize` exposes reactive viewport dimensions.

### URL Utilities

Use `src/utils/url.ts` for URL handling:

- `combineUrl` joins a base URL and relative path without duplicate slashes.
- `combinePathWithBaseUrl` joins a path with the configured API base URL.
- `ensureRelativeUrl` strips scheme, host, and port from a URL while preserving path, query string, and hash.
- `getApiBaseUrl` reads an injected `#api-base-url` input first, then `VITE_API_BASE_URL`, then `/`.

For deployments that inject the API base URL at runtime, add a hidden input to `index.html` or the server-rendered shell. This example includes a local development value:

```html
<input id="api-base-url" type="hidden" value="http://localhost:5000">
```

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

VS Code is configured to format on save with the OXC extension. Install the recommended `oxc.oxc-vscode` extension when prompted so `.ts`, `.vue`, `.js`, and `.json` files use the same formatter as `npm run format`.

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
