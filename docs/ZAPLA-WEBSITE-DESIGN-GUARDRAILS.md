# Zapla Website Design Guardrails

These are standing rules for Zapla website design and product-page work.

## No synthetic SaaS UI garnish

Do not add generic product-looking decoration merely to make a section feel like software.

Avoid unless each element is necessary to explain a real product behaviour:
- generic status pills such as "Running", "Active", "Ready", "Live"
- decorative circular icons for obvious concepts such as booking, reply, contact, calendar, email or SMS
- checkmarks in circles used as visual filler
- tiny eyebrow labels and microcopy added only to create dashboard texture
- floating rounded cards that do not correspond to a real product state
- arbitrary coloured dots, chips or badges used only to make UI look polished
- synthetic dashboard chrome that imitates SaaS conventions without helping the buyer understand Zapla
- fake UI controls, metrics, states or labels that are not necessary to the story

A useful test:

> If removing the icon, pill, badge, label or card does not reduce comprehension of the product behaviour, remove it.

Product visuals must explain a commercially meaningful action or transformation. They must not merely look "product-like".

## Product visuals must answer a buyer question

Before designing a product visual, define the single buyer question it must answer.

Examples:
- Who should I contact?
- Why are these customers relevant?
- What does Zapla do next?
- Where does the response go?
- What business outcome can I see?

If an SME buyer could reasonably look at the visual and ask "what am I supposed to understand here?", the visual fails regardless of how polished it looks.

Do not expose internal product mechanics before the buyer understands the commercial reason they matter.

## One visual, one job

Each major visual should communicate one primary idea.

Do not combine audience segmentation, automation logic, channels, campaign assets, replies, bookings, attribution and performance into one hero visual.

Use progressive disclosure:
1. sell the commercial outcome,
2. show the mechanism,
3. prove breadth,
4. prove measurement.

## No arbitrary numbers

Do not invent audience counts, conversion rates, revenue figures, engagement metrics or other numbers simply to make UI feel real.

Examples such as "86 customers" are not allowed unless:
- the number comes from a real verified product example, or
- the page clearly labels it as an illustrative example and the number materially helps understanding.

Prefer showing the relationship between customer data and a relevant audience rather than inventing a count.

## Motion explains behaviour

Motion should show a real state change or product relationship.

Good:
- a customer segment being narrowed from CRM data
- a customer action triggering a workflow
- a reply returning to the same customer record
- a campaign asset becoming attributed to a campaign

Bad:
- cards floating for decoration
- icons pulsing to create energy
- badges cycling with no meaning
- motion added because a section feels empty

Keep the composition stable where possible. Animate the state, not the layout.

## Zapla visual hierarchy

Zapla identity comes from the existing website, not competitor colour systems.

Use the established Zapla palette, typography, spacing, dark/light rhythm and actual logo assets.

References such as Clay, monday.com, Keap, Pipedrive, Creatio or others are evidence only. Classify reference patterns as USE, ADAPT or REJECT. Borrow structure, interaction or pacing only when it improves Zapla.

## Review gate

### Industry Google review demonstrations

Use `src/components/industries/ReviewCards.tsx` and its shared stylesheet for review invitations and the Google rating panel. Do not recreate page-specific versions of their glass, typography, Google wordmark or unselected stars. Keep client portraits beside client messages and completion records, outside the Google rating panel. Use the Zapla petal for the automated invitation. Industry-specific wording, triggers, motion and section composition remain with the page. The displayed review link and stars are illustrative, not live review submission controls.

Before any visual is considered ready, review it independently through:
- UI/UX Director
- Brand / Creative Director
- Product Marketing Director
- Conversion Director
- Motion Director
- SME buyer
- Buyer psychologist
- AI-slop critic

If any lens cannot explain what the buyer is supposed to understand within a few seconds, the visual is not ready.


## No decorative accent bars
Avoid decorative vertical accent bars, coloured edge strips and arbitrary lines beside text or inside cards. Use spacing, typography and alignment for hierarchy. Only use colour or lines when they communicate a clear meaning, such as a selected control, a genuine category/state, a structural divider or a workflow connection. Do not invent a meaning to justify an ornament. The orange stripe on the Inbox customer record and the blue stripe on Pipeline's next-step text were removed under this rule.


## No decorative numbered steps
Do not use 01/02/03 labels as the default layout for Guided Launch, feature explanations or benefits. Use a composition appropriate to the content. User explicitly rejected the numbered Inbox setup and explanatory key. Numerals are appropriate only where actual sequence or data requires them, not visual garnish.


## No tilted product cards
User rejected rotated, overlapping paper-card compositions as dated. Keep product panels aligned; create hierarchy through content, typography, spacing and purposeful surface contrast, not rotation.


## No generic pastel cards with matching outline icons
Standing user instruction, 22 October 2026: never use washed-out, low-saturation powder-blue, pale-sage and beige feature-card fills paired with darker colour-matched stock outline icons. Do not default to this generic SaaS card treatment. This supersedes the rejected Inbox benefit-card colour treatment. It does not ban Zapla's soft autumn palette or meaningful functional icons. Use deliberate contrast, brand-specific assets and content-specific visuals; do not recreate the same treatment under different colour names.
