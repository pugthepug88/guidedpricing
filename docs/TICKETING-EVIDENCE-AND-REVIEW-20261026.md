# Ticketing feature page, 26 October 2026

## Scope and decision

Route: `/features/ticketing`. Customer support ticketing owns recording and progressing an issue to resolution. Unified Inbox owns messages; Pipeline Management owns opportunities and related work. This page does not market event admission or QR tickets.

H1: **Keep customer issues moving.**

Five connected chapters: a focused request/assignment scene; a shared board and table; linked customer/job context with custom fields and fresh service-team photography; Guided Launch and practical FAQs; the established petal/display-type CTA and root sky/footer. The selected service-business story demonstrates the mechanism without narrowing the advertised scope to equipment repair. Billing and other support processes are covered in copy.

The materially different alternative was a full board hero followed by a feature grid. Rejected: it would repeat Pipeline Management’s composition and expose queue mechanics before establishing why the issue matters. The focused request leads; the fuller queue proves operational breadth.

## Inputs read

Current main started at `7940583c27a009c736d8714f1ee19d5f0ca14c97`. Read AGENTS, the complete Website Build Protocol, Design Guardrails, Feature Pages Brief and Video Creative System, including superseding 26 October corrections. Read the attached DO-NOT-BE-A-YES-MAN.txt and all six supplied Ticketing/product-help screenshots. Inspected current Inbox, Pipeline, Calendars and Chatbot source and rendered feature references. The current Lovable preview was read only. No Lovable agent/build prompt or separate Publish action was used.

Recent conversation retrieval supplied continuity, then current repository evidence took precedence. The previous positive reviews of unfinished drafts were not treated as owner acceptance. Shared navigation and footer are unchanged. The new leaf route follows existing noindex/selector conventions, with no `sitemap: false` and no production SEARCH_PAGES entry. Sales destinations remain `/booking`; no sales-calendar embed is introduced.

## Capability evidence

User screenshots show the board, tags, fields and current official help. Rechecked the supplier’s public English help payload on 26 October:

- `https://app.thenextgencrm.com/help-content/en.json`
- Whole payload SHA-256: `ddff8050edf90ab66901e6102802c23e961de65f6759ad0333b8676f32501036`.
- Ticketing Board source hash: `81271b2f676b499deaafc6750144bd9e44c1dcf1f0d6d461acabbcb547cfa73f`.
- Ticketing Fields source hash: `0b278814937353ed9dbbd6384f31ded34a92648d42f7337b0e4e956abd6ecba4`.
- Ticketing Tags source hash: `94f0656fb25bfaaf0d6f03a4411cbcaf62a07d93d1ff166d06ed271ec595045d`.

| Capability                 | Evidence                                                     | Page boundary                                                                                                                                    |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Multiple boards and stages | Board help plus supplied board with Add New Column           | Separate processes can have their own queues; no unlimited-board allowance is claimed.                                                           |
| Board and table            | Board help and supplied view controls                        | The same six local records are presented in either view.                                                                                         |
| Manual stage movement      | Board help explicitly documents dragging between columns     | Hero names Ben assigning Alex and Alex changing the stage. No automatic product assignment/progression is implied.                               |
| Status                     | Board help: Open, Resolved, Closed                           | Status and stage are separate; FAQ makes this explicit.                                                                                          |
| Priority                   | Board help: Low, Medium, High, Urgent                        | Visible labelled priorities and a working high/urgent filter. No SLA or deadline is invented.                                                    |
| Assignees                  | Board help, including multiple-assignee FAQ                  | One or several people can be attached; no availability-aware routing is claimed.                                                                 |
| Customer and related work  | Board help: contacts, pipeline items, other tickets          | Same Olivia/Harbour Coffee request links to the espresso installation. Links are shown as record information rather than fake external controls. |
| Custom fields              | Fields help: data types, board scope, required, show on card | Equipment and site-access fields explain their purpose. Required-field mechanics are described, not simulated in a live creation form.           |
| Attachments                | Supplied fields table explicitly includes a File field       | A file attachment is shown as stored information, without a fake download action.                                                                |
| Tags                       | Tags help: categories, colours/shapes, organisation          | Meaningful Aftercare/Equipment/Repair/Site access labels, not decorative badge filler.                                                           |
| Search/filtering           | Board help: title search, stage, priority, assignee          | Page demonstrates priority filtering only; no additional unverified search behaviour.                                                            |

Excluded claims: email/message-to-ticket conversion, automatic acknowledgements, SLA enforcement, overdue timers, guaranteed resolution speed, AI triage or resolution, native ticket analytics, automatic notifications, shared visibility of author-private notes, universal integrations and unlimited usage. No runtime supplier acceptance test, real ticket creation, assignment, message, attachment upload or workflow execution took place. The marketing demonstration calls no customer system.

## Reference decisions

| Reference                                       | Decision                             | Reason                                                                                                                 |
| ----------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Supplied Ticketing screenshots and help         | USE capabilities; ADAPT presentation | Reliable evidence for the described features. Empty boards and test names do not explain buyer value.                  |
| Current Inbox                                   | USE brand, people and CTA language   | Keep human identity clear. Do not copy its chat-window hero.                                                           |
| Current Pipeline                                | ADAPT stage clarity                  | Useful legibility reference; reject a second five-column hero or route-planning story.                                 |
| Current Calendar/Chatbot/Automation corrections | USE constraints                      | Neutral main canvas, local material, meaningful product detail, bounded colour, fresh people, no development captions. |
| Repeated alternating copy/card sections         | REJECT                               | Adds page length without proving a different capability.                                                               |

## Image provenance and creative gate

