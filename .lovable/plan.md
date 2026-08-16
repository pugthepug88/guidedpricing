# Contacts campaign card: three variants + longer hold

Rework only the VIP campaign success moment in the Contacts scene of `/hero-preview-v5`. Everything else in Contacts (table, filter popover, row selection, SMS drawer, Maya's reply payoff) stays exactly as it is, and the other seven scenes are untouched.

## What you'll see

Three distinct versions of the "VIP comeback campaign / SENT" card, switchable from a small variant selector on the preview page so you can watch each one in place and pick a winner.

**A. Receipt stack**
Card springs in compact, then widens as four tiny contact avatar rows stagger in beneath the title like a send receipt (Maya, Daniel, Priya, Tom), each ticking green in sequence. Once the fourth ticks, the right side locks into the large emerald SENT block and the card settles, then exits.

**B. Message launch**
An SMS bubble flies from the drawer's edge into the blue icon tile, the card unfolds around it from that point, one restrained light sweep travels around the gradient keyline, and SENT stamps in with a single soft ring pulse.

**C. Counter roll**
Card springs in reading "0 of 4 sent", the number rolls up to "4 of 4" while a thin progress line fills along the gradient border, then the right side flips from progress to the large emerald SENT.

All three keep the current design language: white card around 58 to 68 percent of stage width, 2px blue → cyan → violet keyline, rounded corners, confident shadow, no blur of the table underneath, oversized success typography.

## Timing

The card beat goes from 1000ms to 2000ms, so the payoff holds a full second longer before the row-by-row Sent pills begin. Earlier beats (filter, selection, drawer) and Maya's final 2600ms hold are unchanged, so the Contacts scene simply runs about a second longer before auto-advancing to Opportunities.

## Reduced motion

With reduced motion on, each variant renders its final composed state with a plain fade, no staggered rows, sweep, flight, or counter.

## Technical notes

- New file `src/components/v5/campaign-cards.tsx` holding the three card components and a shared shell (keyline, shadow, sizing) so the variants differ only in choreography and inner content.
- `src/components/v5/scenes-a.tsx`: `SceneContacts` accepts a `campaignVariant` prop ("receipt" | "launch" | "counter"), renders the chosen card at phase 13 instead of the inline `CampaignSentCard`, which is removed. Phase mapping, refs, cursor and every other beat are unchanged.
- `src/routes/hero-preview-v5.tsx`: Contacts `phases` index 13 changes from 1000 to 2000; a small variant toggle (three pills near the scene tabs, preview-only) drives the prop and restarts the Contacts timeline on change.
- Validation: play Contacts start to finish for each variant at 1440 and ~1180 wide, confirm no horizontal overflow, tab-click restart still works, then lint and typecheck.

Once you pick a variant, the toggle and the two unused card components get deleted so only the chosen card ships.
