const API_BASE = import.meta.env.VITE_BETTER_AUTH_CLIENT;

interface Committee {
  _id: string;
  name: string;
  type: string;
  description: string;
  logo: { asset: { url: string } };
}

export type GroupedCommittees = Record<string, Committee[]>;

export const getCommittees = async (): Promise<GroupedCommittees> => {
  const res = await fetch(`${API_BASE}/api/v1/committees`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const json = await res.json();
  return (json.data ?? json) as GroupedCommittees;
};
