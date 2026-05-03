# Vue Style Guide

This guide defines the Vue-specific conventions used for building clear, accessible, and maintainable user interfaces.

Use it as the starting point for Vue application design decisions, component structure, styling patterns, accessibility expectations, and review criteria.

## Related Guides

- [Vue Project Structure](structure.md)
- [Vue 404 Handling](404handling.md)

## Scope

The Vue style guide covers:

- Component organization and naming
- Template readability
- Props, emits, and state flow
- Styling and design-system usage
- Accessibility expectations for interactive UI
- Testing and review guidance for Vue components

## Core Conventions

1. Vue single-file components must use this section order: `template`, `script`, then `style`.
2. Use of TypeScript is mandatory.
3. Use the Composition API, not the Options API. The Composition API groups code by logical concern, which improves long-term maintainability and scalability as projects become more complex.
4. Shared styles should live in the main CSS entry point. Component-level styles should be used only when the styles are explicitly specific to that component.
5. TypeScript code in Vue files must follow the project TypeScript style guide.

## Essential Rules

- Component names must use at least two words, such as `TodoList.vue` instead of `Todo.vue`. This avoids conflicts with current or future HTML elements.
- Always provide a stable `:key` when using `v-for`. Do not use the array index as the key when items can be added, removed, reordered, or filtered. Use a unique item ID instead.
- Do not use `v-if` and `v-for` on the same element. Filter the data with a computed value before rendering the list.

## Reactivity

- Use `ref()` for primitive values, such as strings, numbers, and booleans.
- Use `ref()` when the whole value may be replaced, including object or array references.
- Use `reactive()` for complex state objects that should keep a stable object reference.
- Be careful when destructuring reactive objects because it can break reactivity. Prefer `toRefs()` or computed values when individual fields need to be exposed.
- Extract reusable logic into composables named with the `use` prefix, such as `useCurrentUser()` or `useFormState()`.
- Do not use mixins. Composables make dependencies explicit and avoid naming collisions and hidden state.

## Component Communication

- Follow props down, events up. Components receive data through `defineProps()` and notify parents through `defineEmits()`.
- Always type props and emits. Mark required props explicitly.
- Keep components small and focused. If a component's template or script section becomes hard to scan, split it into smaller single-responsibility components.

## Project Organization

- Use PascalCase for component filenames, such as `UserProfileCard.vue`. This matches how components are referenced in JavaScript and TypeScript.
- Use role suffixes only when the suffix identifies an architectural layer, such as `app.store.ts`, `auth.service.ts`, or `users.api.ts`.
- Do not add redundant suffixes inside folders that already define the role. Prefer `utils/url.ts` over `utils/url.util.ts`.
- Name composable files with the `use` prefix, such as `useLogin.ts`, to match the exported composable function.
- Prefix globally shared base components with `Base`, `App`, or `V`, such as `BaseButton.vue`.
- Group large applications by feature instead of by technical type. Prefer paths such as `features/auth/components` and `features/profile/components` over one global components folder.

## Performance

- Use `shallowRef()` or `shallowReactive()` for large datasets that do not need deep tracking, such as read-only API result sets.
- Lazy load routes with dynamic imports in Vue Router so users download only the code needed for the current page.
- Use Pinia for global state management. Keep state local when it is only needed by one component or a small local component tree.

## Tooling

- Use Volar for Vue 3 support in VS Code.
- TypeScript is required for Vue code because it improves editor feedback, documents component contracts, and catches errors before runtime.

## Principles

- Prefer explicit component APIs over implicit coupling.
- Keep templates readable by moving complex logic into computed values, composables, or helpers.
- Design components around user workflows, not only visual layout.
- Treat accessibility as part of the component contract.
- Follow existing project conventions before introducing new patterns.
