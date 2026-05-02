# Vue Project Structure

This guide documents common Vue project structure patterns for applications that use Vue 3, TypeScript, Vue Router, and Pinia.

Use these conventions as a baseline, then adapt them to the size and domain of the project. Prefer consistency within a project over strict adherence to a generic folder layout.

## Recommended Shape

For most production applications, organize code by feature first and by technical role second.

```text
src/
  app/
    App.vue
    main.ts
    router/
      index.ts
      routes.ts
    stores/
      app.store.ts
  assets/
  components/
    base/
    layout/
  constants/
  features/
    auth/
      components/
      composables/
      constants/
      services/
      stores/
      types/
      views/
    users/
      components/
      composables/
      constants/
      services/
      stores/
      types/
      views/
  services/
  types/
  utils/
```

Small applications may not need every folder. Add structure when it clarifies ownership or reduces coupling, not just to satisfy a template.

## Components

Components should live as close as possible to the feature that owns them.

- Use `features/<feature>/components` for components specific to one domain workflow.
- Use `components/base` for shared primitive UI components such as buttons, inputs, dialogs, and icons.
- Use `components/layout` for app-level layout components such as shells, nav bars, sidebars, and page frames.
- Use PascalCase filenames, such as `UserProfileCard.vue`.
- Keep view-level orchestration in `views` and reusable UI behavior in `components`.

Avoid a large flat `components` folder for application-specific components. It becomes difficult to tell which parts of the product own or depend on each component.

## Views

Views represent route-level screens.

- Store route components in `features/<feature>/views` when they belong to a feature.
- Use names that describe the screen, such as `UserListView.vue` or `AccountSettingsView.vue`.
- Keep data loading, permission checks, and page-level composition in the view.
- Extract repeated sections into feature components once the view becomes hard to scan.

## Services

Services contain integration code and side-effectful operations.

- Use `features/<feature>/services` for feature-specific API clients or domain operations.
- Use `services` for shared infrastructure services, such as HTTP clients, telemetry, authentication transport, or storage adapters.
- Keep services framework-light where practical. A service should usually be importable from TypeScript without depending on a component instance.
- Do not hide UI state in services. Return data and errors clearly, then let views, stores, or composables decide how to present them.

Example:

```text
features/users/services/
  users.api.ts
  users.mapper.ts
```

## Constants

Constants should be named and scoped by ownership.

- Use `features/<feature>/constants` for domain constants used by one feature.
- Use `constants` for shared values used across features.
- Prefer specific filenames such as `user-roles.constants.ts` or `route-names.constants.ts`.
- Keep constants immutable and free of runtime side effects.

Avoid turning constants files into miscellaneous dumping grounds. If a value belongs to a component, store, or service only, keep it nearby.

## Types

Types should document domain contracts and boundaries.

- Use `features/<feature>/types` for feature-owned interfaces, request and response shapes, enums, and view models.
- Use `types` for shared cross-feature contracts.
- Prefer clear suffixes such as `User`, `UserResponse`, `UserFormValues`, and `UserListItem`.
- Keep generated API types separate from hand-written domain types when a project uses code generation.

Types that only support one component or service can stay in the same file until they are reused.

## Pinia Stores

Use Pinia stores for state that is shared across routes, features, or distant component trees.

- Use `features/<feature>/stores` for feature-owned stores.
- Use `app/stores` or `stores` for cross-cutting application stores.
- Name store files with a `.store.ts` suffix, such as `auth.store.ts`.
- Name store functions with the `use` prefix, such as `useAuthStore()`.
- Keep server-cache behavior, form-local state, and purely presentational state out of global stores unless there is a clear sharing requirement.

A store should expose a stable domain API. Components should not need to know the internal shape of every state field to perform common actions.

## Router

Keep router configuration explicit and easy to scan.

- Use `app/router/index.ts` to create and export the router instance.
- Use `app/router/routes.ts` or feature route files for route definitions.
- Lazy load route components with dynamic imports.
- Use route names from constants when routes are referenced in multiple places.
- Keep navigation guards small. Move domain-specific checks into services or stores when they grow.

For larger applications, each feature can own its route records:

```text
features/users/
  users.routes.ts
  views/
    UserListView.vue
    UserDetailsView.vue
```

The app router can then compose those feature route arrays.

## Composables

Composables contain reusable stateful logic.

- Use `features/<feature>/composables` for feature-specific composition functions.
- Use `composables` for shared UI or application behavior.
- Name files and functions with the `use` prefix, such as `usePagination.ts` and `usePagination()`.
- Keep composables focused on one concern.
- Avoid making composables implicit service locators. Dependencies should be visible through imports or parameters.

## Utilities

Utilities are small, framework-light helper functions.

- Use `utils` for shared pure helpers.
- Use feature-local utility files when helpers only make sense inside one feature.
- Keep utilities deterministic where possible.
- Do not put API calls, store mutations, or UI side effects in utility files.

## Feature Folder Checklist

A feature folder should contain only the folders it actually needs.

```text
features/<feature>/
  components/
  composables/
  constants/
  services/
  stores/
  types/
  views/
  <feature>.routes.ts
```

This structure is useful when a feature has route-level screens, shared domain state, API access, and several internal components. For smaller features, start with fewer folders and split files only when the boundaries become meaningful.

## Import Boundaries

- Feature code may import from shared folders such as `components/base`, `services`, `types`, `utils`, and `constants`.
- Shared folders should not import from feature folders.
- One feature should not reach into another feature's internals. If behavior is genuinely shared, promote it to a shared folder or expose it through an intentional feature API.
- Avoid circular dependencies between stores, services, and composables.

Clear import boundaries make refactoring easier and keep feature ownership understandable during code review.
