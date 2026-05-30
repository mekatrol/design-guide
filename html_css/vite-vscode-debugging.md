# Vite and VS Code Debugging

[Back to HTML and CSS Design Guide](readme.md)

Use Vite as the local development server for plain HTML, CSS, and TypeScript projects. Vite serves `index.html` as an application entry point and updates the browser while files change.

## Create a Plain Project

To scaffold a new vanilla TypeScript project:

```bash
npm create vite@latest html-design-guide -- --template vanilla-ts
cd html-design-guide
npm install
npm run dev
```

For an existing plain HTML, CSS, and TypeScript folder, add Vite directly:

```bash
npm install --save-dev vite typescript
```

Use these scripts in `package.json`:

```json
{
  "scripts": {
    "dev": "vite --open",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

## Run with Automatic Refresh

From the project folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

While the dev server is running:

- CSS changes are applied immediately where possible.
- HTML and TypeScript changes update the page automatically.
- A production check can be run with `npm run build`.

Do not open `index.html` directly from the filesystem. Use the Vite URL so modules, assets, and automatic updates behave consistently.

## Debug in VS Code

VS Code includes a browser debugger for Edge and Chrome. Start Vite in the integrated terminal, then create `.vscode/launch.json` in the project being debugged:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "msedge",
      "request": "launch",
      "name": "Debug Vite in Edge",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}"
    },
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug Vite in Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

Press `F5` and choose the browser configuration. VS Code opens a browser with the debugger attached. Breakpoints in TypeScript remain useful while Vite updates the page after edits.

The [reference project](reference-code/color-theme/) includes a tracked [`vscode/launch.json`](reference-code/color-theme/vscode/launch.json). Copy its content into `.vscode/launch.json` when using the example as a standalone workspace. The repository ignores local `.vscode` settings so personal editor state is not committed.

## References

- [Vite: Getting Started](https://vite.dev/guide/)
- [VS Code: Browser debugging](https://code.visualstudio.com/docs/nodejs/browser-debugging)
