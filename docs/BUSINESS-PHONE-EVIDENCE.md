# Business Phone & Power Dialler — capability evidence

Date: 27 October 2026. Scope: human calling. This is documentary and public-client verification, not a completed live telephony acceptance test or a promise of inclusion in every plan.

## Sources read

| ID | Current source | What it establishes |
| --- | --- | --- |
| P1 | https://thenextgencrm.com/features/phone/ | Public listing: local/toll-free numbers, forwarding/IVR/ring groups, recording/transcription, voicemail, click-to-call Power Dialler and separate AI voice. A listing alone does not establish delivery, defaults or Zapla inclusion. |
| H1 | https://app.thenextgencrm.com/help-centre.html?lang=en#/contacts | Select/filter CRM contacts; Bulk Actions pushes selected IDs to Power Dialler. |
| H2 | https://app.thenextgencrm.com/help-centre.html?lang=en#/contacts/[id] | Customer profile with notes, details and other connected work. Does not separately prove a call/transcript is automatically linked here. |
| H3 | https://app.thenextgencrm.com/help-centre.html?lang=en#/settings/phone | Account-wide or selected-user number assignment. Does not establish simultaneous ringing or routing order. |
| H4 | https://app.thenextgencrm.com/help-centre.html?lang=en#/settings/phone/[id] | Per-number recording enable/disable; optional IVR prompt/audio and explicit Save. No caller-menu-to-named-person topology is demonstrated. |
| H5 | https://app.thenextgencrm.com/help-centre.html?lang=en#/settings/phone/history | Date/time, direction, numbers, duration, status, recording playback/download and transcripts when available. Not every call has media. |
| H6 | https://app.thenextgencrm.com/help-centre.html?lang=en#/settings/calls | Provider call logs and available recordings. Separate from contact notes. |
| H7 | https://app.thenextgencrm.com/help-centre.html?lang=en#/settings/phone/buy | Search by country/type/features; price and availability are returned by a search. Australia in a dropdown does not prove an Australian number is available to Zapla now. No number was searched, reserved or purchased in this work. |
| H8 | https://app.thenextgencrm.com/help-centre.html?lang=en#/settings/phone/quick-actions | Configured, person-selected phone actions for notes/context continuation, forms, tags, automation and other tools. Not automatic post-call follow-up. Ticketing deliberately excluded from Zapla. |
| C1 | https://app.thenextgencrm.com/contacts | Current public application HTML imports `/_app/immutable/chunks/BAi_su1A.js`; this deployed client contains the webphone implementation. Its imported `CtXediWC.js` holds queue/mode state. Public assets were read without authentication or account API calls. |
| C2 | https://app.thenextgencrm.com/_app/immutable/chunks/BAi_su1A.js | Browser WebRTC registration, incoming/outgoing handlers, CRM contact lookup, docked notes GET/POST, Call Now, previous/next, optional Auto Dial start/stop/countdown. Client code verifies intended implemented flow, not server execution or call quality. |
| C3 | https://app.thenextgencrm.com/_app/immutable/chunks/CtXediWC.js | Initial mode `manual`, delay setting, queue set/add/clear, next/previous and session persistence. Session-specific persisted settings can differ from the initial default. |
| Z1 | Current `src/routes/Pricing-v3.tsx` | VoIP/phone dialler access with separate usage on standard plans; required separately priced Guided Launch for a new standard setup. This page does not introduce new retail rates or unlimited calling. |

The help centre loads its current English article bundle from `https://app.thenextgencrm.com/help-content/en.json`. Exact article bodies, headings and FAQs were read, rather than extrapolating from the feature listing. Sources were accessed on 27 October 2026; asset names are deployment-specific and can change.

## Decisions by capability

