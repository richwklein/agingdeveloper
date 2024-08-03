import { getEntry } from "astro:content";

export const getSite = async () => {
  const entry = getEntry("site", "agingdeveloper");
  return entry;
};
