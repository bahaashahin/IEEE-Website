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
  startDateSecondV?: string;
  endDateSecondV?: string;
  location?: string;
  subtitle?: string;
  registrationLink?: string;
  coverImage?: Image;
  speakers?: Speaker[];
  memories?: { photo: Image }[];
}

export const getEvents = async (): Promise<SanityEvent[]> => {
  const res = await fetch(`/api/v1/events`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const json = await res.json();
  return (json.data ?? json) as SanityEvent[];
};

export const getEventById = async (id: string): Promise<SanityEvent> => {
  const res = await fetch(`/api/v1/events/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const json = await res.json();
  return (json.data ?? json) as SanityEvent;
};
