# Vue 404 Handling

[Back to Vue Style Guide](readme.md)

404 handling must not be treated as a purely local SPA concern. A Vue app can render a helpful "not found" view, but the server must still return the correct HTTP status for invalid URLs.

This matters because systems outside the app, including search indexers, crawlers, uptime monitors, link checkers, browser tooling, and API clients, read the HTTP response before they understand the rendered Vue route. If an unknown URL returns `200 OK` with a client-rendered 404 page, those systems can treat the missing page as a valid document.

## Rule

When a browser requests an invalid application URL directly, the response must be one of the following:

- `404 Not Found` when the route or resource does not exist.
- `410 Gone` when the route used to exist but has been permanently removed.
- `301 Moved Permanently` or `308 Permanent Redirect` when the canonical location has permanently changed.
- `302 Found`, `303 See Other`, or `307 Temporary Redirect` when the redirect is temporary.

Do not serve `index.html` with `200 OK` for URLs that are known to be invalid.

## Vue Router Role

Vue Router should still include a catch-all route so navigation inside the already-loaded app has a useful user experience. In Vue Router 4, catch-all routes are defined with a custom regex parameter:

```ts
import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  // Other routes first.
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/app/views/NotFoundView.vue'),
  },
];
```

Keep the catch-all route last so more specific routes are matched first.

The catch-all route is only the client-side fallback. It does not change the HTTP status of the original document request after `index.html` has already been served. The server, edge function, or backend route resolver must decide whether the URL is valid before returning the SPA shell.

## Server Role

The server should classify each request before returning HTML:

1. If the path maps to a known application route, return the SPA shell with `200 OK`.
2. If the path maps to an old route with a replacement, return the appropriate redirect status and `Location` header.
3. If the path is unknown, return a 404 response.
4. If the path is permanently removed and there is no replacement, return `410 Gone`.

For an SPA, the 404 response can still return branded HTML. The important part is that the HTTP status is `404`, not `200`.

## API-Assisted Route Resolution

If route validity depends on backend data, the catch-all route should not silently render a local 404 and stop there. It should ask the backend to resolve the requested path.

Use this pattern when slugs, CMS pages, tenant routes, product URLs, documentation pages, or legacy redirects are controlled by server-side data:

```ts
router.beforeEach(async (to) => {
  const result = await resolveRouteOnServer(to.fullPath);

  if (result.status === 301 || result.status === 302) {
    window.location.assign(result.location);
    return false;
  }

  if (result.status === 404 || result.status === 410) {
    return { name: 'not-found', query: { from: to.fullPath } };
  }

  return true;
});
```

This improves in-app navigation, but it is not a substitute for server-side status handling. Direct requests to the same invalid URL must still return the correct HTTP status from the server.

## Static Hosting

Static hosting setups often rewrite all unknown paths to `index.html` so browser refresh works with history-mode routing. That rewrite is acceptable only when the path is a valid app route.

Avoid broad fallback rules such as this for every URL:

```text
/* /index.html 200
```

Prefer a platform-specific configuration that distinguishes valid SPA routes from unknown paths, or use an edge/server function to resolve the path and return the correct status.

## Review Checklist

- Directly opening a valid route returns `200 OK`.
- Directly opening an invalid route returns `404 Not Found`.
- Permanently removed routes return `410 Gone` or redirect to a replacement.
- Legacy URLs return the correct redirect status and `Location` header.
- The Vue Router catch-all route exists and is ordered last.
- The visible 404 page is useful to users but does not mask the HTTP status.
- Search indexers do not receive `200 OK` for missing content.

## References

- [Vue Router: catch-all / 404 not found route](https://router.vuejs.org/guide/essentials/dynamic-matching.html#catch-all-404-not-found-route)
- [Vue Router migration: removed star catch-all routes](https://router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes)
- [MDN: 404 Not Found](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/404)
- [Google Search Central: How HTTP status codes affect Google's crawlers](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes)
