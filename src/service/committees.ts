export interface Committee {
  _id: string;
  name: string;
  type: string;
  description: string;
  logo: { asset: { url: string } };
}

export interface GroupedCommitteesResponse {
  technical: {
    "cs-fundamentals": Committee[];
    "software-development": Committee[];
    "systems-and-data": Committee[];
    engineering: Committee[];
  };
  operation: Committee[];
  branding: Committee[];
}

export const getCommittees = async (): Promise<GroupedCommitteesResponse> => {
  const res = await fetch(`/api/v1/committees`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const json = await res.json();
  return json.data ?? json;
};
