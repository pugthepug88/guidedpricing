
# Chaos-to-Calm v2: substantial cards + mascot + sticky scroll-scrub

We rebuild the Remotion video from a Z-mark montage into a monday-style piece: 7 large, believable UI cards drift in chaos, then pull into an illustrated Zapla character in the middle. The section on the homepage pins while you scroll — scroll progress scrubs the video frame-by-frame.

## Part 1 — The mascot (central figure)

Replace the "Z" mark with an illustrated character. Because we can't hand-draw one in-session and monday's astronaut is instantly recognisable, we generate a bespoke Zapla mascot as a transparent PNG once and reuse it in the video.

Mascot brief:
- Line-art style, warm ink strokes, minimal fill (matches monday's aesthetic energy without copying the astronaut).
- Concept: **"The Zapla Operator"** — a calm, modern human figure (unisex, ambiguous, friendly) wearing a lightweight headset, one hand relaxed, standing three-quarter view. Not sci-fi, not a robot. Reads as "the person Zapla becomes for you."
- Transparent background, front-lit, on a solid white backdrop for the prompt.
- Generated once with `imagegen` (premium) at ~1200x1600, saved to `remotion/public/mascot.png`.

If you'd rather go non-human (glowing orb, phone, dashboard), say so before I generate — swapping the centerpiece later means re-rendering.

## Part 2 — The 7 cards (substantial, monday-scale)

Each card is a mini-UI, not a tiny chip. ~360–460px wide with real content, borders, and micro-details so it reads as "a real product surface":

1. **Conversations** — unified inbox: WhatsApp + Instagram DM + SMS + Email rows, one message preview each, unread dot.
2. **Reviews** — 5-star card with a real-looking review paragraph, Google/Facebook logo, reviewer initial + name.
3. **Bookings** — mini calendar week strip with 3 booked slots highlighted, "Next: Tue 2:30pm — Consult".
4. **Invoicing** — Xero-style invoice row: invoice #, client, amount, "Paid" pill; small mini-chart of monthly cash below.
5. **Documents & Contacts** — file list (Proposal.pdf, Contract.docx) + a contact card below with avatar + phone.
6. **NFC Payments** — phone-tap illustration: card icon + phone icon with a ripple, "$240 tapped — 2s ago".
7. **Workflow Automations** — node graph: 3 connected pills (Trigger → AI reply → Book) with a small "Live" indicator.

All cards are grayscale + slightly muted during chaos, then colorize into brand tones one-by-one as they reach the mascot.

## Part 3 — The motion

8 seconds → **12 seconds** (360 frames @ 30fps) so 7 substantial cards have room to breathe.

```text
0.0s ──── 3.0s ──────── 8.5s ──────── 12.0s
CHAOS     PULL           REVEAL         HOLD
```

- **Chaos (0–3s):** Mascot faintly visible in center from frame 0 (so scroll-scrub feels anchored). 7 cards float at edges with slow drift + micro-rotation. Muted lavender-gray background, faint grid.
- **Pull (3–8.5s):** Cards accelerate inward, staggered ~15 frames apart. As each card reaches the mascot it colorizes for ~8 frames then absorbs (scales to 0 behind the mascot). Mascot brightens with each absorption — subtle glow ramp.
- **Reveal (8.5–11s):** Final card lands. Mascot is now full color, calm, one clean dashboard chip floats up beside them showing 3 KPIs (Leads / Reviews / ROAS). Payoff line fades in: **"One system. Everything runs."**
- **Hold (11–12s):** Static composure frame — this is the frame the scroll-pin releases on and the poster image.

Spring-based ease on all card motion. One accent spring on the payoff line. No competing curves.

## Part 4 — Sticky scroll-scrub on the homepage

New component `src/components/ChaosToCalmScrollScrub.tsx`:

- Outer wrapper is `h-[250vh]` (2.5× viewport). Inside, a `sticky top-0 h-screen` container holds the `<video>`.
- The `<video>` has `muted playsInline preload="auto"`, no `autoplay`, no `controls`, no `loop`.
- On mount, `video.pause()`. A scroll handler (rAF-throttled, IntersectionObserver-gated so it only runs when the sticky section is visible) maps scroll progress `0 → 1` across the wrapper's bounding rect to `video.currentTime = progress * video.duration`.
- iOS Safari: setting `currentTime` on a paused `muted playsInline` MP4 works reliably; no autoplay needed. We keep the video muted and never play() it.
- Reduced-motion (`prefers-reduced-motion`): skip the scrub, show poster image + copy statically.
- Mobile fallback: on `<640px` the sticky wrapper still works, but we reduce the outer height to `h-[180vh]` so it doesn't feel endless.

Wired into `src/routes/hero-preview.tsx` in the same slot where `ChaosToCalmVideo` currently sits. The old autoplay component is removed.

## Part 5 — Re-render pipeline

1. Generate mascot PNG once via `imagegen` (premium, transparent bg) → `remotion/public/mascot.png`.
2. Rebuild `remotion/src/ChaosToCalm.tsx`:
   - Bump composition duration to 360 frames.
   - Load mascot with `staticFile("mascot.png")` and `<Img>`.
   - Replace 12 small chips with 7 substantial card components in their own file `remotion/src/Cards.tsx` (one component per card with real content).
   - Rewrite pull arithmetic for 7 arrivals + longer runway.
3. Re-render MP4 + poster still via existing `remotion/scripts/render.mjs`.
4. Also render a `.webm` (VP9) alongside for smaller file size on Chromium browsers — `<video>` gets both `<source>` tags.
5. Verify final MP4 ≤ ~2.5MB; if larger, bump CRF to 24 or drop to 24fps.

## What we're NOT doing

- Not autoplay. Scroll-scrub only, with reduced-motion fallback to poster.
- Not adding sound.
- Not touching `/products`, blob tabs, or the motion diet — that's already shipped.
- Not iterating on the mascot's face/pose beyond one generation pass this session — if you hate v1 we regenerate before rendering, not after.

## Open items before I build

1. **Mascot vibe** — human operator with headset (my recommendation), or would you rather I try: (a) a friendly abstract character (blob with eyes), (b) a stylized hand/glove holding everything, or (c) skip mascot and use a phone showing the Zapla app after all? Same session cost either way.
2. **Payoff copy** — keep "One system. Everything runs." or swap.
3. **Section height on desktop** — 250vh (my default) means users scroll ~1.5 extra screens through the pinned section. Fine, or should it be tighter (180vh)?