Generated with the built-in image-generation tool. No source/reference photograph was supplied to generation. Fresh cast/location; not a customer, testimonial or image reused from another feature page. Original generated master was retained in the task workspace. Web asset: `public/concept/ticketing/service-team-20261026.webp`, 1200 × 800, approximately 143 KB.

The photo supplies the human reality of two colleagues checking a commercial machine; native website text supplies ticket/customer/job relationships. No product UI or brand copy is baked into the photograph. Both faces and the work remain unobstructed. This is a service-process scene, not proof that software itself diagnoses or repairs equipment.

Generation prompt:

```text
Use case: photorealistic-natural. Asset type: editorial photograph for Zapla customer support ticketing feature page. Primary request: a candid premium documentary commercial photograph showing a small Australian commercial equipment service team following through on a customer problem. Scene: modern independent coffee-equipment service workshop, a contemporary stainless espresso machine on a clean practical service bench. A female service coordinator of East Asian appearance in her late 30s in charcoal workwear and a male technician of Mediterranean appearance in his early 40s in a muted olive overshirt are quietly checking the machine together, focused on a concrete repair detail, not posing, no devices or pretend typing. Tool use must be believable; hands natural. Medium wide environmental portrait, landscape 3:2 framing; both people and their work occupy the central and right portion with room around their faces and equipment; discreet shelving, espresso components and warm neutral workshop details establish a real commercial service business, no domestic kitchen. Directional soft afternoon window light, restrained soft autumn palette of warm stone, brushed metal, charcoal, muted olive and subtle terracotta. Tactile editorial photography with realistic skin texture, sophisticated depth and a little natural grain, not glossy AI stock. No UI, text, logos, testimonial, watermark, posed smiles or futuristic effects. Fresh cast and location, no reference-image identities.
```

## Rendered review and corrections

Local rendering used the supported preview at `http://terminal.local:4173/`. The initial generic dev-server command hit a host-interface error; the managed preview recovered. Its exact hostname was allowed temporarily for local QA and the original Vite config was restored before commit. Preview interruptions were retried only after a stopped-service status and recovery. A local responsive-review fixture was removed before commit.

Inspected desktop at the browser’s approximately 1363 × 936 viewport (1348px document), full hero, board, filtered board, filtered table, linked record and photo, Guided Launch, FAQ container, final CTA and sky/footer. All main images loaded. Priority filter changed six records to the two high/urgent records; table kept those same records and the selected filter. Controls preserve focus and do not modify customer data.

393 × 852 phone iframe (378px content) review covered hero/request, all board stages, high/urgent results, responsive table, linked customer/job/fields, unobstructed photo, launch plan, expanded stage/status FAQ, closing CTA and sky/footer. Table selection and FAQ close were exercised with Enter. No horizontal document overflow or visible text clipping appeared in checked phone geometry; the intentionally clipped screen-reader status was excluded. All three page sales links point to `/booking`.

834 × 900 tablet iframe review covered hero, two-column board and the linked-record/photo composition. Both people remain visible in the portrait crop. Targeted 320 × 852 review checked hero text and document/nested text geometry at 305px content width. A capture after one narrow-screen scroll was blank while the DOM remained present, so that image is not treated as visual proof of the lower 320px page.

Static rendering was tested in an iframe with scripts disabled: full final assignment/stage, all six tickets, normal-flow narrative and hidden JS-only controls remain. Reduced-motion and short-height handling were reviewed in source: the only enhancement requires a tall desktop, stops for reduced motion and has no sticky/scroll capture. Final desktop motion state was visibly checked; intermediate timed frames and offscreen/tab pauses were reviewed in source rather than claimed as a recorded playback test.

Corrections from review: preserve a literal space when the ticket title’s line break disappears at narrower widths; make the dynamic accessible scene label agree with its assignment state; avoid the desktop final-CTA line break on small screens; restrict the one-time enhancement to a viewport tall enough to contain the scene. The hero retains its final state and does not loop or reset on scrolling back.

## Director and buyer review

These are the implementation agent’s separate role assessments of the inspected page, not independent-agent sign-off, owner approval, customer research or measured conversion results.

| Lens                       | Assessment                                                                                                                                         | Judgement                                     |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Motion Director            | One brief human-assignment/stage sequence; stable record; no looping or competing movement; complete static fallback.                              | 9.0/10 within the stated playback-test limits |
| Brand/Creative Director    | Zapla typography, portraits and stone/silver material; one contained deep-green chapter; fresh work photography and established closing treatment. | 9.1/10                                        |
| Product Marketing Director | Specific request first, shared queue second, linked customer/job proof third. Distinct from Inbox, Pipeline and event ticketing.                   | 9.1/10                                        |
| Conversion Director        | Immediate booking path, useful product proof, both starting situations, separate setup scope and a concrete process-led final invitation.          | 9.0/10                                        |
| UI/UX Director             | Clear stage boundaries, labelled priorities, visible names, functional view/filter states, native disclosure and normal-flow phone layouts.        | 9.0/10                                        |
| SME owner/frontline        | Can identify the issue, customer, responsible person and work stage without learning software architecture.                                        | 9.1/10                                        |
| Buyer psychologist         | Reduces ambiguity about ownership and context; avoids perfect-service promises and invented urgency metrics.                                       | 9.0/10                                        |
| AI-slop critic             | No decorative icon grid, arbitrary counts, accent bars, tilted cards, fake send controls, testimonials or development captions.                    | 9.1/10                                        |

## Validation and remaining limits

Production build, TypeScript, targeted ESLint, SEO checks, formatting and whitespace checks passed before the final commit. No product-service acceptance test, screen reader pass, physical-device matrix, cross-browser matrix or exhaustive lower-page 320px/tablet sign-off is implied. Hosted sync/rendering is verified separately after GitHub merge; the local review does not establish Lovable editor build status.
