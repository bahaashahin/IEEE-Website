export async function throwIfNotOk(res: Response) {
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = body?.message ?? body?.error ?? message;
    } catch {
      if (res.statusText) {
        message = `HTTP ${res.status}: ${res.statusText}`;
      }
    }
    throw new Error(message);
  }
}
