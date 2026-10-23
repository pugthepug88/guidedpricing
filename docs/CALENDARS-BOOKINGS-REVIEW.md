# Calendars & Bookings: implementation review

> Historical initial implementation. The owner’s later capability correction and visual revision supersede this review where they differ. See [the current revision review](CALENDARS-BOOKINGS-REVISION-REVIEW.md) and the updated capability matrix.

Review date: **23 October 2026 (Australia/Sydney)**. Destination: `/features/calendars-bookings`.

This records the completed marketing-page implementation and the checks performed before its GitHub sync. Source review, rendered website checks and product evidence are separate. Product capability evidence and its limits are in [CALENDARS-BOOKINGS-EVIDENCE.md](CALENDARS-BOOKINGS-EVIDENCE.md). This is not a production release or live-product acceptance sign-off.

## Story and page ownership

The page explains how a customer chooses an available appointment, then how the business manages availability, customer details, reminders and changes around that appointment. Its primary proof is a date/time selection demonstration for a 30-minute project consultation in November 2026.

It does not replace `/booking`, which remains the sales-call destination with its calendar embed deferred. It does not repeat AI Chatbot's enquiry conversation or AI Receptionist's phone journey. CRM supplies the connected-customer context; the calendar page owns the appointment experience. All sales CTAs point to `/booking`.

### Reference decisions

| Decision | Application |
| --- | --- |
| **USE** | Existing Zapla typography, palette, approved portrait sheet and consultation photograph; the shared header/footer and established final CTA treatment. Unified Inbox and Pipeline Management establish brand language. |
| **ADAPT** | Familiar calendar conventions, an aligned booking surface and a readable availability schedule. The calendar grid has a functional reason to exist. A short selection-state transition explains the customer's choice. |
| **REJECT** | Recolouring another feature page's layout; another chatbot dialogue; decorative numbered steps, stock icon cards, tilted panels, dashboard filler, invented metrics, fake submission controls and forced scrolling. An unfinished draft is not an approved reference merely because it exists on main. |

The principal alternative considered was a scroll-led appointment story. Direct date/time selection was preferred because the visitor can understand and control the demonstrated choice immediately. Scrolling is not required to operate the example.

## Eight-section composition

| Section | Purpose |
| --- | --- |
| Hero and booking demonstration | Show the customer's choice of date and time, with an explicit statement that no appointment is created. |
| Availability | Explain working days, separate time ranges, duration and minimum notice; distinguish personal availability from booking-calendar hours. |
| Confirmation and reminders | Explain the later completed-booking state, on-screen confirmation and a separate illustrative SMS reminder. |
| Customer context and staff changes | Keep the appointment associated with the customer; explain that customers request changes and staff update the booking. |
| Calendar connections | Name the verified providers and explain choosing destinations for booking events, including assigned team members. |
| Guided Launch | Cover appointment types, available times, people, calendar connections and surrounding communications; address both new and existing-system starting points. |
| FAQs | Resolve practical questions about selection, availability, timezones, connections, reminders, changes and team use. |
| Final CTA | Invite a discussion of the business's appointment setup, using the established typography and transition into the shared sky/footer. |

The colour sequence uses light surfaces around the functional sage calendar, an open availability explanation, a deep green confirmation/reminder section, an editorial customer section, open connections, setup and the established closing treatment. It does not use repeated coloured heading fragments or a succession of interchangeable feature cards.

## Capability boundaries

The evidence document is the source of the detailed matrix. Current official help supports availability settings, public booking links, the customer selection/details/summary/completion flow, on-screen confirmation, named calendar connections, staff editing and cancellation statuses, and team/calendar assignment. The provider's public calendar feature page separately documents email/SMS reminders.

Preserved boundaries:

- On-screen confirmation is not presented as evidence of an automatically delivered confirmation email or SMS.
- Reminder defaults, precise timing controls and delivery behaviour have not been verified through live testing. No fixed 24-hour/2-hour sequence or delivery guarantee is claimed.
- Supported connections are Google Calendar, Microsoft 365 and Apple iCloud. No universal two-way synchronization or conflict-elimination claim is made.
- Customers contact the business for changes. Staff can update time or status. Slot release depends on status configuration; customer self-service change links are not shown.
- Team assignment does not establish round-robin allocation, pooled-availability semantics or routing fairness.
- Payment collection, elimination of no-shows and elimination of double bookings are not claimed.
- Existing specialist booking systems require a fit review; a contact import or booking link is not treated as a verified live diary connection.

These are documentation checks, not product acceptance tests. No appointments were created, calendar accounts connected or messages sent. The sales calendar embed was neither installed nor tested.

## Independent source review and fixes

The reviewer read the build protocol, design guardrails, feature brief including appended corrections, the attached reference-evaluation instruction, and relevant existing page source. This review covered story, copy, conversion, buyer concerns, brand consistency and accessibility source. It did not independently repeat the rendered checks in the next section.

Changes observed in the reviewed source:

