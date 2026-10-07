# Zapla Website Build Protocol

This is a HARD GATE for every Zapla website design or code change.

## Mandatory pre-build read
Before any website edit, read:
1. This file.
2. `docs/ZAPLA-WEBSITE-DESIGN-GUARDRAILS.md`.
3. The target route/component.
4. At least two existing Zapla pages/components that establish the current visual language.
5. Any user-supplied reference for the current task.

Do not write code before this audit is complete.

## Incumbent Zapla visual system
Use the existing Zapla language first. Do not invent replacements without a specific reason.

Core palette:
- Zapla blue: `#2563FF`
- Ink: `#111318`
- Deep green/ink: `#1E2B29`
- Warm white: `#FCFCFA`
- Warm neutral: `#F7F4EE`
- Soft cream: `#F7F2EA`
- Coral: `#E97D62` / `#BF7458`
- Gold: `#DDA34B`
- Sage: `#99A36D`
- Lavender: `#9B86B8`
- Dusty pink: `#C96C85`

Approved portrait system:
- `/concept/revenue/soft-autumn-portraits-v1.webp`
Do not introduce external avatar services or inconsistent portrait styles unless explicitly approved.

## Visual-quality rules
- Design scenes, not stacks of components.
- One focal point per viewport.
- Strong foreground, supporting background, and deliberate negative space.
- Fewer, larger, purposeful objects.
- Avoid equal-weight grids unless the information truly requires them.
- Cards are not the default layout primitive.
- Do not box every idea.
- Do not use generic SaaS garnish.
- If an icon, badge, chip, status pill, label, or card can be removed without reducing comprehension, remove it.
- Never use fake metrics or invented performance data.
- Use references as evidence, not as instructions.

## Motion Director gate
Before committing motion:
- Stable composition first.
- One primary movement idea at a time.
- Use opacity, blur, and scale to create depth, not to hide clutter.
- Avoid multiple independent groups moving in competing directions.
- No abrupt loop reset.
- Motion must communicate cause-and-effect or state change.
- Inactive elements remain readable as context.
- Reduced-motion mode must still communicate the story.
- Compare pacing and spacing against the supplied motion reference before shipping.

## UI/UX gate
Before committing:
- Can an SME understand the visual in 3 seconds?
- Is the focal point obvious?
- Is the hierarchy obvious without reading every label?
- Is anything competing with the focal object?
- Is there enough white space?
- Are active and inactive states clearly differentiated?
- Does every visible element add meaning?
- Does the composition look intentional at screenshot level?

## Brand / Creative gate
Before committing:
- Does it unmistakably feel like Zapla?
- Are Zapla’s colors, portraits, typography, shapes, and spacing being used consistently?
- Is the result art-directed rather than assembled?
- Would it still look premium beside Monday or Clay?
- If not, do not ship.

## Product Marketing / Conversion gate
Before committing:
- Does the visual prove the commercial message?
- Is it showing buyer value rather than software architecture?
- Is the amount of product detail appropriate for that section?
- Does it preserve locked/approved copy unless explicitly reopened?
- Does it avoid overlap with another Zapla page’s ownership?

## Pre-commit requirement
Do not treat source code as proof of quality.
Before declaring a design complete:
1. Inspect the rendered result.
2. Compare it against the relevant Zapla pages.
3. Compare it against the current reference.
4. Run UI/UX, Motion, Brand/Creative, Product Marketing/Conversion, SME buyer, and AI-slop checks.
5. If it looks materially weaker than the reference or existing Zapla standard, fix it before presenting it.

## Customer Marketing incumbents
Until explicitly reopened:
- Hero headline is locked.
- Hero subheading is locked.
- Final CTA is locked for now.
- Customer Marketing story is: customer signals/context -> right audience -> right timing -> outreach -> action -> attribution.
- Tags are a mechanism and visual language, not the product headline.
- Smart Lists group the audience.
- Automations execute the outreach.
- SMS/email/AI/social are channels.
- Forms/pages/bookings are supporting conversion assets.
- Campaigns owns tracking and attribution.
