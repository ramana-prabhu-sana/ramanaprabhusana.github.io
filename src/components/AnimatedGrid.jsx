/**
 * Intentionally renders nothing.
 *
 * This used to be a `position: fixed` full-screen background layer. iOS
 * WebKit renders transparent content that scrolls over a fixed full-screen
 * layer washed-out / ghosted (a long-standing compositing bug) - which is
 * exactly the "everything below the hero is faint on iPhone" symptom an
 * on-device diagnostic confirmed (computed styles were all correct).
 *
 * The dark background + subtle grid now live on `body` as a plain
 * background-image (see index.css) - painted into the document canvas with
 * no compositing layer, so there is no fixed layer for content to
 * mis-composite against. Component kept as a no-op so App.jsx and any
 * imports don't need to change.
 */
export default function AnimatedGrid() {
  return null;
}
