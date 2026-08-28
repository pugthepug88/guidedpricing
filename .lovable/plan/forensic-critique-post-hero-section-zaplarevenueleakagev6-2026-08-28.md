# Forensic critique: post-hero section (ZaplaRevenueLeakageV6)

Observed at 1440 and 390 on `/concept/cinematic-follow-through-v5`. No code changed.

## Why it still feels off

**1. Three unrelated compositions stacked, not one section.**
Header block is left-aligned in a narrow 840px column, the CALL/REPLY/BOOK device is centre-aligned across the full 860px, and the stats row is a full-bleed 4-up grid. Three different alignment systems and three different rhythms in one section. ClickUp/Monday/Clay hold one axis for the whole block. This is the single biggest cause of the "off" feeling.

**2. The centre device reads as a nav bar, not a diagram.**
Five all-caps words with underlines directly under them look exactly like active/inactive tabs. Two solid cyan underlines plus three dotted ones reinforce that reading. There is no visual claim being made, no direction, no start/end. Sitting alone in a 340px-tall band of empty space it looks like content failed to load rather than an intentional restrained diagram.

**3. Empty space is undifferentiated, so it reads as gaps not breathing room.**
Roughly equal ~110-130px voids appear above the device, below the device, above the bridge, and below the closing line. Premium editorial pages vary that spacing hard (tight inside a group, wide between groups). Here every gap is similar so nothing groups, and the section ends with a large orphan void beneath the closing line.

**4. The stat row is the "ad board" moment.**
Four evenly weighted 52px numbers with identical treatment and no ordering logic. 44% repeats the headline verbatim, so the biggest number on the page is spent twice and the row's first item carries zero new information. Four claims of equal weight communicate less than two with an argument.

**5. Divider logic is inconsistent.**
Column rules start only from item 2 (`i === 0 ? "" : border-l`), so the leftmost stat has no left edge while the grid has a full-width hairline above it. The 79% source wraps to two lines and pushes that column's baseline out of alignment with the other three, visibly breaking the row.

**6. Typography does too many things at once.**
Inter Tight display, JetBrains Mono in three sizes (10px/10px/9px, all different tracking), plus body text in four greys (#12141A, #3A3D44, #6E6A64, #9A948B) plus #A8A29A and #C7C2B9 in the headline and device. The grey ladder is finer than the eye can resolve, so it reads as inconsistency rather than hierarchy.

**7. Headline mechanics.**
The greyed second clause is longer than the black clause, so the de-emphasised text dominates by area. The headline also uses an em-dash, which the project rule forbids. The source line sits immediately under the headline in mono caps, colliding visually with the eyebrow above it (same family, same caps, near-same size) so the header looks bracketed by two labels.

**8. The bridge does not land.**
Two-column baseline-aligned split, but left is 26px display and right is 15px body, so they do not read as a pair. The Zapla resolution line, the only brand payoff in the section, is the smallest and lightest text present.

## Recommended composition reset

- **One axis.** Left-align the entire section on the same grid line as the eyebrow. No centred device.
- **Header:** eyebrow, headline in a single weight with at most one de-emphasised short tail, support copy at 520px. Move the source attribution to a single small mono line under the support copy, not between headline and body.
- **Central device redesign:** a left-to-right horizontal progression with one continuous baseline that changes character partway (solid to hairline to nothing), labels set small in mono rather than large display caps, so it reads as a diagram rather than tabs. Give it a real height (roughly 180-220px) with contained internal padding rather than floating in whitespace.
- **Evidence:** drop to two or three stats, remove the 44% duplicate. Set numbers at a single size with claims tight beneath, dividers on every gap or none, and fix source lines to a reserved two-line block so baselines stay aligned.
- **Spacing rhythm:** tight (16-24px) inside groups, one large break (96-120px) between the three groups only, and trim the trailing void so the section closes on the bridge.
- **Type discipline:** one display size for headline, one for the bridge, one body size, one mono size. Three greys maximum.
- **Bridge:** make the Zapla line the terminal emphasis (same size as the problem statement, stacked beneath it on the same axis) instead of a small right-hand caption.
- **Mobile:** the device must stay a single progression, not wrap to 3+2 rows which currently re-creates the tab-bar look twice.
