// Internal draft reviewer. Expected totals are an independent, explicit price-band oracle.
export async function checkMonday(frame: HTMLIFrameElement, resize: (width: number) => void): Promise<string> {
  const doc = frame.contentDocument;
  const win = frame.contentWindow as (Window & typeof globalThis) | null;
  if (!doc || !win) throw new Error('Preview is not ready.');
  const wait = () => new Promise<void>(resolve => window.setTimeout(resolve, 35));
  const range = doc.querySelector<HTMLInputElement>('#comparison-team-size');
  const radios = doc.querySelectorAll<HTMLInputElement>('input[name="comparison-billing"]');
  if (!range || radios.length !== 2) throw new Error('Select the monday CRM draft and let it load.');
  const bands = [
    [3,159,135,1620], [5,265,225,2700], [10,530,450,5400], [15,795,675,8100],
    [20,1060,900,10800], [25,1325,1125,13500], [30,1590,1350,16200], [40,2120,1800,21600],
  ];
  const money = (n: number) => 'A$' + n.toLocaleString('en-AU');
  const setter = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value')?.set;
  let states = 0;
  let layouts = 0;
  let marketingStates = 0;
  const mode = doc.querySelectorAll<HTMLButtonElement>('.cc-monday-mode button');
  if (mode.length !== 2) throw new Error('Marketing mode missing.');
  mode[0].click(); await wait();
  const setUsers = async (n: number) => { setter?.call(range, String(n)); range.dispatchEvent(new win.Event('input', { bubbles: true })); range.dispatchEvent(new win.Event('change', { bubbles: true })); await wait(); };
  const geometry = () => {
    if (doc.documentElement.scrollWidth > doc.documentElement.clientWidth + 1) throw new Error('Page overflow at ' + win.innerWidth);
    for (const cell of doc.querySelectorAll<HTMLElement>('.cc-table th,.cc-table td,.cc-cost-table th,.cc-cost-table td,.cc-team-results article')) {
      if (!cell.getClientRects().length || (cell.closest('thead') && cell.closest('thead')!.getBoundingClientRect().height <= 1)) continue;
      if (cell.scrollWidth > cell.clientWidth + 1) throw new Error('Cell overflow: ' + cell.textContent);
      const bounds = cell.getBoundingClientRect();
      const walker = doc.createTreeWalker(cell, win.NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (!node.textContent?.trim() || node.parentElement?.closest('.sr-only,.cc-mobile-vendor,.cc-cost-vendor')) continue;
        const text = doc.createRange(); text.selectNodeContents(node);
        for (const r of text.getClientRects()) {
          if (!r.width || !r.height) continue;
          if (r.left < bounds.left - 1 || r.right > bounds.right + 1 || r.top < bounds.top - 1 || r.bottom > bounds.bottom + 1) throw new Error('Clipped cell text at ' + win.innerWidth + ': ' + node.textContent);
        }
      }
    }
  };
  for (const width of [375,390,768,1440]) {
    resize(width); await wait(); await wait();
    if (win.innerWidth !== width) throw new Error('Width did not settle.');
    for (const annual of [false,true]) {
      radios[annual ? 1 : 0].click(); await wait();
      for (let n = 1; n <= 100; n++) {
        await setUsers(n);
        const band = bands.find(b => n <= b[0]);
        const vendor = doc.querySelectorAll('.cc-team-results article')[1];
        const text = vendor?.textContent || '';
        const result = doc.querySelector('.cc-monday-difference')?.textContent || '';
        if (band) {
          const expected = band[annual ? 2 : 1];
          if (vendor?.querySelector('.cc-team-total')?.firstChild?.textContent !== money(expected)) throw new Error('Price mismatch at ' + n + ' / ' + annual);
          if (!text.includes(`${band[0]} paid seats for ${n}`)) throw new Error('Seat bundle mismatch.');
          if (annual && !text.includes(money(band[3]) + ' paid annually upfront.')) throw new Error('Annual total mismatch.');
          if (!annual && !text.includes('Billed monthly.')) throw new Error('Monthly label missing.');
          const difference = expected - 399;
          if (!result.includes((difference > 0 ? 'Zapla’s' : 'monday’s compared') + ' subscription is ' + money(Math.abs(difference)) + '/month less')) throw new Error('Difference mismatch.');
        } else if (!text.includes('Current quote required') || vendor?.querySelector('.cc-team-total') || result) throw new Error('Quote state extrapolated.');
        if (!doc.querySelector('.cc-team-zapla')?.textContent?.includes('A$399')) throw new Error('Zapla price changed.');
        geometry(); states++;
      }
    }
    await setUsers(5);
    mode[1].click(); await wait();
    const select = doc.querySelector<HTMLSelectElement>('#monday-marketing-contacts')!;
    const contactSetter = Object.getOwnPropertyDescriptor(win.HTMLSelectElement.prototype, 'value')?.set;
    for (const annual of [false,true]) {
      radios[annual ? 1 : 0].click(); await wait();
      for (const contacts of [2000,4000,7000,12000,27000,52000,60000]) {
        contactSetter?.call(select, String(contacts)); select.dispatchEvent(new win.Event('change', {bubbles:true})); await wait();
        const quote = doc.querySelector<HTMLInputElement>('#monday-campaigns-quote');
        const vendor = doc.querySelectorAll('.cc-team-results article')[1];
        if (!doc.querySelector('.cc-team-zapla')?.textContent?.includes('A$699') || !doc.querySelector('.cc-team-zapla')?.textContent?.includes('A$2,997')) throw new Error('Growth subscription/launch incorrect.');
        if (doc.querySelector('.cc-monday-difference')) throw new Error('Unquoted marketing savings invented.');
        if (contacts === 60000) {
          if (quote || !vendor?.textContent?.includes('Custom marketing package required.')) throw new Error('Custom contacts extrapolated.');
        } else {
          if (!quote || quote.value !== '') throw new Error('Quote did not reset for new band.');
          if (!vendor?.textContent?.includes((contacts * 10).toLocaleString('en-AU') + ' pooled email sends/month')) throw new Error('Email allowance incorrect.');
          // Test inputs are synthetic amounts, never represented as observed vendor prices.
          setter?.call(quote, annual ? '1440' : '120'); quote.dispatchEvent(new win.Event('input',{bubbles:true})); await wait();
          if (vendor?.querySelector('.cc-team-total')?.firstChild?.textContent !== (annual ? 'A$345' : 'A$385')) throw new Error('Combined quote arithmetic incorrect.');
          if (annual && !vendor?.textContent?.includes('A$4,140 annually upfront in total.')) throw new Error('Combined annual total incorrect.');
          setter?.call(quote,'1000000'); quote.dispatchEvent(new win.Event('input',{bubbles:true})); await wait(); geometry();
          setter?.call(quote,'-1'); quote.dispatchEvent(new win.Event('input',{bubbles:true})); await wait();
          if (!doc.querySelector('[role="alert"]') || doc.querySelector('.cc-monday-difference')) throw new Error('Invalid quote accepted.');
        }
        geometry(); marketingStates++;
      }
    }
    for (const expanded of [false,true]) {
      doc.querySelectorAll<HTMLDetailsElement>('main details').forEach(d => { d.open = expanded; });
      await wait(); geometry(); layouts++;
    }
    mode[0].click(); await wait();
    await setUsers(31);
    for (const expanded of [false,true]) {
      doc.querySelectorAll<HTMLDetailsElement>('main details').forEach(d => { d.open = expanded; });
      await wait(); geometry(); layouts++;
    }
    if ([...doc.images].some(i => i.complete && !i.naturalWidth)) throw new Error('Broken image.');
    if (doc.querySelector('meta[name="robots"]')?.getAttribute('content') !== 'noindex, nofollow') throw new Error('Noindex missing.');
    const annualTable = doc.querySelector('.cc-cost-table')?.textContent || '';
    for (const amount of [3180,2700,4788,6360,5400,9540,8100]) if (!annualTable.includes(money(amount))) throw new Error('Annual example missing.');
    if (annualTable.includes('6,785')) throw new Error('Setup added to subscription table.');
    for (const a of doc.querySelectorAll<HTMLAnchorElement>('.concise-comparison a[href^="#"]')) if (!doc.getElementById(a.hash.slice(1))) throw new Error('Broken anchor.');
    for (const a of doc.querySelectorAll<HTMLAnchorElement>('.cc-actions a')) if (!['/booking','/Pricing-v3','#comparison'].includes(a.getAttribute('href') || '')) throw new Error('CTA destination changed.');
  }
  doc.querySelectorAll<HTMLDetailsElement>('main details').forEach(d => { d.open = false; });
  radios[0].click(); await setUsers(5); resize(1440);
  return `${states} CRM states, ${marketingStates} marketing contact/billing states and ${layouts} expanded/collapsed layouts passed at 375, 390, 768 and 1440px.\nAll users 1–100, both billing options; seat boundaries, quote states, differences and annual upfront totals.\nPage overflow and individual table/card text bounds checked in every state. Annual examples, separate launch, images, anchors, CTA hrefs and noindex passed.\nThis is rendered output verification, not account-level vendor testing or a claim that every external destination was navigated.`;
}
