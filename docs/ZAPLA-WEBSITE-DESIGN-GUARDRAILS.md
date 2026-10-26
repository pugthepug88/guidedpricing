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

## Product-scene continuity and mobile reading order
Approved with the AI Chatbot refinements, 22 October 2026:
- A result must use details established in the visible example or its supplied business context. If a booking uses a customer's full name, show that name being supplied before the booking is created. Do not add unsupported data to make a result look complete.
- Show the customer's original question and conversation context for human handover. Do not imply an AI-generated summary, notification, assignment, instant human response or automatic pause unless that behaviour has been verified.
- On small screens, bring the primary product explanation forward by condensing duplicate scene introductions and secondary context. Keep the conversation itself readable. Check tablet and narrow-phone layouts as well as desktop.
- Responsive line-break changes must preserve spaces and natural reading order. A page-level overflow check does not prove that nested panels or text are unclipped; inspect the rendered content too.

## Connected feature stories and bounded scroll progression

Approved with the superseding AI Chatbot redesign, 22 October 2026:

- Use existing feature pages as quality references, not section templates. Consolidate related knowledge, control and setup content when separate sections fragment the buyer's story. A stronger full-width Zapla-blue opening is allowed when neutral space and the established palette give the whole page a deliberate rhythm.
- Show a useful customer question and answer immediately. If a conversation progresses with scrolling, keep its earlier messages and established details visible as context; do not swap in unrelated examples. A booking result follows explicit customer agreement in the illustration.
- Limit desktop sticky progression to one short, bounded scene that releases naturally into the next section. Keep native page scrolling. No scroll capture, traps, snapping or nested scroll requirement; no autoplay resets, typewriter effects or floating decoration.
- Provide the complete story in normal reading order on mobile, short-height screens, reduced motion and without JavaScript. Sticky behaviour and motion are enhancements, never prerequisites for understanding or reaching the content.
- Present human handover as a conditional case when a request needs the team. Do not imply that every successful booking must then be handed over, or invent unverified handover mechanics.
- Recheck the rendered cumulative states, scene entry/exit and static fallbacks after a redesign. Previous visual approval does not verify a new composition or interaction.


## Feature harmony, visual rhythm and colour coverage

User correction, 23 October 2026: the AI Chatbot's full-width blue opening was too dominant. This supersedes that page's earlier full-blue direction; permission to use a strong colour is not approval to fill several screens with it.

- Create family resemblance through the shared palette, typography, spacing, portraits, petal, controls and final CTA. Each feature still needs a composition that explains its own behaviour. Do not repeat an existing hero, section order or scroll device simply to look consistent.
- Keep the page canvas and feature-illustration accents distinct. Evaluate colour coverage across consecutive viewports, not a single screenshot. A feature colour must not become an automatic whole-page theme.
- Plan visual rhythm using content density, scale, open space, purposeful product surfaces, photography and selective dark sections. Changing the background at every heading does not by itself solve page fatigue.
- Texture may create restrained material depth around a focal scene. Keep it still, local and subordinate to text contrast. Do not add arbitrary shapes, neon, floating elements or decorative animation to make a quiet section feel busy.
- Use a bounded sticky sequence only when continuity explains a useful product relationship. Test the complete scene against the available viewport height, including loaded fonts and browser zoom. If it cannot fit, show the complete story in ordinary flow.

## Fresh human imagery and purposeful animation

Owner correction, 23 October 2026:

- Generate fresh human imagery for each new feature page. Do not reuse an existing website editorial photograph because it is convenient. Give the new people, environment and composition a job in that page's story. An interface portrait retained for explicit story continuity does not substitute for fresh editorial imagery.
- A wide landscape photograph can break a page's visual rhythm when it supports the story. Do not force the same crop or photo section into every feature page. Never present generated people as customers or add invented testimonials.
- An animated explanatory decision tree does not need configuration controls. Do not add optional wait toggles, Yes/No selectors or instructional captions when the requested experience is simply a readable animation.
- Grain and glass have distinct roles: restrained static texture behind the scene, smooth legible foreground panels. Sales/automation illustration colours are defaults, not a requirement to retain a green treatment the owner has rejected.


## Causal automation examples and restrained connections

Owner correction, 23 October 2026:

- Test the business logic before styling a decision tree. Each decision must lead to an action justified by the known customer situation. Do not equate urgency with one generic task and absence of urgency with an unrelated information request.
- A longer example should advance one customer process through meaningful stages. More boxes alone do not demonstrate sophistication. Show the starting fact, the requested response, the alternative outcomes and where a person must act.
- Do not use bright blue tracing or flashing blue borders on the Automation Builder tree. Keep necessary topology quiet and neutral; animate a meaningful progression without making the connections decorative.

## Calendars composition correction, 26 October 2026

- The owner rejected the Calendar page's pale-sage confirmation and powder-blue reminder boxes. Avoid this pastel highlight treatment even without matching outline icons. Soft Autumn is not permission to give every result a washed-out coloured box.
- The hero's horizontal menu of five formats was rejected as cheap. Lead with a useful booking scene and show the five formats clearly without reproducing that menu.
- Consolidate related booking, confirmation, reminder, availability and customer context when separate sections fragment the story. Fewer purposeful scenes must still explain all five formats accurately.
- A claimed sticky continuation must visibly hold beside the following explanation and release naturally. Padding outside its actual containing area does not establish a hold; inspect entry, full state and release.

## Separate Automation AI demonstration, 26 October 2026

The owner explicitly requested a typed staff request followed by the connected workflow being assembled, in a separate section below the restored nurture hero. This is a scoped exception to the earlier ban on typewriter effects; it does not reopen conversational typing effects elsewhere. Start when the request itself is readable, build once, hold the final draft, pause offscreen and provide the complete static/reduced-motion equivalent. The previous Email preferred? diagram and its surrounding feature list were rejected for weak commercial value and are removed. Do not reintroduce an abstract condition merely to demonstrate branching. The original work photo now carries a white heading over open space, with faces unobstructed. The FAQ is one large rounded container rather than a full-width background band.
