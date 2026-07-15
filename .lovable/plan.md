## Goal

Give you a real page to see all 4 character concepts rendered together, then pick one to build into the actual homepage scroll story. No commitment on the homepage yet — this is a decision-making artifact.

## What I'll build

A new route at `/character-lab` (not linked from anywhere public) containing four full-bleed sections stacked vertically — one per concept. Each section shows the character rendered at hero-scale on the left, and on the right: the concept name, one-line pitch, the scroll mechanic it enables, and a "why this works for Zapla" note.

### The four concepts I'll render

**1. The Faceless Operator**
- A stylized 3D figure in a Zapla-blue jumpsuit and headset. No visible face features, no skin tone, no gender/age signals — the same silhouette-avatar language Apple and Meta use for universal representation.
- Scroll mechanic: figure stays centered, category cards (Bookings, Reviews, Invoicing, Conversations, Ads, Automations) orbit into place around them as you scroll. Reads as "one operator running everything."
- Why: Neutral, premium, ageless. Works for any business owner.

**2. The Zapla Companion**
- A small round soft-3D "bead" character with two eyes and a subtle Zapla-blue gradient. Not a human. Think: a friendlier Cortana orb, or Intercom's Fin, but with Zapla brand identity.
- Scroll mechanic: the companion floats beside a phone/laptop and hands off tasks. Cards slide out of it as if it's presenting them.
- Why: The AI *is* the character, not the user. Universal because it's not human. Very "AI assistant" positioning — matches Zapla's "one system runs your business" pitch.

**3. The Everyperson Doodle**
- One warm hand-drawn illustrated cartoon person: big head, small body, oversized smile, deliberately ambiguous features. Notion/Slack illustration style. Wears a small item that changes as you scroll (headset → apron → clipboard → phone) to signal universality across trades.
- Scroll mechanic: doodle sits at a desk in the center. As you scroll, thought-bubble cards pop out of their head showing what Zapla just handled for them.
- Why: Approachable, warm, human — the antithesis of cold enterprise SaaS. Duolingo/Mailchimp energy but adult.

**4. The Living Logo**
- Zapla's own rounded-square logo mark gets two dots for eyes. It tilts, leans, blinks, "catches" cards. Pure geometric personality, like Pixar's Luxo lamp.
- Scroll mechanic: logo sits center-frame. Cards fly toward it and it leans/tilts to receive each one. Final frame: the logo is smiling with all category cards docked around it.
- Why: The character IS your brand mark. Every impression doubles as logo recall. Ownable IP forever.

### Image generation

I'll generate a hero character image for each concept using the image tool, saved into `src/assets/character-lab/`. Rendered at ~1024×1024 each, styled to feel like they belong to the same brand family (Zapla blues, off-white background, clean, no photographic clutter).

### Layout of the page

```text
+--------------------------------------------------+
|  /character-lab                                  |
|--------------------------------------------------|
|  "Pick a character direction"                    |
|  (short intro paragraph)                         |
|--------------------------------------------------|
|  [ Concept 1: Faceless Operator ]                |
|  [ character image ] | [ name, pitch, mechanic ] |
|--------------------------------------------------|
|  [ Concept 2: Zapla Companion ]                  |
|  [ character image ] | [ name, pitch, mechanic ] |
|--------------------------------------------------|
|  [ Concept 3: Everyperson Doodle ]               |
|  [ character image ] | [ name, pitch, mechanic ] |
|--------------------------------------------------|
|  [ Concept 4: Living Logo ]                      |
|  [ character image ] | [ name, pitch, mechanic ] |
+--------------------------------------------------+
```

Each section is 90vh, alternating background subtly (white / light Zapla tint) so they read as distinct.

### After you pick

Once you tell me which concept wins, I'll:
1. Kill the current mascot + Remotion video from `/hero-preview`.
2. Rebuild the scroll section using the chosen character and its specific scroll mechanic.
3. Full color, no chaos-to-calm framing — just "one system, everything runs" told the concept's way.

## Technical notes

- New route: `src/routes/character-lab.tsx`. Not added to any nav — you access it directly at `/character-lab`.
- Four character images generated via `imagegen` into `src/assets/character-lab/{operator,companion,doodle,logo}.png`.
- No changes to `hero-preview.tsx`, `products.tsx`, or the Remotion project in this step.
- No new dependencies.

## Out of scope for this step

- Building any of the actual scroll animations.
- Touching the current homepage / hero-preview.
- Rendering new video.
- Removing the existing mascot or chaos-to-calm assets. Those stay put until you pick.
