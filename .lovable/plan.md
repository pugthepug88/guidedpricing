
# Homepage refocus: kill the 4-card section, ship one signature video

## The strategic move

The current 4-card "AI Marketing" section repeats what the dark section above already says and re-inflates the page we've been trying to trim. Move it off the homepage, replace the slot with **one signature moment** that carries the pitch visually.

## Part 1 — Move the products section to /products

Create a new route `src/routes/products.tsx` with its own SEO metadata. Move the four product pillars (Zapla Marketing, Zapla Reputation, Zapla+ Ads, Zapla+ PR) there in a clean 2x2 grid restyled to the light Zapla palette (no dark neon, no competing animations). Add a link from the main nav.

The homepage no longer tries to explain all four products in detail. It teases the outcome; /products carries the depth.

## Part 2 — Replace the homepage slot with the Chaos-to-Calm video

An 8-second Remotion motion graphic, rendered to MP4, embedded on the homepage. Autoplays once when scrolled into view (with a replay button). Not scroll-scrubbed on the first pass — autoplay is more reliable across devices and doesn't hijack scroll.

### Storyboard (8 seconds @ 30fps = 240 frames)

```text
0.0s ──────── 2.5s ──────── 5.5s ──────── 8.0s
CHAOS         PULL           REVEAL        HOLD
```

**Scene 1 — Chaos (0.0–2.5s):** ~14 grayscale UI cards scattered across the frame at random rotations. Each card is a real thing your ICP juggles today: a Meta Ads notification, a Google Review, a Xero invoice, a missed call, a Calendly booking, a Mailchimp draft, a spreadsheet row, a WhatsApp DM, a Stripe payout, a GHL contact, a Canva design, a TikTok comment. Subtle idle drift on each. Muted lavender-gray background.

**Scene 2 — Pull (2.5–5.5s):** All cards accelerate inward toward a single point. As each card reaches the center it colorizes for a single frame and vanishes into a growing Zapla mark. Staggered arrivals so it feels like consolidation, not implosion.

**Scene 3 — Reveal (5.5–7.0s):** The Zapla mark scales up, one clean dashboard card materializes in full brand color showing a live-feeling summary (lead count, review score, ROAS). Single line of copy fades in: **"One system. Everything runs."**

**Scene 4 — Hold (7.0–8.0s):** Hold on the calm final frame. Small "Book a Call" CTA appears beneath the video.

### Design commitments

- Palette locked to the Zapla lavender + white + accent stack already in the site — no new colors.
- Font locked to the site's `font-zapla` for the payoff line.
- One motion system: spring-based ease on all card motion, one accent spring on the payoff line. No mixed easings.
- No sound. Never autoplay audio.

### Technical shape

- Remotion project scaffolded at `remotion/` per the video-creator skill.
- Composition: 1920x1080, 30fps, 240 frames.
- Render to `public/videos/chaos-to-calm.mp4` (and a `.webm` fallback) so it ships with the site.
- Homepage embeds via a `<video>` element with `autoPlay muted playsInline` and an IntersectionObserver that triggers playback on scroll-into-view. Replay button beneath.
- Poster image = final frame (rendered as a still via `bunx remotion still`) so the page never shows a black box before the video loads.

### What we're NOT doing (guardrails)

- No live scroll-scrubbed animation. Rendered MP4 only.
- No custom illustrated character. The cards are the character.
- No sound design in v1.
- No parallel animations on the same page section — this video is the moment; the rest of that band stays still.

## Part 3 — Motion diet on the surrounding sections

Ship this video AND calm the neighbors, or the video won't land. Concurrent with the above:

- Blob tabs: keep click-only (already done). No auto-cycle.
- Industries carousel: kill the auto-cycle timer. Click/arrow only.
- Hero orbs and floating chips: reduce loop count or remove — pick during implementation.

## Build order

1. Scaffold `/products` route, move the 4 cards there, restyle to light palette, wire nav link.
2. Remove the 4-card section from the homepage; leave an empty slot.
3. Scaffold Remotion project, build the 4 scenes, render MP4 + poster still.
4. Add `<VideoBlock />` component to the homepage in the freed slot, wired to autoplay-on-view.
5. Apply the motion diet to blobs / industries / hero.
6. Verify on mobile — video must not blow the layout, must be tap-to-replay friendly.

## Technical notes

- Remotion renders inside the sandbox via `code--exec`; MP4 goes into `public/videos/` and ships with the deploy.
- Autoplay requires `muted` + `playsInline` on iOS. Non-negotiable.
- Poster image (final frame PNG) prevents CLS.
- If the MP4 comes in over ~2MB, re-encode with `--crf=23` or drop to 24fps.
- One iteration cycle: if scene 1 or scene 2 doesn't land after render, we tune timing/spring configs and re-render — cheap.

## Open decisions to lock before I start building

1. Which 12–14 tools/notifications should appear as the scattered cards? I'll propose a list based on your ICP; you approve or swap.
2. Payoff copy: "One system. Everything runs." — approve or rewrite.
3. Do we ship the /products page in the same session, or homepage-only first and /products next session?
