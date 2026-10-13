# Mortgage Brokers page promotion

13 October 2026. User approved replacing the original mortgage page with the approved V2 design.

- Main route: `/industries/mortgage-brokers`.
- Approved component moved to `src/components/industries/MortgageBrokersPage.tsx`; original page implementation removed.
- Approved stylesheet moved to `src/styles/mortgage-brokers.css`; comparison stylesheet removed.
- Main page class and data-page identity no longer carry V2 naming.
- Comparison URL redirects permanently to the main route; it has no separate page implementation.
- Desktop and mobile Solutions menus retain a single Mortgage Brokers entry.
- Latest AI Receptionist section, shared review cards, approved copy, photography and responsive treatment retained.
- Preview noindex and sitemap exclusion retained, consistent with other industry pages; this promotion does not deploy the public website.
- Earlier original/V2 review documents are historical records, not current route instructions.

Validation: production build, TypeScript and scoped lint; direct main route, 301 comparison redirect, desktop/mobile menu navigation, workflow buttons, loaded images and responsive bounds. Lovable source sync is verified separately from local browser QA.
