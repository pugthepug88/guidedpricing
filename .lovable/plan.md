## Plan: AI Section Refinement

### Goal
Make the three AI feature cards feel more spacious and premium, eliminate cut-off text, and sharpen the messaging so each card tells a clear outcome story.

### Changes

1. **Increase card height**
   - Update `AICard` from `h-[520px] sm:h-[560px]` to `h-[600px] sm:h-[640px]`.
   - Give the media container a larger share of the card so the videos are not cropped.

2. **Fix truncated descriptions**
   - Remove `line-clamp-2` from the description paragraph.
   - Increase the text area padding/leading so the full copy reads cleanly.

3. **Refine card copy**
   Replace the current three descriptions with clearer, benefit-led text:
   - **AI Employee**: "Your 24/7 AI receptionist. Answers calls, books appointments, and handles customer questions — even when you're off the clock."
   - **AI-Powered Workflow**: "Let AI run your follow-ups, sentiment checks, and CRM actions. Every step connected, every outcome automatic."
   - **AI Reputation Manager**: "Turn reviews into replies. AI monitors your reputation and responds with context that sounds like you."

4. **Optional video swap (pending your approval)**
   - Your reference image shows the workflow flowchart on the left and the AI employee character in the middle.
   - If the uploaded videos match those visuals, swap them so the left card = workflow and the middle card = AI employee.

5. **Polish the reputation card scatter**
   - Slightly scale up the review cards so they fill the taller container without looking lost.
   - Keep the scattered positions but adjust `top`/`left`/`right` percentages for the new proportions.

### Files to edit
- `src/routes/hero-preview.tsx` — `AICard` component, card heights, descriptions, and review card positions.

### Out of scope
- No changes to other sections (hero, platform, pricing, etc.) unless requested.
- No new assets or routes.