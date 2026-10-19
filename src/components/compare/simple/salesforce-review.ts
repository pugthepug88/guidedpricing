// Internal draft QA. Expected totals come from the approved AUD price evidence.
export async function checkSalesforce(frame: HTMLIFrameElement, setWidth: (width: number) => void) {
  const doc = frame.contentDocument;
  const win = frame.contentWindow as (Window & typeof globalThis) | null;
  if (!doc || !win) throw new Error('Let the Salesforce draft load first.');
  const input = doc.querySelector<HTMLInputElement>('#salesforce-people');
  const slider = doc.querySelector<HTMLInputElement>('#salesforce-team-size');
  if (!input || !slider) throw new Error('Salesforce calculator missing.');
  const pause = () => new Promise(resolve => window.setTimeout(resolve, 60));
  const money = (n: number) => 'A$' + n.toLocaleString('en-AU');
  const change = async (element: HTMLInputElement, value: string) => {
    Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value')?.set?.call(element, value);
    element.dispatchEvent(new win.Event('input', { bubbles: true }));
    element.dispatchEvent(new win.Event('change', { bubbles: true }));
    await pause();
  };
  const results: string[] = [];
  const layout = () => {
    if (doc.documentElement.scrollWidth > doc.documentElement.clientWidth) throw new Error('Page overflow.');
    for (const el of doc.querySelectorAll<HTMLElement>('main td, main th, main article, main summary, .cc-team-total, .sf-difference')) {
      if (el.getClientRects().length && el.scrollWidth > el.clientWidth + 2) throw new Error('Cell clipping: ' + el.textContent?.slice(0, 100));
    }
  };
  for (const width of [375, 390, 768, 1440]) {
    setWidth(width); await pause();
    if (win.innerWidth !== width) throw new Error('Viewport did not settle.');
    for (let people = 1; people <= 100; people++) {
      await change(input, String(people));
      const vendor = doc.querySelectorAll('.cc-team-results article')[1];
      if (!vendor?.querySelector('.cc-team-total')?.textContent?.startsWith(money(people * 140) + '/')) throw new Error('Monthly total: ' + people);
      if (!vendor.textContent?.includes(money(people * 1680) + ' billed annually. Annual contract.')) throw new Error('Annual total: ' + people);
      const zapla = doc.querySelector('.cc-team-zapla')?.textContent ?? '';
      for (const value of ['A$399', 'A$4,788', 'A$1,997']) if (!zapla.includes(value)) throw new Error('Zapla price: ' + value);
      const difference = doc.querySelector('.sf-difference')?.textContent ?? '';
      if (!difference.includes(people < 3 ? 'Salesforce’s subscription' : 'Zapla’s subscription')) throw new Error('Crossover direction.');
      if (!difference.includes(money(Math.abs(people * 140 - 399)))) throw new Error('Difference amount.');
      layout();
    }
    for (const invalid of ['', '0', '-1', '1.5']) {
      await change(input, invalid);
      if (!doc.querySelector('[role="status"]') || doc.querySelector('.sf-difference')) throw new Error('Invalid input was priced.');
    }
    await change(input, '101');
    if (!doc.querySelector('.cc-team-results')?.textContent?.includes('Compare a current team quote')) throw new Error('Quote state missing.');
    await change(slider, '5');
    const button = doc.querySelector<HTMLButtonElement>('.sf-large-team');
    button?.click(); await pause();
    if (!doc.querySelector('.cc-team-results')?.textContent?.includes('Compare a current team quote')) throw new Error('Quote button failed.');
    button?.click(); await pause();
    for (const expanded of [false, true]) {
      doc.querySelectorAll('main details').forEach(el => { (el as HTMLDetailsElement).open = expanded; });
      await pause(); layout();
    }
    for (const link of doc.querySelectorAll<HTMLAnchorElement>('main a[href^="#"]')) {
      if (link.hash.length > 1 && !doc.getElementById(decodeURIComponent(link.hash.slice(1)))) throw new Error('Broken anchor: ' + link.hash);
    }
    if ([...doc.images].some(img => img.complete && img.naturalWidth === 0)) throw new Error('Broken image.');
    if (doc.querySelector('meta[name="robots"]')?.getAttribute('content') !== 'noindex, nofollow') throw new Error('Indexing changed.');
    results.push(`${width}px: all 100 team sizes, invalid inputs, quote states, slider, collapsed/expanded layout, cells, anchors, images and noindex PASS`);
  }
  doc.querySelectorAll('main details').forEach(el => { (el as HTMLDetailsElement).open = false; });
  return '400 calculator configurations and 8 full-page layout states passed.\n' + results.join('\n');
}
