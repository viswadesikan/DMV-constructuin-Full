import type { FileItem, Client, Review, HomepageSection } from "@/types";

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

async function readJsonBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) {
    throw new Error(`Empty response from server (${res.status} ${res.statusText})`);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      `Server did not return JSON (${res.status}): ${text.slice(0, 160)}${text.length > 160 ? "…" : ""}`
    );
  }
}

/** Parse JSON and throw if HTTP status indicates failure. */
async function parseJsonResponse<T>(res: Response): Promise<T> {
  const data = (await readJsonBody(res)) as T;
  if (!res.ok) {
    const errMsg = (data as { error?: string }).error || res.statusText || "Request failed";
    throw new Error(errMsg);
  }
  return data;
}

export const storage = {
  getFiles: async (): Promise<FileItem[]> => {
    const res = await fetch(`${API_URL}/files`);
    return parseJsonResponse<FileItem[]>(res);
  },
  addFile: async (file: FileItem): Promise<FileItem> => {
    const res = await fetch(`${API_URL}/files`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(file),
    });
    return parseJsonResponse<FileItem>(res);
  },
  updateFile: async (id: string, updates: Partial<FileItem>): Promise<FileItem> => {
    const res = await fetch(`${API_URL}/files/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return parseJsonResponse<FileItem>(res);
  },
  deleteFile: async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/files/${id}`, { method: "DELETE" });
    await parseJsonResponse<{ success?: boolean }>(res);
  },

  getClients: async (): Promise<Client[]> => {
    const res = await fetch(`${API_URL}/clients`);
    return parseJsonResponse<Client[]>(res);
  },
  addClient: async (client: Client): Promise<Client> => {
    const res = await fetch(`${API_URL}/clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    });
    return parseJsonResponse<Client>(res);
  },
  loginClient: async (credentials: { username: string; password: string }): Promise<{
    success: boolean;
    client?: Client;
    message?: string;
  }> => {
    const res = await fetch(`${API_URL}/clients/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return readJsonBody(res) as Promise<{
      success: boolean;
      client?: Client;
      message?: string;
    }>;
  },
  deleteClient: async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/clients/${id}`, { method: "DELETE" });
    await parseJsonResponse<{ success?: boolean }>(res);
  },

  getReviews: async (): Promise<Review[]> => {
    const res = await fetch(`${API_URL}/reviews`);
    return parseJsonResponse<Review[]>(res);
  },
  addReview: async (review: Review): Promise<Review> => {
    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    return parseJsonResponse<Review>(res);
  },
  updateReview: async (id: string, updates: Partial<Review>): Promise<Review> => {
    const res = await fetch(`${API_URL}/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return parseJsonResponse<Review>(res);
  },
  deleteReview: async (id: string): Promise<void> => {
    const res = await fetch(`${API_URL}/reviews/${id}`, { method: "DELETE" });
    await parseJsonResponse<{ success?: boolean }>(res);
  },

  getHomepage: async (): Promise<HomepageSection> => {
    const res = await fetch(`${API_URL}/homepage`);
    const data = (await parseJsonResponse<Record<string, boolean>>(res)) as Record<string, boolean>;
    return {
      hero: data.hero ?? true,
      overview: data.overview ?? true,
      services: data.services ?? true,
      projects: data.projects ?? true,
      reviews: data.reviews ?? true,
      contact: data.contact ?? true,
    };
  },
  setHomepage: async (config: HomepageSection): Promise<HomepageSection> => {
    const res = await fetch(`${API_URL}/homepage`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    return parseJsonResponse<HomepageSection>(res);
  },
};
