# HTML and CSS Design Guide

This guide defines practical rules and reference implementations for plain HTML, CSS, and TypeScript interfaces.

Use it as the starting point for visual design decisions, browser behavior, accessibility, and local development workflows before adding framework-specific conventions.

## Related Guides

- [Light and Dark Color Themes](color-theme.md)
- [Vite and VS Code Debugging](vite-vscode-debugging.md)

## Reference Code

- [Light and dark theme example](reference-code/color-theme/)

## Scope

The HTML and CSS design guide will cover:

- Color themes and semantic design tokens
- Typography and spacing
- Responsive layouts
- Forms and interactive controls
- Accessibility
- Plain TypeScript browser behavior
- Local development and debugging

## Core Conventions

1. Start with semantic HTML. Use elements for their meaning before adding classes or JavaScript behavior.
2. Treat accessibility as part of the design, not as a later correction.
3. Define reusable visual decisions as CSS custom properties.
4. Name design tokens by purpose, such as `--color-text-muted`, not by appearance, such as `--gray-500`.
5. Use TypeScript for browser behavior. Do not use TypeScript for styling that CSS can express clearly.
6. Test interfaces with keyboard navigation, light and dark themes, narrow screens, and browser zoom.

## References

- [MDN: HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN: CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
