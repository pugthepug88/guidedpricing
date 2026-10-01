/**
 * Legacy footer shim.
 *
 * The DominoFooter is the single global footer and is rendered from __root.tsx.
 * Keep this component inert so any older route/layout reference cannot render
 * a second footer underneath it.
 */
export function SiteFooter() {
  return null;
}

export default SiteFooter;
