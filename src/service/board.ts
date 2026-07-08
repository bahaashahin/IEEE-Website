const API_BASE = import.meta.env.VITE_BETTER_AUTH_CLIENT;

interface BoardQueryParams {
  yearFrom: string;
  yearTo?: string;
  memberType: string;
  position?: string;
  track?: string;
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

export const createBoardMember = async ({
  formData,
}: {
  formData: FormData;
}) => {
  const res = await fetch(`${API_BASE}/api/v1/board`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const json = await res.json();
  return json;
};

export const updateBoardMember = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const res = await fetch(`${API_BASE}/api/v1/board/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const json = await res.json();
  return json;
};

export const deleteBoardMember = async ({ id }: { id: string }) => {
  const res = await fetch(`${API_BASE}/api/v1/board/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}}`);

  if (res.status === 204) return;
  const json = await res.json();
  return json;
};
