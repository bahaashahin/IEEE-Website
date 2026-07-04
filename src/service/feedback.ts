const API_BASE = import.meta.env.VITE_BETTER_AUTH_CLIENT;

export interface FeedbackPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const submitFeedback = async (payload: FeedbackPayload) => {
  const res = await fetch(`${API_BASE}/api/v1/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  return res.json();
};

export type FeedbackStatus = "unread" | "read" | "archived" | "resolved";

export interface FeedbackItem {
  id: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: FeedbackStatus;
  createdAt: string;
  date?: string;
}

export const getFeedbacks = async (): Promise<FeedbackItem[]> => {
  const res = await fetch(`${API_BASE}/api/v1/feedback`, {
    credentials: "include"
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const json = await res.json();
  return (json.data ?? json) as FeedbackItem[];
};

export const updateFeedbackStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const res = await fetch(`${API_BASE}/api/v1/feedback/${id}/status`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};

export const deleteFeedback = async ({
  id,
}: {
  id: string;
}) => {
  const res = await fetch(`${API_BASE}/api/v1/feedback/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
};
