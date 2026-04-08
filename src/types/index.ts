export interface FileItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  fileUrl: string;
  fileType: string;
  uploadDate: string;
  isPublic: boolean;
  assignedTo?: string;
}

export interface Client {
  id: string;
  name: string;
  username: string;
  password: string;
  phone: string;
  projectName: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  approved: boolean;
}

export interface HomepageSection {
  hero: boolean;
  overview: boolean;
  services: boolean;
  projects: boolean;
  reviews: boolean;
  contact: boolean;
}
