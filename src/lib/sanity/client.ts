import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "lwizkpum", // from sanity.io/manage
  apiVersion: "2026-05-15",
  dataset: "production",
  useCdn: true, // true for read-only public data
});
