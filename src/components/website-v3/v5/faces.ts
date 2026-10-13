/* Fictional demo portraits used across the v5 product stage.
   All people, businesses and numbers in the v5 preview are fictional. */
import p1 from "@/assets/portrait-team-1.jpg.asset.json";
import p2 from "@/assets/portrait-team-2.jpg.asset.json";
import p3 from "@/assets/portrait-team-3.jpg.asset.json";
import p4 from "@/assets/portrait-team-4.jpg.asset.json";
import c1 from "@/assets/portrait-customer.jpg.asset.json";
import c2 from "@/assets/portrait-cust-2.jpg.asset.json";
import c3 from "@/assets/portrait-cust-3.jpg.asset.json";
import c4 from "@/assets/portrait-cust-4.jpg.asset.json";
import c5 from "@/assets/portrait-marcus-lee.jpg.asset.json";
import c6 from "@/assets/caller-portrait.jpg.asset.json";

export const FACE = {
  maya: c1.url,
  daniel: c5.url,
  priya: c2.url,
  tom: c3.url,
  sophie: c4.url,
  leo: c6.url,
  alex: p1.url,
  jordan: p2.url,
  nina: p3.url,
  sam: p4.url,
} as const;

export type FaceKey = keyof typeof FACE;
