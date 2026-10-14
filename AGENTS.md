<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Mandatory video/motion brief

Comparison drafts keep page-specific content and styling in a dedicated comparison module with a leaf TanStack route; shared navigation and footer remain root-owned to isolate review work.

Concise competitor drafts use the typed ComparisonPage shell and source-linked neutral rows in `src/components/compare/simple`; keep competitor data separate so future comparisons reuse the same pricing and disclosure structure. Review-list entries live in `widerVersions` so both existing review viewers discover them without additional navigation.

Before generating or building any hero film, video generation, motion concept, footage replacement, or Remotion/Lovable video implementation, read and follow `docs/ZAPLA_VIDEO_CREATIVE_SYSTEM.md`. It is the authoritative source of truth for Zapla video/motion work.
