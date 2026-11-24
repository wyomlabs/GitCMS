/**
 * Custom events for Umami, loaded by BaseLayout. Clicks are tracked without
 * code through `data-umami-event` attributes; `track` is for events that have
 * no click, like a popup opening by itself. Until the deferred script loads
 * there is no `window.umami`, and the event is dropped.
 */
declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void }
  }
}

export function track(event: string, data?: Record<string, string>) {
  window.umami?.track(event, data)
}
