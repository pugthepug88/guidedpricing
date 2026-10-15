import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";

// Use the incoming site origin so previews and the final domain share their own asset.
export const getSocialImageUrl = createIsomorphicFn()
  .server(() => new URL("/social/zapla-share.png", getRequestUrl()).href)
  .client(() => new URL("/social/zapla-share.png", window.location.origin).href);
