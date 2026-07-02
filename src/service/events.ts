import { sanityClient } from "../lib/sanity/client";

interface Speaker {
  name: string;
  title: string;
  photo?: Image;
}

interface Image {
  asset: { url: string };
}

export interface SanityEvent {
  _id: string;
  title: string;
  slug: { current: string };
  startDate: string;
  endDate: string;
  location?: string;
  subtitle?: string;
  registrationLink?: string;
  coverImage?: Image;
  speakers?: Speaker[];
  memories?: { photo: Image }[];
}

export const getEvents = async (): Promise<SanityEvent[]> => {
  return sanityClient.fetch(`
    *[_type == "event"] | order(startDate desc) {
      _id, title, slug,
      startDate, endDate, location, subtitle,
      registrationLink, coverImage { asset -> { url } }
    }`);
};

export const getEventById = async (
  id: string,
): Promise<SanityEvent | undefined> => {
  return sanityClient.fetch(
    `
    *[_type == "event" && _id == $id][0] {
      _id, title, slug,
      speakers[] {name, title, photo { asset -> { url }}},
      memories[] {photo { asset -> { url }}},
      startDate, endDate, location, subtitle,
      registrationLink, coverImage { asset -> { url } }
    }`,
    { id },
  );
};
