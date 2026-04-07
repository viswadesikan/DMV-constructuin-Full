import { FolderOpen } from "lucide-react";
import FileUploadCard from "./FileUploadCard";
import type { FileItem } from "@/hooks/useFiles";

interface GoSectionProps {
  getFilesByCategory: (cat: string, sub?: string) => FileItem[];
  addFile: (name: string, category: string, subcategory?: string, fileData?: string, fileType?: string) => void;
  deleteFile: (id: string) => void;
}

const folders = [
  { id: "dtcp-layout", label: "DTCP Layout G.O's" },
  { id: "building", label: "Building G.O's" },
  { id: "localbody", label: "Local Body G.O's" },
];

const GoSection = ({ getFilesByCategory, addFile, deleteFile }: GoSectionProps) => {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <FolderOpen className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Government G.O's</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {folders.map((folder) => (
            <FileUploadCard
              key={folder.id}
              title={folder.label}
              files={getFilesByCategory("go", folder.id)}
              onUpload={(name, data, type) => addFile(name, "go", folder.id, data, type)}
              onDelete={deleteFile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoSection;
