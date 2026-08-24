# Zapla Video / Motion Creative System

**Status:** Authoritative source of truth for current Zapla homepage and concept video/motion work.  
**Applies to:** hero films, video generation, motion concepts, footage replacement, Remotion compositions, Lovable video implementations, and any scroll-driven product narrative that mixes footage with UI.

---

## Purpose / Governing Promise

- **Primary hero promise:** “You lead. Zapla follows through.”
- Every scene must be designed backwards from this promise, not from available footage or a cool-looking shot.
- **Governing question before generation or build:** what is the clearest visual proof that Zapla does something important while the operator is occupied, absent, or should not have to handle it?
- **Human truth is supplied by film.** The operator stays focused on real work. **Product truth is supplied by the Zapla website/animation.** The system advances the customer. Do not collapse these two roles into one.

---

## Story-First Gate (do not generate/build until passed)

A concept must survive a contradiction test with explicit answers:

1. **Exact promise being proven.**
2. **What the viewer understands with all copy removed.**
3. **What the human is doing.**
4. **What Zapla is doing.**
5. **Why those roles are visibly different.**
6. **Why the human cannot/should not handle the follow-through at that moment.**
7. **Cause → Zapla action → customer outcome.**
8. **Plausible sceptical misread.** How could a viewer misunderstand this scene?
9. **Whether the scene accidentally narrows Zapla to one feature.** Does it look like Zapla is only an AI receptionist, only a scheduler, only a CRM, etc.?

### Concept discipline

- Challenge the first concept with at least one materially different alternative. Do not incrementally polish a weak incumbent merely because it already exists.
- **Kill a concept** if the operator performs the very follow-through Zapla is supposed to own.
- Never let implementation availability, previous footage, or an already-generated asset become the creative constraint.

---

## Current Mechanic Canonical Story / Rejected Version

### Rejected direction

A mechanic picks up, checks, or pockets a phone and then resumes work. This weakens the promise because the viewer can reasonably conclude the mechanic could handle the enquiry himself.

### Canonical direction

A contemporary mechanic is physically occupied under or on a modern 2024–2026 vehicle on a hoist. An unattended phone on a nearby trolley or bench rings or vibrates. The mechanic does **not** stop skilled work. A website overlay or product layer shows Zapla answering, understanding, and advancing the customer — for example: incoming call → AI answered → need understood → availability checked → booking confirmed. The mechanic remains focused throughout.

### Source footage rules

- Keep generated source footage clean. Do not bake Zapla UI, text, logos, or final copy into the AI video.
- UI/activity belongs in the website/Remotion overlay so timing, copy, and transitions into the real customer record can be iterated without regenerating footage.
- Do not make every vertical about AI phone answering. The mechanic may use call handling, while builder / broker / consultant / facilities worlds should show different follow-through flows so Zapla is not positioned only as an AI receptionist.

---

## Cinematography / Art Direction

- Premium contemporary SaaS brand film. Observational documentary-commercial, not generic AI stock.
- Profession and context must read without a label.
- Prefer skilled work, hands/tools/material/environment/human motion over posed people.
- **Modernity is mandatory.** Current vehicles, current workplaces, believable 2026 details. Reject imagery that feels dated.
- Controlled palette, directional/practical light, depth, foreground occlusion, tactile texture, clear focal hierarchy, intentional negative space.
- Avoid: broad flat lighting, glossy stock-photo posing, face-forward AI actors, excessive colourful clutter, old/vintage cues unless intentionally required, sci-fi/futuristic AI tropes, over-acting.
- Faces are not forbidden, but only show enough human expression/eyeline when needed to communicate a decision. The work remains the hero.
- Footage must still feel premium if all Zapla copy/UI is hidden.

---

## Website / Motion Layer

- Treat video and UI as **one causal composition**, not “video plus decorative floating card.”
- Use restrained live activity cues tied to events in the footage. The overlay should show Zapla’s invisible work and may morph/transition into the actual CRM/customer record later in the scroll.
- Motion must communicate cause/effect and customer progression, not decoration.
- Avoid: giant floating SaaS cards, bento overlays, arbitrary pills/badges, glows, gradients, neon, unrelated UI clutter.
- State progression must be beat/scroll driven and monotonic where appropriate. Never use an arbitrary looping timer that can regress customer state against the product payoff.

---

## Generation / Economics

- Expensive high-quality models are final cameras, not sketchbooks. Explore concept/story cheaply when possible; only spend premium generation credits after the narrative gate passes.
- Generate one strong candidate when one is enough; do not automatically generate two or more.
- Before any paid batch, know: model, resolution, duration, count, approximate credit cost, and why that configuration is necessary.
- Keep generation masters at native high quality; never judge/ship based only on technical resolution. Resolution does not equal cinematography.

---

## QA Must Be End-to-End, Not User-Operated

The user should not have to download/re-upload generated videos for us to inspect.

### Current QA bridge

OpenArt result/CDN → Lovable downloads → `ffprobe` + normal-speed inspection + contact sheets/frame samples → compare with incumbent.

### Minimum inspection checklist

- First frame
- Mid/action frames
- Most dynamic moment
- Final hold
- Artifacts
- Continuity
- Anatomy/hands/tools
- Profession readability
- Modernity
- Brand fit
- Mobile crop / desktop crop
- Headline overlap
- Timing/story
- File metadata

### Scoring

Score at minimum: premium visual feel, story clarity, AI realism, Zapla fit. A better clip than incumbent is not automatically shippable.

- **9–10:** ship-worthy.
- **7–8:** promising but likely another pass.
- **≤6:** do not present as a final recommendation.

Always compare against the actual incumbent footage/render, not memory.

---

## Delivery / Performance

- Never serve huge generation masters directly just because they look good.
- Preserve master plus separate web encodes/poster.
- Desktop web target for an ~8–10s hero should generally aim around 2–4 MB if quality permits; mobile roughly 1–2 MB; use a lightweight poster. These are targets, not rigid laws: protect visible quality.
- Lazy/conditional mount supporting video. Preload only what is likely needed next. Pause/unmount offscreen clips. Respect reduced motion.
- Do not mount/autoplay six invisible worlds simultaneously. Performance is part of perceived premium quality.

---

## Decision Hierarchy

Always solve in this order:

1. Message / promise
2. Story
3. Human/product role separation
4. Composition
5. Cinematography
6. Generation model
7. Web delivery / performance

Do not jump to model/compression before story is solved.

---

## Ownership Rule

The creative lead/agent must proactively surface contradictions, stronger scenarios, modernity issues, commercial implications, cost, web performance, and implementation consequences before the user has to ask.

**User corrections are evidence, not the creative process.**
