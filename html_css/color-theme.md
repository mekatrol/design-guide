# Light and Dark Color Themes

[Back to HTML and CSS Design Guide](readme.md)

A site should support light and dark themes without duplicating component styles. Define semantic color tokens once, change token values at the theme boundary, and let components consume those tokens.

## Rules

- Use the operating-system preference as the default.
- Allow the user to override the system preference with `light`, `dark`, or `system`.
- Persist an explicit user choice in `localStorage`.
- Set `color-scheme` so browser-provided controls, scrollbars, and form elements match the active theme.
- Put theme colors behind semantic custom properties such as `--color-surface`, `--color-text`, and `--color-border`.
- Do not scatter raw theme colors through component selectors.
- Do not use color alone to communicate state. Pair it with text, icons, or other visible cues.
- Verify text and interactive-control contrast in both themes.

## Recommended Approach

Use light values as the base, apply the system dark preference with a media query, and override either theme when the user makes an explicit selection.

```css
:root {
  color-scheme: light dark;
  --color-surface: #f7f7fb;
  --color-surface-raised: #ffffff;
  --color-text: #1b1b20;
  --color-text-muted: #555562;
  --color-border: #c9c9d2;
  --color-accent: #5755d9;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: #17171c;
    --color-surface-raised: #222229;
    --color-text: #f4f4f7;
    --color-text-muted: #b4b4c0;
    --color-border: #44444f;
    --color-accent: #aaa8ff;
  }
}

:root[data-theme="light"] {
  color-scheme: light;
  --color-surface: #f7f7fb;
  --color-text: #1b1b20;
}

:root[data-theme="dark"] {
  color-scheme: dark;
  --color-surface: #17171c;
  --color-text: #f4f4f7;
}
```

The abbreviated override blocks above illustrate the cascade. In production, override the complete token set, as shown in the [reference stylesheet](reference-code/color-theme/assets/css/styles.css).

Set an initial color-scheme hint before loading CSS:

```html
<meta name="color-scheme" content="light dark">
```

Apply a saved preference before the stylesheet loads to reduce a flash of the wrong theme:

```html
<script>
  const theme = localStorage.getItem("theme");
  if (theme === "light" || theme === "dark") {
    document.documentElement.dataset.theme = theme;
  }
</script>
```

Use JavaScript only to store the user choice and set or remove `data-theme`. CSS remains responsible for rendering the theme.

## Modern CSS Option

For projects that target browsers supporting `light-dark()`, token definitions can be more compact:

```css
:root {
  color-scheme: light dark;
  --color-surface: light-dark(#f7f7fb, #17171c);
  --color-text: light-dark(#1b1b20, #f4f4f7);
}
```

Prefer the explicit custom-property blocks when a project needs a clear compatibility baseline, a user override, or themes beyond light and dark.

## Review Checklist

- The page follows the operating-system preference when the user has not selected a theme.
- Light, dark, and system options work after a page refresh.
- Form controls and scrollbars match the selected theme.
- Components use semantic tokens instead of raw theme colors.
- Focus indicators remain visible in both themes.
- Text and controls meet the project's contrast requirements in both themes.

## References

### Videos

- [Kevin Powell: light and dark theme reference](https://www.youtube.com/watch?v=zFFuV_vXNhY)
- [Kevin Powell: light and dark theme follow-up](https://www.youtube.com/watch?v=QtuLN0lNb-Y&t=15s)

### Documentation

- [MDN: `color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)
- [MDN: `prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [MDN: `light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark)
- [MDN: CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
