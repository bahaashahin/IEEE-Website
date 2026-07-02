import { sanityClient } from "../lib/sanity/client";

export interface Committee {
  _id: string;
  name: string;
  type: string;
  description: string;
  logo: { asset: { url: string } };
}

export const getCommittees = async () => {
  const query = `*[_type == "committee"] {
    _id, name, type, description, logo { asset -> { url } }
  }`;
  const result: Committee[] = await sanityClient.fetch(query);

  const grouped = result.reduce(
    (acc, c) => {
      (acc[c.type] ??= []).push(c);
      return acc;
    },
    {} as Record<string, typeof result>,
  );
  return grouped;
};
