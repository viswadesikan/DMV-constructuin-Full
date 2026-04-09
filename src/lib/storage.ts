import type { FileItem, Client, Review, HomepageSection } from "@/types";

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

export const storage = {
  getFiles: async (): Promise<FileItem[]> => {
    const res = await fetch(`${API_URL}/files`);
    return res.json();
  },
  addFile: async (file: FileItem): Promise<FileItem> => {
    const res = await fetch(`${API_URL}/files`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(file)
    });
    return res.json();
  },
  updateFile: async (id: string, updates: Partial<FileItem>): Promise<FileItem> => {
    const res = await fetch(`${API_URL}/files/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    });
    return res.json();
  },
  deleteFile: async (id: string): Promise<void> => {
    await fetch(`${API_URL}/files/${id}`, { method: "DELETE" });
  },

  getClients: async (): Promise<Client[]> => {
    const res = await fetch(`${API_URL}/clients`);
    return res.json();
  },
  addClient: async (client: Client): Promise<Client> => {
    const res = await fetch(`${API_URL}/clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client)
    });
    return res.json();
  },
  loginClient: async (credentials: any): Promise<{ success: boolean, client?: Client, message?: string }> => {
    const res = await fetch(`${API_URL}/clients/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });
    return res.json();
  },
  deleteClient: async (id: string): Promise<void> => {
    await fetch(`${API_URL}/clients/${id}`, { method: "DELETE" });
  },

  getReviews: async (): Promise<Review[]> => {
    const res = await fetch(`${API_URL}/reviews`);
    return res.json();
  },
  addReview: async (review: Review): Promise<Review> => {
    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review)
    });
    return res.json();
  },
  updateReview: async (id: string, updates: Partial<Review>): Promise<Review> => {
    const res = await fetch(`${API_URL}/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    });
    return res.json();
  },
  deleteReview: async (id: string): Promise<void> => {
    await fetch(`${API_URL}/reviews/${id}`, { method: "DELETE" });
  },

  getHomepage: async (): Promise<HomepageSection> => {
    const res = await fetch(`${API_URL}/homepage`);
    const data = await res.json();
    return {
      hero: data.hero ?? true,
      overview: data.overview ?? true,
      services: data.services ?? true,
      projects: data.projects ?? true,
      reviews: data.reviews ?? true,
      contact: data.contact ?? true
    };
  },
  setHomepage: async (config: HomepageSection): Promise<HomepageSection> => {
    const res = await fetch(`${API_URL}/homepage`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config)
    });
    return res.json();
  },
};
