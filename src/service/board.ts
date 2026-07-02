const API_BASE = "https://ieee-alazhar-api.vercel.app";

interface BoardQueryParams {
  yearFrom: string;
  yearTo?: string;
  memberType: string;
  position?: string;
}

export const fetchBoard = async (params: BoardQueryParams) => {
  const searchParams = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined) as [
      string,
      string,
    ][],
  );
  const res = await fetch(`${API_BASE}/api/v1/board?${searchParams}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const json = await res.json();
  return json.data ?? json;
};

export const fetchBoardYears = async () => {
  const res = await fetch(`${API_BASE}/api/v1/board/years`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const json = await res.json();
  return (json.data?.years ?? json.years) as string[];
};
