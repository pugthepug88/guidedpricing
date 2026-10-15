import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";

// Keep shared image URLs on the site being viewed, including authenticated previews.
export const getSiteOrigin = createIsomorphicFn()
  .server(() => getRequestUrl().origin)
  .client(() => window.location.origin);

export const getSocialImageUrl = () => new URL("/social/zapla-share.png", getSiteOrigin()).href;
