import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';

const drafts = [
  { name: 'Zapla vs HubSpot', path: '/compare/zapla-vs-hubspot-simple' },
  { name: 'Zapla vs Pipedrive', path: '/compare/zapla-vs-pipedrive-simple' },
] as const;

export const Route = createFileRoute('/compare/review')({
  head: () => ({ meta: [{ title: 'Comparison draft review | Zapla' }, { name: 'robots', content: 'noindex, nofollow' }] }),
  component: ComparisonReview,
});

// Internal reviewer only. These routes remain outside the production SEO whitelist.
function ComparisonReview() {
  const [path, setPath] = useState<string>(drafts[0].path);
  const [width, setWidth] = useState(1440);
  const height = 900;
  const [available, setAvailable] = useState(1440);
  const stage = useRef<HTMLDivElement>(null);
  const scale = Math.min(1, available / width);

  useEffect(() => {
    const container = stage.current;
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => setAvailable(entry.contentRect.width));
    observer.observe(container);
    return () => observer.disconnect();
  }, []);


  return <main style={{ padding: '120px 24px 48px', background: '#FCFCFA', color: '#111318', fontFamily: 'Manrope, sans-serif' }}>
    <div style={{ maxWidth: 1440, margin: '0 auto' }}>
      <h1 style={{ fontSize: 32, fontWeight: 600, margin: '0 0 12px' }}>Comparison draft review</h1>
      <p style={{ margin: '0 0 24px' }}>Choose a comparison and a screen width. These are unpublished drafts.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'end', marginBottom: 24 }}>
        <label style={{ display: 'grid', gap: 8 }}>Comparison
          <select aria-label="Comparison draft" value={path} onChange={event => setPath(event.target.value)} style={{ minHeight: 44, padding: '8px 12px', border: '1px solid #A2AEA6', borderRadius: 8, background: 'white', maxWidth: '100%' }}>
            {drafts.map(draft => <option key={draft.path} value={draft.path}>{draft.name}</option>)}
          </select>
        </label>
        <label style={{ display: 'grid', gap: 8 }}>Screen width
          <select aria-label="Screen width" value={width} onChange={event => setWidth(Number(event.target.value))} style={{ minHeight: 44, padding: '8px 12px', border: '1px solid #A2AEA6', borderRadius: 8, background: 'white' }}>
            <option value={375}>Mobile · 375px</option><option value={390}>Mobile · 390px</option><option value={768}>Tablet · 768px</option><option value={1440}>Desktop · 1440px</option>
          </select>
        </label>
        <a href={path} style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, color: '#2563FF', textDecoration: 'underline' }}>Open selected draft</a>
      </div>
      <div ref={stage}>
        <div style={{ width: width * scale, height: height * scale, margin: 'auto', position: 'relative' }}>
          <iframe title="Comparison preview" src={path} style={{ position: 'absolute', top: 0, left: 0, width, height, border: 0, outline: '1px solid #DEE2DC', transform: `scale(${scale})`, transformOrigin: 'top left', background: 'white' }} />
        </div>
      </div>
    </div>
  </main>;
}
