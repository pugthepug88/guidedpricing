Plan for the blob section in `src/routes/hero-preview.tsx`

1. **Strip the coloured blob sides (purple / pink-orange / green)**
   - Remove the blob-side heading, subheading, and "Book a Call" CTA from the first three panels.
   - Keep the coloured blob shape as the visual background and keep the glass narrative card with the main title + description on the opposite side.

2. **Restore the blue blob content**
   - Keep the blob-side heading, subheading, and CTA in the blue panel.
   - Add back the 12 white integration brand icons in a 4×3 grid above the CTA, matching the original layout.
   - I will draw these as inline white SVGs so they stay crisp and blend into the blue blob. If you need the exact set to be different from the original screenshot, just say which 12.

3. **Fix the highlight gradients to match your original code exactly**
   - "COMES FIRST" → purple → amber (`linear-gradient(135deg, #6d28d9 0%, #7c3aed 30%, #f59e0b 100%)`)
   - "FALL IN LOVE" → pink → orange (`linear-gradient(135deg, #ec4899 0%, #f97316 100%)`)
   - "DIFFERENCE" → pink → green (`linear-gradient(135deg, #ef476f 0%, #00e5a3 100%)`)
   - "INTEGRATION" → light blue → dark blue (`linear-gradient(to right, #60a5fa, #1e40af)`)

4. **Make the section feel less dragged out**
   - Reduce panel min-height and vertical padding so the four panels read as one compact story instead of four heavy screens.
   - Tighten spacing between the glass card title and description.
   - Keep the alternating left/right layout so the visual rhythm stays interesting, but make each panel lighter.

5. **Keep the heading weight as agreed**
   - Glass card titles stay semibold, not extrabold/black, so they match the Zapla editorial feel.

If you want a more radical rethink of this whole section after this cleanup, we can do that as a follow-up step.