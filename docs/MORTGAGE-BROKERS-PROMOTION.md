# Mortgage Brokers page promotion

13 October 2026. User approved replacing the original mortgage page with the approved V2 design.

- Main route: `/industries/mortgage-brokers`.
- Approved component moved to `src/components/industries/MortgageBrokersPage.tsx`; original page implementation removed.
- Approved stylesheet moved to `src/styles/mortgage-brokers.css`; comparison stylesheet removed.
- Main page class and data-page identity no longer carry V2 naming.
- The obsolete comparison URL and redirect route are deleted so the Lovable preview route list contains only the main Mortgage Brokers page.
- Desktop and mobile Solutions menus retain a single Mortgage Brokers entry.
- Latest AI Receptionist section, shared review cards, approved copy, photography and responsive treatment retained.
- Preview noindex and sitemap exclusion retained, consistent with other industry pages; this promotion does not deploy the public website.
- Earlier original/V2 review documents are historical records, not current route instructions.

Promotion validation: production build, TypeScript and scoped lint; direct main route, the then-existing 301 comparison redirect, desktop/mobile menu navigation, workflow buttons, loaded images and responsive bounds. Lovable source sync is verified separately from local browser QA.

## Preview route cleanup

The redirect was still a registered route and therefore remained an extra preview entry. The redirect file was deleted and the generated route tree updated through the router generator. The main page, styling and navigation are unchanged. Route-list and build checks verify that no V1 or V2 mortgage route remains registered.
