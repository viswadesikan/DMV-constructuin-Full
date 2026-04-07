import { useState, useCallback, useRef, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "";

export interface FileItem {
  id: string;
  name: string;
  uploadDate: string;
  category: string;
  subcategory?: string;
  fileUrl?: string;
  fileType?: string;
  isPublic?: boolean;
  clientId?: string;
}

const toFileItem = (f: any): FileItem => ({
  id: String(f._id ?? "").replace(/[^a-zA-Z0-9_-]/g, ""),
  name: String(f.name ?? "").replace(/<[^>]*>/g, "").trim().slice(0, 255),
  uploadDate: String(f.createdAt ?? "").split("T")[0],
  category: String(f.category ?? "").replace(/[^a-zA-Z0-9_-]/g, ""),
  subcategory: f.subcategory ? String(f.subcategory).replace(/[^a-zA-Z0-9_-]/g, "") : undefined,
  fileUrl: f.fileUrl && (String(f.fileUrl).startsWith("https://") || String(f.fileUrl).startsWith("data:") || String(f.fileUrl).startsWith("blob:")) ? String(f.fileUrl) : undefined,
  fileType: f.fileType ? String(f.fileType).replace(/[^a-zA-Z0-9/._+-]/g, "") : undefined,
  isPublic: Boolean(f.isPublic),
  clientId: f.clientId ? String(f.clientId?._id || f.clientId).replace(/[^a-zA-Z0-9_-]/g, "") : undefined,
});

export function useFiles(adminMode = false) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [deletedFile, setDeletedFile] = useState<FileItem | null>(null);
  const undoTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchFiles();
  }, [adminMode]);

  const fetchFiles = async () => {
    if (!API_URL) return;
    try {
      const url = adminMode ? `${API_URL}/api/files` : `${API_URL}/api/files/public`;
      const res = await fetch(url);
      if (!res.ok) return;
      const data = await res.json();
      setFiles(data.map(toFileItem));
    } catch {
      // API not available
    }
  };

  const addFile = useCallback(async (
    name: string, category: string, subcategory?: string,
    fileData?: string, fileType?: string,
    isPublic?: boolean, clientId?: string
  ) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    if (subcategory) formData.append("subcategory", subcategory);
    if (isPublic !== undefined) formData.append("isPublic", String(isPublic));
    if (clientId) formData.append("clientId", clientId);

    if (fileData && fileType) {
      const base64 = fileData.split(",")[1];
      const byteArray = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      const blob = new Blob([byteArray], { type: fileType });
      formData.append("file", blob, name);
    }

    const res = await fetch(`${API_URL}/api/files`, { method: "POST", body: formData });
    const data = await res.json();
    setFiles((prev) => [toFileItem(data), ...prev]);
  }, []);

  const deleteFile = useCallback(async (id: string) => {
    const fileToDelete = files.find((f) => f.id === id);
    if (!fileToDelete) return;
    setDeletedFile(fileToDelete);
    setFiles((prev) => prev.filter((f) => f.id !== id));
    await fetch(`${API_URL}/api/files/${id}`, { method: "DELETE" });
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    undoTimerRef.current = setTimeout(() => setDeletedFile(null), 10000);
  }, [files]);

  const undoDelete = useCallback(async () => {
    if (!deletedFile) return;
    const formData = new FormData();
    formData.append("name", deletedFile.name);
    formData.append("category", deletedFile.category);
    if (deletedFile.subcategory) formData.append("subcategory", deletedFile.subcategory);
    const res = await fetch(`${API_URL}/api/files`, { method: "POST", body: formData });
    const data = await res.json();
    setFiles((prev) => [toFileItem(data), ...prev]);
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setDeletedFile(null);
  }, [deletedFile]);

  const togglePublic = useCallback(async (id: string) => {
    const res = await fetch(`${API_URL}/api/files/${id}/toggle-public`, { method: "PATCH" });
    const data = await res.json();
    setFiles((prev) => prev.map((f) => f.id === id ? toFileItem(data) : f));
  }, []);

  const assignToClient = useCallback(async (id: string, clientId: string | null) => {
    const res = await fetch(`${API_URL}/api/files/${id}/assign`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId }),
    });
    const data = await res.json();
    setFiles((prev) => prev.map((f) => f.id === id ? toFileItem(data) : f));
  }, []);

  const getFilesByCategory = useCallback((category: string, subcategory?: string) => {
    return files.filter(
      (f) => f.category === category && (!subcategory || f.subcategory === subcategory)
    );
  }, [files]);

  const recentFiles = files.slice(0, 10);

  return { files, recentFiles, addFile, getFilesByCategory, deleteFile, deletedFile, undoDelete, togglePublic, assignToClient, refetch: fetchFiles };
}
