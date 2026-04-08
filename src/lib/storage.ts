import type { FileItem, Client, Review, HomepageSection } from "@/types";

const KEYS = {
  FILES: "dmv_files",
  CLIENTS: "dmv_clients",
  REVIEWS: "dmv_reviews",
  HOMEPAGE: "dmv_homepage",
};

export const storage = {
  getFiles: (): FileItem[] => JSON.parse(localStorage.getItem(KEYS.FILES) || "[]"),
  setFiles: (files: FileItem[]) => localStorage.setItem(KEYS.FILES, JSON.stringify(files)),
  
  getClients: (): Client[] => JSON.parse(localStorage.getItem(KEYS.CLIENTS) || "[]"),
  setClients: (clients: Client[]) => localStorage.setItem(KEYS.CLIENTS, JSON.stringify(clients)),
  
  getReviews: (): Review[] => JSON.parse(localStorage.getItem(KEYS.REVIEWS) || "[]"),
  setReviews: (reviews: Review[]) => localStorage.setItem(KEYS.REVIEWS, JSON.stringify(reviews)),
  
  getHomepage: (): HomepageSection => JSON.parse(localStorage.getItem(KEYS.HOMEPAGE) || '{"hero":true,"overview":true,"services":true,"projects":true,"reviews":true,"contact":true}'),
  setHomepage: (config: HomepageSection) => localStorage.setItem(KEYS.HOMEPAGE, JSON.stringify(config)),
};