- Date/time state is shared with the downstream confirmation, reminder and customer-record examples. Selecting another date clears the time. Until a time is chosen, later scenes show a neutral pending explanation instead of retaining an invalid appointment.
- The hero labels its interaction as a demonstration and calls its result an example selection. The later sequence explains that Priya supplies her details and completes the booking before showing the completed result. No submission button or booking API is present.
- Priya's name is introduced before it appears in confirmation/reminder results. Alex Chen is named in the booking demonstration and subsequent record. Alex uses portrait cell 8, consistent with Unified Inbox; Priya uses cell 4.
- Avatar dimensions are explicitly square before circular cropping, including the smaller mobile host portrait.
- Guided Launch explicitly addresses email/diary users and businesses already using a CRM or specialist booking system.
- Calendar date controls are 40px high and time choices 44px high. Selected appointment text is 14px; date and time control text is 13px.
- The timezone and unavailable-hours explanatory text use the established muted text colour instead of the lighter colours identified during review.
- Calendar weekday/date placement is consistent: November 2026 starts on Sunday, 10 November is Tuesday, and the shown Sydney timezone is AEDT, UTC+11.
- Date labels expose the full date, selected controls expose their state, and the selected-appointment status is announced politely. FAQs use native disclosure elements; reduced-motion styles remove transitions and animation.
- Staff-change wording now names the actual action: updating the booking. The customer panel describes customer and appointment details together without adding an invented summary, task or automatic assignment.

These findings establish the reviewed source behaviour and intended responsive rules. They do not by themselves establish visual quality on a device.

## Rendered QA recorded by the implementation agent

The implementation agent inspected all eight sections at desktop, tablet and 390px phone size. The 320px pass covered the hero, calendar and time controls, customer details and photograph, setup heading, FAQ and final CTA. Layout audits covered the document and all feature-page descendants:

| Requested viewport width | Observed document content width | Recorded result |
| --- | --- | --- |
| 1280px | 1265px | No horizontal document overflow in the audit. |
| 834px | 819px | No horizontal document overflow in the audit. |
| 390px | 375px | No horizontal document overflow in the audit. |
| 320px | 305px | No horizontal document or feature-descendant overflow in the audit. |

The 15px differences are the observed scrollbar allowance. These geometry checks are not a substitute for inspecting nested text, photographs and fixed-navigation overlap.

Recorded interaction checks:

- Changing the date clears the selected time.
- Keyboard Enter selects a time and updates the downstream appointment examples.
- An unavailable date remains disabled.
- FAQ disclosure opens and closes through keyboard Enter; another FAQ was opened by click and closed with Enter.
- The booking-example anchor moves to the calendar with clearance below the fixed header.
- The three page sales CTAs have `/booking` destinations. The hero and final CTA were followed and rendered the existing booking page, including its pending scheduling message. No email link or scheduling control was submitted.
- The CRM context link was followed and rendered `/crm`.
- The shared mobile menu opened, Features expanded and exposed the new destination alongside Unified Inbox and Pipeline Management. Desktop navigation from `/booking` through Features successfully returned to the calendar page in the compiled preview.
- The rendered route exposes `noindex, nofollow`. Source and SEO checks confirm it remains outside `SEARCH_PAGES` and has no selector-hiding `staticData.sitemap` override.

Rendered review found and corrected four responsive weaknesses. The mobile feature label now clears the fixed navigation. The tablet photograph preserves the three visible faces rather than stretching into a narrow crop; the mobile and 320px square crops were also inspected. The setup heading now wraps naturally instead of leaving a forced short line on phones. At the narrowest width, time choices use a single column so `10:30 am` stays on one line; measured controls were 199px wide and 44px high in the 305px document.

The final CTA and transition into the shared sky/footer were inspected at desktop, tablet, 390px and 320px. No shared footer or Platform changes were made. Saved captures show the [desktop hero](review-assets/calendars-bookings/desktop.jpg) and [booking demonstration](review-assets/calendars-bookings/booking-example.jpg).

## Technical verification

- `npm run build` passed using the repository's existing Cloudflare/Nitro configuration.
- `npx tsc --noEmit` passed.
- Targeted ESLint passed for the new component and route after correcting one formatting-only finding.
- `npm run check:seo` passed: 17 production pages, launch off, preview isolation, draft/booking/404 exclusion, canonicals and sitemap.
- Working and staged whitespace checks passed.
- Existing dependency module-directive, Vite configuration and AI Receptionist code-splitting notices remain; they did not prevent the build.
- The only shared-source change is one completed destination in the existing Features menu. The generated route tree adds only this route. `/booking`, the footer, Platform links, package files and SEO configuration are unchanged.

Current GitHub main was fetched immediately before synchronization. The initial reviewed base was `18033fe13f82f19403e19f48c4f945d6a422f26d`; concurrent work was incorporated through `26f4250cc1394df94748750d7a8ab8d9fc96bd0b`. This preserves the Websites, Funnels & Forms page, Automation Builder, the superseding AI Chatbot redesign and its later layout fixes, and all appended evidence/review records. New brief and design corrections were read. Shared-menu and brief append conflicts retain every completed destination and every record; the route tree was regenerated from all route files. Commit and hosted-preview synchronization results belong to the delivery record, since they occur after this document is committed.

## Verification limits and preview environment

These are Chrome marketing-page checks, not exhaustive physical-device or cross-browser testing. Reduced-motion overrides were inspected in source; an operating-system reduced-motion preference was not emulated. The page has no autoplay, scrolling choreography or forced scrolling; motion is limited to selection, hover and disclosure state transitions.

Rendered review used a local copy built with Nitro's Node server preset; the repository's deployment preset was not changed. The managed preview intermittently served an older Vite development response after document navigation. The failing response loaded `/@id/virtual:tanstack-start-dev-client-entry`; the compiled build instead loaded `/assets/index-Br5wNs-6.js`, included the calendar route in its client and server manifests and had `IS_DEV = false`. Restarting the compiled preview and repeating the desktop CTA/Features journey succeeded with the same hashed asset before and after navigation. No application-link workaround was added.

The source route follows Lovable's selector rules, but native selector visibility and a hosted Lovable render must not be inferred from local QA or project sync metadata. The connected preview's authentication/build-state limits are reported separately at delivery. No Lovable builder prompt, sales calendar embed installation/test, appointment creation or production Publish action was used.