| Capability | Permitted page treatment | Limit |
| --- | --- | --- |
| Browser calling | Make and receive customer calls in Zapla; call from an active number using a computer/microphone/audio and internet. | No certified browser/version matrix, background app ringing or universal mobile/app support. Browser permissions and behaviour checked during setup. No microphone permission requested here. |
| Calling list | Select contacts in CRM, then push selected people to Power Dialler. Phone number required. | The help says pushing “starts calling”; current code defaults to manual with a deliberate Call Now. The page follows the explicit implementation. No predictive/parallel calling, automatic retries, deduplication guarantees or imported-list magic. |
| Manual dialling | Call Now fetches the current contact's number and starts the call. Next/previous are separate person actions. | Main marketing scene is static manual mode. No automatic website animation implies product dialling. |
| Auto Dial | Optional selected mode with an explicit start, configurable delay, progression after a hangup and a stop control. | Not the main illustrated mode or an implied default. No claim it writes notes, makes decisions or completes the customer's next action. No live sequence tested. |
| In-call context | Customer name/contact lookup and saved contact notes; notes can be read/saved in the docked webphone. CRM profile provides wider context separately. | Do not place a complete quote/pipeline/booking dashboard inside the phone or promise all profile fields are simultaneously shown. |
| Meaningful outcome | A person writes and saves a contact note. | No verified structured disposition/outcome form, AI summary, automatic task or automatic message. “Completed” is a call status, not a sales outcome. |
| Saved call activity | Call history lists direction, duration and status; media is conditional. | Automatic call/media linkage into the customer record was not established. Page distinguishes call history from the person's saved customer note. |
| Inbound setup | Assign number access to selected users/account-wide; optional caller menu. | No pictured ring sequence, simultaneous ringing, automatic answer distribution, transfer guarantee or whole-PBX-replacement promise. |
| Recording/transcript | Enable recording per number; revisit available recording/transcript in history. | No every-call guarantee, AI summary, retention/export policy or universal plan inclusion. Charges/requirements agreed before activation. |
| Forwarding, transfer, voicemail | Omitted as major claims. | P1 broadly lists forwarding/voicemail/ring groups; exact NextGen-to-Zapla behaviour and customer setup are insufficiently established. No voicemail drops. |
| Commercial terms | Phone numbers and call usage charged separately; confirm availability/devices/rates/setup before activation; Guided Launch separate. | No fabricated A$/minute retail rates, porting promise, current Australian inventory or all-number capabilities. |

Phone quick-action help describes a pipeline move, while the inspected client opens creation of a new pipeline item. The scene therefore does not depict a stage-change quick action. Tags/explicitly run automation are bounded FAQ support, without a demonstrated message send. No Ticketing offering, route or menu is reintroduced.

## Prepared scene provenance

Mia's kitchen-lighting enquiry, Ben's call and the outcome note, Daniel's callback and Priya's visit discussion are fixed fictional marketing content. They are not authentic account screenshots, customers, testimonials, call counts or performance evidence. The selected people are not an activity metric. No real phone numbers or invented email addresses appear.

The meaningful result is Ben's note: Mia wants warm-white pendant options; Ben will email a shortlist before a visit. It records a commitment, not a completed email send or booking. Daniel is visibly next, but a person chooses Next and Call Now. The page has no telephony SDK, network/contact API, input collection, dial button, real audio player, timers or automatic playback.

Recurring portrait identities follow current Inbox/Pipeline: Mia cell 9, Ben 13, Alex 8. Daniel uses cell 17; Priya follows the recently revised Quotes page's cell 19. All come from the approved local portrait sheet.

## Fresh editorial asset

Built-in ImageGen generated `public/concept/business-phone/lighting-owner-calling-20261027.webp`, 1536 × 1024, from a new original image. It depicts a fictional older lighting-showroom owner using discreet earphones at her computer. No customer identity or endorsement is implied. Native conversion to WebP is format optimisation; the image was visually inspected before use.

Final generation prompt: “Use case: photorealistic-natural. Asset type: editorial landscape photograph for Zapla Business Phone webpage. Create a fresh, candid, premium documentary photograph of a female small-business owner in her late fifties, short softly silver-grey bob, warm medium-brown skin, wearing a rich plum textured knit with sleeves pushed back, at a practical pale-grey desk in an independent architectural-lighting showroom in Sydney. She is talking naturally with a customer through discreet small wired in-ear earphones while using a slim desktop computer; one hand rests near the keyboard, the other lightly indicates a brass lighting sample on the desk. The computer screen faces her and is not legible to camera. She looks engaged and thoughtful, not posing or smiling at camera. Wider room context: understated graphite shelves with beautiful sculptural pendant-light samples, matte copper and brass materials, glazed workshop partition in softly blurred background, natural daylight from a high window. Photograph from slightly to her left, subject near right centre with head fully in frame, visible hands and desk, enough room around her for a landscape crop. Colour: warm human skin, honest greys, restrained plum/brass, neutral natural light; avoid beige-dominant interior and powder blue. Real materials, lived-in workspace, subtle 35mm editorial grain, realistic lens perspective. Landscape 1536x1024 or similar. No text, no graphics, no logos, no testimonial, no phone handset, no over-head headset, no call-centre scene, no medical clinic, no laptop meeting, no other people. This is a fictional editorial person, not a real customer.”

## Acceptance still required outside this marketing task

Confirm an actual Zapla customer's number availability/costs, caller ID, account permissions, incoming-call behaviour, supported devices/browser/app combinations, outbound quality, both dialler modes and server-saved notes/log/media before activating their phone service. None is represented here as a completed live acceptance test. No real calls, messages, number purchases or live-account changes were made.
