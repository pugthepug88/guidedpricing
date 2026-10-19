// Internal browser review, invoked only from /comparison/review.
// Expected totals are independent fixture values, not imports from pricing code.
export async function reviewKeap(
  frame: HTMLIFrameElement,
  setWidth: (width: number) => void,
  report: (message: string) => void,
) {
  const doc = frame.contentDocument;
  const win = frame.contentWindow as (Window & typeof globalThis) | null;
  if (!doc || !win || !doc.querySelector('.keap-pricing')) throw new Error('Load the Keap draft first.');
  const pause = () => new Promise<void>(resolve => window.setTimeout(resolve, 35));
  const users = doc.querySelector<HTMLInputElement>('#keap-users')!;
  const contacts = doc.querySelector<HTMLSelectElement>('#keap-contacts')!;
  const radios = doc.querySelectorAll<HTMLInputElement>('input[name="keap-billing"]');
  const setUser = async (value: number) => {
    Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value')!.set!.call(users, String(value));
    users.dispatchEvent(new win.Event('input', { bubbles: true }));
    users.dispatchEvent(new win.Event('change', { bubbles: true }));
    await pause();
  };
  const setContacts = async (value: number) => {
    contacts.value = String(value);
    contacts.dispatchEvent(new win.Event('change', { bubbles: true }));
    await pause();
  };
  const assert = (ok: unknown, message: string) => { if (!ok) throw new Error(message); };
  const layout = (width: number) => {
    assert(doc.documentElement.scrollWidth <= doc.documentElement.clientWidth, `Page overflow at ${width}`);
    for (const cell of doc.querySelectorAll<HTMLElement>('.cc-table td, .cc-table th, .cc-cost-table td, .cc-cost-table th, .keap-results article')) {
      if (!cell.getClientRects().length) continue;
      assert(cell.scrollWidth <= cell.clientWidth + 1, `Cell clipping at ${width}: ${cell.textContent}`);
    }
    for (const price of doc.querySelectorAll('.keap-price')) {
      const range = doc.createRange();
      range.selectNodeContents(price.firstChild!);
      assert(range.getClientRects().length === 1, `Price wraps at ${width}`);
    }
  };
  // Five-user fixture independently reconciles published bands + three extra users.
  const fiveUserQuotes = [[1500,416],[2500,452],[4000,500],[6500,566],[11500,656],[16500,746],[26500,836]];
  let priced = 0, quotes = 0, layouts = 0;
  for (const width of [375,390,768,1440]) {
    setWidth(width); await pause();
    assert(win.innerWidth === width, 'Viewport did not settle');
    radios[0].click(); await pause();
    for (const [allowance, five] of fiveUserQuotes) {
      await setContacts(allowance);
      for (let people = 1; people <= 50; people++) {
        await setUser(people);
        const expected = five + (Math.max(2, people) - 5) * 39;
        assert(doc.querySelector('[data-keap-total]')?.textContent?.startsWith('US$' + expected.toLocaleString('en-AU')), `${width}/${people}/${allowance}: price mismatch`);
        layout(width); priced++;
      }
      radios[1].click(); await pause();
      assert(doc.querySelector('.keap-quote')?.textContent === 'Request an annual quote for this configuration', 'Annual quote missing');
      assert(!doc.querySelector('[data-keap-total]'), 'Invented annual price');
      layout(width); quotes++;
      radios[0].click(); await pause();
    }
    for (const people of [0,51,100,1.5]) {
      await setUser(people);
      assert(doc.querySelector('.keap-quote')?.textContent === 'Current Keap quote required', 'Boundary quote missing'); quotes++;
    }
    await setUser(2); await setContacts(0);
    assert(doc.querySelector('.keap-quote')?.textContent === 'Current Keap quote required', 'Custom contact quote missing'); quotes++;
    await setContacts(1500);
    for (const expanded of [false,true]) {
      doc.querySelectorAll<HTMLDetailsElement>('main details').forEach(detail => { detail.open = expanded; });
      await pause(); layout(width); layouts++;
    }
    assert([...doc.images].every(image => image.complete && image.naturalWidth > 0), 'Unloaded/broken image');
    assert(doc.querySelector('meta[name="robots"]')?.getAttribute('content') === 'noindex, nofollow', 'Indexing changed');
    const text = doc.querySelector('main')?.textContent ?? '';
    for (const required of ['US$3,588','US$4,992','US$6,792','A$4,788 + GST','one-time US$500','initial six-month minimum','A$1,997 + GST','500-message allowance','8 connected numbers']) assert(text.includes(required), `Missing ${required}`);
    assert(!doc.querySelector('.cc-cost-table')?.textContent?.includes('6,785'), 'Setup leaked into subscription table');
    for (const link of doc.querySelectorAll<HTMLAnchorElement>('main a[href^="#"]')) assert(doc.querySelector(link.getAttribute('href')!), 'Broken internal anchor');
    report(`${priced} priced states; ${quotes} quote states; ${layouts} layouts passed through ${width}px.`);
  }
  doc.querySelectorAll<HTMLDetailsElement>('main details').forEach(detail => { detail.open = false; });
  report(`PASS: ${priced} priced states, ${quotes} quote states, ${layouts} expanded/collapsed layouts at 375/390/768/1440px. Subscription totals, setup disclosures, noindex, images, anchors, page overflow, cell clipping and price wrapping checked.`);
}
