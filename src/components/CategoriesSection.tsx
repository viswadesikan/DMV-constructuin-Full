import { useState } from "react";
import { Layers, Building2, Compass } from "lucide-react";
import FileUploadCard from "./FileUploadCard";
import type { FileItem } from "@/hooks/useFiles";

interface CategoriesSectionProps {
  getFilesByCategory: (cat: string, sub?: string) => FileItem[];
  addFile: (name: string, category: string, subcategory?: string, fileData?: string, fileType?: string) => void;
  deleteFile: (id: string) => void;
}

const tabs = [
  { id: "dtcp", label: "DTCP", icon: Layers },
  { id: "localbody", label: "Local Body", icon: Building2 },
  { id: "vasthu", label: "Vasthu Plan", icon: Compass },
];

const CategoriesSection = ({ getFilesByCategory, addFile, deleteFile }: CategoriesSectionProps) => {
  const [activeTab, setActiveTab] = useState("dtcp");

  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <h2 className="mb-2 text-center text-2xl font-bold tracking-tight text-foreground">
          DTCP – LOCAL BODY – VASTHU PLAN
        </h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Browse and manage construction files by category
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "premium-card text-foreground hover:shadow-md"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "dtcp" && (
          <div className="grid gap-8 md:grid-cols-2">
            <FileUploadCard title="Layout" files={getFilesByCategory("dtcp", "layout")} onUpload={(name, data, type) => addFile(name, "dtcp", "layout", data, type)} onDelete={deleteFile} />
            <FileUploadCard title="Building" files={getFilesByCategory("dtcp", "building")} onUpload={(name, data, type) => addFile(name, "dtcp", "building", data, type)} onDelete={deleteFile} />
          </div>
        )}

        {activeTab === "localbody" && (
          <div className="grid gap-8 md:grid-cols-3">
            <FileUploadCard title="Village Panchayat" files={getFilesByCategory("localbody", "village")} onUpload={(name, data, type) => addFile(name, "localbody", "village", data, type)} onDelete={deleteFile} />
            <FileUploadCard title="Town Panchayat" files={getFilesByCategory("localbody", "town")} onUpload={(name, data, type) => addFile(name, "localbody", "town", data, type)} onDelete={deleteFile} />
            <FileUploadCard title="Municipality" files={getFilesByCategory("localbody", "municipality")} onUpload={(name, data, type) => addFile(name, "localbody", "municipality", data, type)} onDelete={deleteFile} />
          </div>
        )}

        {activeTab === "vasthu" && (
          <div className="mx-auto max-w-lg">
            <FileUploadCard title="Vasthu Plan" files={getFilesByCategory("vasthu")} onUpload={(name, data, type) => addFile(name, "vasthu", undefined, data, type)} onDelete={deleteFile} />
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
