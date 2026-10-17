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
  const [checking, setChecking] = useState(false);
  const [report, setReport] = useState('');
  const [refresh, setRefresh] = useState(0);
  const frame = useRef<HTMLIFrameElement>(null);
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


  async function runChecks() {
    setChecking(true);
    setReport('');
    const results: string[] = [];
    const pause = () => new Promise<void>(resolve => window.setTimeout(resolve, 50));
    const money = (n: number) => 'A$' + n.toLocaleString('en-AU', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2 });
    try {
      const doc = frame.current?.contentDocument;
      const win = frame.current?.contentWindow as (Window & typeof globalThis) | null;
      if (!doc || !win || path !== drafts[0].path) throw new Error('Select the HubSpot draft and let it load first.');
      const range = doc.querySelector<HTMLInputElement>('#comparison-team-size');
      const radios = doc.querySelectorAll<HTMLInputElement>('input[name="comparison-billing"]');
      if (!range || radios.length !== 2) throw new Error('The comparison calculator has not loaded.');
      for (const viewport of [375, 390, 768, 1440]) {
        setWidth(viewport);
        await pause();
        if (win.innerWidth !== viewport) throw new Error('Viewport width did not settle.');
        for (const annual of [false, true]) {
          radios[annual ? 1 : 0].click();
          await pause();
          for (const people of [1, 5, 25]) {
            const setter = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value')?.set;
            setter?.call(range, String(people));
            range.dispatchEvent(new win.Event('input', { bubbles: true }));
            range.dispatchEvent(new win.Event('change', { bubbles: true }));
            await pause();
            const vendor = doc.querySelectorAll('.cc-team-results article')[1];
            const total = vendor?.querySelector('.cc-team-total')?.textContent ?? '';
            const text = vendor?.textContent ?? '';
            const expected = money(people * (annual ? 139.5 : 155));
            const price = vendor?.querySelector('.cc-team-total');
            if (price?.firstChild) {
              const priceRange = doc.createRange();
              priceRange.selectNodeContents(price.firstChild);
              if (priceRange.getClientRects().length > 1) throw new Error('Price wraps across lines at ' + viewport + 'px.');
            }
            if (!total.startsWith(expected)) throw new Error(viewport + 'px / ' + people + ' seats / ' + (annual ? 'annual' : 'monthly') + ': ' + total);
            if (annual && !text.includes(money(people * 1674) + ' paid upfront each year.')) throw new Error('Annual upfront total mismatch.');
            if (!annual && !text.includes('Billed monthly with an annual commitment.')) throw new Error('Missing annual commitment.');
            if (!text.includes('Required onboarding: A$2,160 + GST.')) throw new Error('Missing required onboarding.');
            if (!doc.querySelector('.cc-team-zapla')?.textContent?.includes('A$399')) throw new Error('Zapla total changed.');
            results.push(viewport + 'px · ' + people + ' Sales seats · ' + (annual ? 'annual' : 'monthly') + ' · PASS');
          }
        }
        for (const expanded of [false, true]) {
          doc.querySelectorAll('main details').forEach(detail => { (detail as HTMLDetailsElement).open = expanded; });
          await pause();
          if (doc.documentElement.scrollWidth > doc.documentElement.clientWidth) throw new Error('Horizontal overflow at ' + viewport + 'px.');
          results.push(viewport + 'px · ' + (expanded ? 'expanded' : 'collapsed') + ' layout · PASS');
        }
        const year = doc.querySelector('.cc-first-year')?.textContent ?? '';
        for (const amount of ['A$4,020', 'A$3,834', 'A$11,460', 'A$10,530', 'A$48,660', 'A$44,010', 'A$6,785']) {
          if (!year.includes(amount)) throw new Error('Missing first-year amount: ' + amount);
        }
        if ([...doc.images].some(image => image.complete && image.naturalWidth === 0)) throw new Error('Broken image.');
        if (doc.querySelector('meta[name="robots"]')?.getAttribute('content') !== 'noindex, nofollow') throw new Error('Draft indexing changed.');
      }
      results.push('First-year setup totals, images and noindex · PASS');
      setReport('24 calculator states and 8 layout states passed.\n' + results.join('\n'));
    } catch (error) {
      setReport('CHECK FAILED: ' + (error instanceof Error ? error.message : String(error)) + '\n' + results.join('\n'));
    } finally {
      setChecking(false);
    }
  }

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
      <button type="button" disabled={checking} onClick={() => { setRefresh(Date.now()); setReport(''); }} style={{ minHeight: 44, padding: '8px 16px', borderRadius: 8, border: '1px solid #A2AEA6', background: 'white', marginRight: 12, marginBottom: 16 }}>Refresh preview</button>
      <button type="button" onClick={runChecks} disabled={checking || path !== drafts[0].path} style={{ minHeight: 44, padding: '8px 16px', borderRadius: 8, border: '1px solid #A2AEA6', background: 'white', marginBottom: 16 }}>{checking ? 'Checking…' : 'Run HubSpot checks'}</button>
      {report && <details open><summary>Verification results</summary><pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, marginBottom: 24 }}>{report}</pre></details>}
      <div ref={stage}>
        <div style={{ width: width * scale, height: height * scale, margin: 'auto', position: 'relative' }}>
          <iframe ref={frame} title="Comparison preview" src={`${path}?review=${refresh}`} style={{ position: 'absolute', top: 0, left: 0, width, height, border: 0, outline: '1px solid #DEE2DC', transform: `scale(${scale})`, transformOrigin: 'top left', background: 'white' }} />
        </div>
      </div>
    </div>
  </main>;
}
