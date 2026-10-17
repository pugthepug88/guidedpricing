import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';

const drafts = [
  { name: 'Zapla vs Zoho', path: '/compare/zapla-vs-zoho-simple' },
  { name: 'Zapla vs HubSpot', path: '/compare/zapla-vs-hubspot-simple' },
  { name: 'Zapla vs Creatio', path: '/compare/zapla-vs-creatio-simple' },
  { name: 'Zapla vs ActiveCampaign', path: '/compare/zapla-vs-activecampaign-simple' },
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
      if (!doc || !win || path !== '/compare/zapla-vs-hubspot-simple') throw new Error('Select the HubSpot draft and let it load first.');
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


  async function runActiveCampaignChecks() {
    setChecking(true);
    setReport('');
    const results: string[] = [];
    const pause = () => new Promise<void>(resolve => window.setTimeout(resolve, 100));
    const money = (n: number) => 'A$' + n.toLocaleString('en-AU', { maximumFractionDigits: 2 });
    try {
      const doc = frame.current?.contentDocument;
      const win = frame.current?.contentWindow as (Window & typeof globalThis) | null;
      if (!doc || !win || path !== '/compare/zapla-vs-activecampaign-simple') throw new Error('Select ActiveCampaign and let it load.');
      const select = doc.querySelector<HTMLSelectElement>('#comparison-configuration');
      const radios = doc.querySelectorAll<HTMLInputElement>('input[name="comparison-billing"]');
      if (!select || radios.length !== 2) throw new Error('Configuration calculator not loaded.');
      const quotes = [{monthly:163, annual:1596, users:1, contacts:1000}, {monthly:279, annual:2700, users:5, contacts:1000}, {monthly:433, annual:4116, users:1, contacts:10000}];
      for (const viewport of [375, 390, 768, 1440]) {
        setWidth(viewport);
        await pause();
        if (win.innerWidth !== viewport) throw new Error('Viewport did not settle.');
        for (const annual of [false, true]) {
          radios[annual ? 1 : 0].click();
          for (const [index, quote] of quotes.entries()) {
            Object.getOwnPropertyDescriptor(win.HTMLSelectElement.prototype, 'value')?.set?.call(select, String(index));
            select.dispatchEvent(new win.Event('change', {bubbles:true}));
            await pause();
            const cards = doc.querySelectorAll('.cc-team-results article');
            const vendor = cards[1]?.textContent ?? '';
            const total = cards[1]?.querySelector('.cc-team-total');
            if (!total?.textContent?.startsWith(money(annual ? quote.annual / 12 : quote.monthly))) throw new Error('Incorrect package total.');
            if (!vendor.includes(quote.contacts.toLocaleString('en-AU') + ' contacts') || !vendor.includes(quote.users + ' user')) throw new Error('Incorrect configuration context.');
            if (annual && !vendor.includes(money(quote.annual) + ' paid upfront each year. Annual commitment.')) throw new Error('Annual upfront mismatch.');
            if (!annual && !vendor.includes('Month-to-month subscription.')) throw new Error('Monthly terms incorrect.');
            if (!vendor.includes('Pipelines add-on') || !vendor.includes('GST')) throw new Error('Tier or tax missing.');
            if (!cards[0]?.textContent?.includes('A$399') || !cards[0]?.textContent?.includes('A$1,997')) throw new Error('Zapla subscription or launch mismatch.');
            if (total.firstChild) { const r = doc.createRange(); r.selectNodeContents(total.firstChild); if (r.getClientRects().length > 1) throw new Error('Price wraps at ' + viewport); }
            if (doc.documentElement.scrollWidth > doc.documentElement.clientWidth) throw new Error('Calculator overflow.');
            results.push(viewport + 'px · configuration ' + (index+1) + ' · ' + (annual ? 'annual' : 'monthly') + ' PASS');
          }
        }
        for (const expanded of [false, true]) {
          doc.querySelectorAll<HTMLDetailsElement>('main details').forEach(item => { item.open = expanded; });
          await pause();
          if (doc.documentElement.scrollWidth > doc.documentElement.clientWidth) throw new Error('Layout overflow at ' + viewport);
          if (expanded && [...doc.querySelectorAll<HTMLElement>('.cc-first-year td')].some(cell => cell.scrollWidth > cell.clientWidth + 1)) throw new Error('First-year cell clips.');
          results.push(viewport + 'px · ' + (expanded ? 'expanded' : 'collapsed') + ' layout PASS');
        }
        const year = doc.querySelector('.cc-first-year')?.textContent ?? '';
        for (const n of [1956,1596,3348,2700,5196,4116,6785]) if (!year.includes(money(n))) throw new Error('First-year amount missing: ' + n);
        if ([...doc.images].some(img => !img.complete || img.naturalWidth === 0)) throw new Error('Broken/unloaded image.');
        if (doc.querySelector('meta[name="robots"]')?.getAttribute('content') !== 'noindex, nofollow') throw new Error('Missing noindex.');
        for (const link of doc.querySelectorAll<HTMLAnchorElement>('main a[href^="#"]')) if (!doc.getElementById(link.hash.slice(1))) throw new Error('Broken anchor.');
      }
      const main = doc.querySelector('.cc-hero');
      const labels = [...doc.querySelectorAll('.cc-table tbody th')].map(node => node.textContent);
      for (const label of ['Unlimited users','Unlimited contacts','Unlimited pipelines','Forms','Quotes & proposals','Invoicing']) if (!labels.includes(label)) throw new Error('Missing consistent label: ' + label);
      if (main?.textContent?.includes('Pipedrive') || main?.textContent?.includes('HubSpot')) throw new Error('Leaked competitor copy.');
      results.push('First-year totals, noindex, loaded images, anchors and consistent feature labels PASS');
      setReport('24 ActiveCampaign calculator states and 8 layout states passed.\n' + results.join('\n'));
    } catch (error) { setReport('CHECK FAILED: ' + (error instanceof Error ? error.message : String(error)) + '\n' + results.join('\n')); }
    finally { setChecking(false); }
  }

  async function runCreatioChecks() {
    setChecking(true);
    setReport('');
    const results: string[] = [];
    const pause = () => new Promise<void>(resolve => window.setTimeout(resolve, 80));
    try {
      const doc = frame.current?.contentDocument;
      const win = frame.current?.contentWindow as (Window & typeof globalThis) | null;
      if (!doc || !win || path !== '/compare/zapla-vs-creatio-simple') throw new Error('Select Creatio and let the draft load.');
      const range = doc.querySelector<HTMLInputElement>('#comparison-team-size');
      if (!range) throw new Error('Calculator not loaded.');
      if (doc.querySelector('input[name="comparison-billing"]')) throw new Error('Published-reference comparison must not invent billing options.');
      for (const viewport of [375, 390, 768, 1440]) {
        setWidth(viewport);
        await pause();
        if (win.innerWidth !== viewport) throw new Error('Viewport did not settle.');
        for (const people of [1, 5, 15, 16, 25]) {
          Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value')?.set?.call(range, String(people));
          range.dispatchEvent(new win.Event('input', { bubbles: true }));
          range.dispatchEvent(new win.Event('change', { bubbles: true }));
          await pause();
          const cards = doc.querySelectorAll('.cc-team-results article');
          const zapla = cards[0]?.textContent ?? '';
          const vendor = cards[1]?.textContent ?? '';
          if (!zapla.includes('A$399') || !zapla.includes('A$1,997')) throw new Error('Zapla price or launch mismatch.');
          const licences = Math.max(5, people);
          const subtotal = licences * 55;
          const usd = (n: number) => 'US$' + n.toLocaleString('en-AU');
          if (!vendor.includes(licences + ' licences modelled')) throw new Error('Minimum licence count incorrect.');
          if (people < 5 && !vendor.includes('for ' + people + ' person')) throw new Error('Small-team minimum missing.');
          if (!vendor.includes('Creatio Growth + Sales') || !vendor.includes('US$55')) throw new Error('Wrong tier or published rate.');
          if (!vendor.includes(usd(subtotal) + '/month licence subtotal') || !vendor.includes(usd(subtotal * 12) + '/year')) throw new Error('Licence subtotal incorrect.');
          if (!vendor.includes('US$10,000/year minimum purchase') || !vendor.includes('Standard 3-year contract')) throw new Error('Purchase conditions hidden.');
          if (!vendor.includes(subtotal * 12 < 10000 ? 'below this minimum' : 'exceeds this minimum')) throw new Error('Minimum-purchase explanation incorrect.');
          if (!vendor.includes('USD reference') || !vendor.includes('Prices exclude applicable taxes')) throw new Error('Currency or tax labels incorrect.');
          const qualification = doc.querySelector('.cc-team-qualification')?.textContent ?? '';
          if (!qualification.includes('not a same-currency savings comparison')) throw new Error('Mixed-currency disclosure missing.');
          const price = cards[1]?.querySelector('.cc-team-total');
          if (price?.firstChild) {
            const priceRange = doc.createRange();
            priceRange.selectNodeContents(price.firstChild);
            if (priceRange.getClientRects().length > 1) throw new Error('Price wraps at ' + viewport + 'px.');
          }
          if (/A\$0|NaN|Infinity|Australian quote required/.test(vendor)) throw new Error('Invalid or blank published price.');
          results.push(viewport + 'px · ' + people + ' people / ' + licences + ' licences · published pricing PASS');
        }
        for (const expanded of [false, true]) {
          doc.querySelectorAll('main details').forEach(item => { (item as HTMLDetailsElement).open = expanded; });
          await pause();
          if (doc.documentElement.scrollWidth > doc.documentElement.clientWidth) throw new Error('Overflow at ' + viewport + 'px.');
          if (expanded && [...doc.querySelectorAll<HTMLElement>('.cc-first-year td')].some(cell => cell.scrollWidth > cell.clientWidth + 1)) throw new Error('Annual cost text clips inside a cell at ' + viewport + 'px.');
          results.push(viewport + 'px · ' + (expanded ? 'expanded' : 'collapsed') + ' layout PASS');
        }
        const year = doc.querySelector('.cc-first-year')?.textContent ?? '';
        if ((year.match(/A\$6,785/g) || []).length < 3 || !year.includes('US$10,000 minimum') || !year.includes('US$16,500') || !year.includes('implementation') || !year.includes('different currencies')) throw new Error('First-year amounts incorrect.');
        if ([...doc.images].some(image => !image.complete || image.naturalWidth === 0)) throw new Error('Image not loaded.');
        if (doc.querySelector('meta[name="robots"]')?.getAttribute('content') !== 'noindex, nofollow') throw new Error('Draft noindex missing.');
        for (const link of doc.querySelectorAll<HTMLAnchorElement>('main a[href^="#"]')) {
          if (!doc.getElementById(link.hash.slice(1))) throw new Error('Broken section anchor.');
        }
      }
      const links = [...doc.querySelectorAll<HTMLAnchorElement>('main a')];
      if (links.some(link => !link.getAttribute('href'))) throw new Error('Empty link.');
      if (links.filter(link => link.pathname === '/booking').length < 2) throw new Error('Missing call CTAs.');
      results.push('First-year launch totals, images, noindex, anchors and CTA destinations PASS');
      setReport('20 published-pricing states and 8 layout states passed.\n' + results.join('\n'));
    } catch (error) {
      setReport('CHECK FAILED: ' + (error instanceof Error ? error.message : String(error)) + '\n' + results.join('\n'));
    } finally {
      setChecking(false);
    }
  }
  async function runZohoChecks() {
    setChecking(true);
    setReport('');
    const results: string[] = [];
    const pause = () => new Promise<void>(resolve => window.setTimeout(resolve, 50));
    const money = (n: number) => 'A{{ padding: '120px 24px 48px', background: '#FCFCFA', color: '#111318', fontFamily: 'Manrope, sans-serif' }}>
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
      <button type="button" onClick={runChecks} disabled={checking || path !== '/compare/zapla-vs-hubspot-simple'} style={{ minHeight: 44, padding: '8px 16px', borderRadius: 8, border: '1px solid #A2AEA6', background: 'white', marginBottom: 16 }}>{checking ? 'Checking…' : 'Run HubSpot checks'}</button>
      {path === '/compare/zapla-vs-creatio-simple' && <button type="button" onClick={runCreatioChecks} disabled={checking} style={{ minHeight: 44, padding: '8px 16px', borderRadius: 8, border: '1px solid #A2AEA6', background: 'white', marginLeft: 12, marginBottom: 16 }}>{checking ? 'Checking…' : 'Run Creatio checks'}</button>}
      {path === '/compare/zapla-vs-activecampaign-simple' && <button type="button" onClick={runActiveCampaignChecks} disabled={checking} style={{ minHeight: 44, padding: '8px 16px', borderRadius: 8, border: '1px solid #A2AEA6', background: 'white', marginLeft: 12, marginBottom: 16 }}>{checking ? 'Checking…' : 'Run ActiveCampaign checks'}</button>}
      {path === '/compare/zapla-vs-zoho-simple' && <button type="button" onClick={runZohoChecks} disabled={checking} style={{ minHeight: 44, padding: '8px 16px', borderRadius: 8, border: '1px solid #A2AEA6', background: 'white', marginLeft: 12, marginBottom: 16 }}>{checking ? 'Checking…' : 'Run Zoho checks'}</button>}
      {report && <details open><summary>Verification results</summary><pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, marginBottom: 24 }}>{report}</pre></details>}
      <div ref={stage}>
        <div style={{ width: width * scale, height: height * scale, margin: 'auto', position: 'relative' }}>
          <iframe ref={frame} title="Comparison preview" src={`${path}?review=${refresh}`} style={{ position: 'absolute', top: 0, left: 0, width, height, border: 0, outline: '1px solid #DEE2DC', transform: `scale(${scale})`, transformOrigin: 'top left', background: 'white' }} />
        </div>
      </div>
    </div>
  </main>;
}

 + n.toLocaleString('en-AU', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2 });
    try {
      const doc = frame.current?.contentDocument;
      const win = frame.current?.contentWindow as (Window & typeof globalThis) | null;
      if (!doc || !win || path !== '/compare/zapla-vs-zoho-simple') throw new Error('Select the Zoho draft and let it load first.');
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
            const expected = money(people * (annual ? 32 : 50));
            const price = vendor?.querySelector('.cc-team-total');
            if (price?.firstChild) {
              const priceRange = doc.createRange();
              priceRange.selectNodeContents(price.firstChild);
              if (priceRange.getClientRects().length > 1) throw new Error('Price wraps across lines at ' + viewport + 'px.');
            }
            if (!total.startsWith(expected)) throw new Error(viewport + 'px / ' + people + ' seats / ' + (annual ? 'annual' : 'monthly') + ': ' + total);
            if (annual && !text.includes(money(people * 384) + ' paid upfront each year.')) throw new Error('Annual upfront total mismatch.');
            if (!annual && !text.includes('Billed monthly. No annual commitment.')) throw new Error('Missing monthly terms.');
            if (text.includes('Required onboarding:') || text.includes('Sales seat') || text.includes('with an annual commitment.')) throw new Error('Incorrect Zoho licence or commitment wording.');
            if (!doc.querySelector('.cc-team-zapla')?.textContent?.includes('A$399')) throw new Error('Zapla total changed.');
            results.push(viewport + 'px · ' + people + ' regular CRM users · ' + (annual ? 'annual' : 'monthly') + ' · PASS');
          }
        }
        for (const expanded of [false, true]) {
          doc.querySelectorAll('main details').forEach(detail => { (detail as HTMLDetailsElement).open = expanded; });
          await pause();
          if (doc.documentElement.scrollWidth > doc.documentElement.clientWidth) throw new Error('Horizontal overflow at ' + viewport + 'px.');
          results.push(viewport + 'px · ' + (expanded ? 'expanded' : 'collapsed') + ' layout · PASS');
        }
        const year = doc.querySelector('.cc-first-year')?.textContent ?? '';
        for (const amount of ['A$3,000', 'A$1,920', 'A$6,000', 'A$3,840', 'A$12,000', 'A$7,680', 'A$6,785']) {
          if (!year.includes(amount)) throw new Error('Missing first-year amount: ' + amount);
        }
        if ([...doc.images].some(image => image.complete && image.naturalWidth === 0)) throw new Error('Broken image.');
        if (doc.querySelector('meta[name="robots"]')?.getAttribute('content') !== 'noindex, nofollow') throw new Error('Draft indexing changed.');
      }
      results.push('First-year setup totals, images and noindex · PASS');
      setReport('24 Zoho calculator states and 8 layout states passed.\n' + results.join('\n'));
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
      <button type="button" onClick={runChecks} disabled={checking || path !== '/compare/zapla-vs-hubspot-simple'} style={{ minHeight: 44, padding: '8px 16px', borderRadius: 8, border: '1px solid #A2AEA6', background: 'white', marginBottom: 16 }}>{checking ? 'Checking…' : 'Run HubSpot checks'}</button>
      {path === '/compare/zapla-vs-creatio-simple' && <button type="button" onClick={runCreatioChecks} disabled={checking} style={{ minHeight: 44, padding: '8px 16px', borderRadius: 8, border: '1px solid #A2AEA6', background: 'white', marginLeft: 12, marginBottom: 16 }}>{checking ? 'Checking…' : 'Run Creatio checks'}</button>}
      {path === '/compare/zapla-vs-activecampaign-simple' && <button type="button" onClick={runActiveCampaignChecks} disabled={checking} style={{ minHeight: 44, padding: '8px 16px', borderRadius: 8, border: '1px solid #A2AEA6', background: 'white', marginLeft: 12, marginBottom: 16 }}>{checking ? 'Checking…' : 'Run ActiveCampaign checks'}</button>}
      {report && <details open><summary>Verification results</summary><pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, marginBottom: 24 }}>{report}</pre></details>}
      <div ref={stage}>
        <div style={{ width: width * scale, height: height * scale, margin: 'auto', position: 'relative' }}>
          <iframe ref={frame} title="Comparison preview" src={`${path}?review=${refresh}`} style={{ position: 'absolute', top: 0, left: 0, width, height, border: 0, outline: '1px solid #DEE2DC', transform: `scale(${scale})`, transformOrigin: 'top left', background: 'white' }} />
        </div>
      </div>
    </div>
  </main>;
}

