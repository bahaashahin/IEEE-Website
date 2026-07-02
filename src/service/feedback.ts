const API_BASE = "https://ieee-alazhar-api.vercel.app";

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
