import { useState } from "react";
import { Layers, Building2, Compass, FileText, Eye, Download, X } from "lucide-react";
import { useFiles } from "@/hooks/useFiles";
import type { FileItem } from "@/hooks/useFiles";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const tabs = [
  { id: "dtcp", label: "DTCP", icon: Layers },
  { id: "localbody", label: "Local Body", icon: Building2 },
  { id: "vasthu", label: "Vasthu Plan", icon: Compass },
];

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("dtcp");
  const [viewFile, setViewFile] = useState<FileItem | null>(null);
  const { getFilesByCategory } = useFiles();
  const titleReveal = useScrollReveal();
  const tabsReveal = useScrollReveal();

  const handleDownload = (file: FileItem) => {
    if (!file.fileUrl) return;
    const link = document.createElement("a");
    link.href = file.fileUrl;
    link.download = file.name;
    link.target = "_blank";
    link.click();
  };

  const renderFiles = (category: string, subcategory?: string) => {
    const files = getFilesByCategory(category, subcategory);
    if (files.length === 0) return <p className="text-center text-sm text-muted-foreground py-8">No projects uploaded yet</p>;
    
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {files.map((file, i) => (
          <div
            key={file.id}
            className="premium-card rounded-xl p-5 animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-foreground truncate">{file.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{file.uploadDate}</p>
              </div>
            </div>
            {file.fileUrl && (
              <div className="flex gap-2 mt-3">
                <button onClick={() => setViewFile(file)} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
                  <Eye className="h-3.5 w-3.5" /> View
                </button>
                <button onClick={() => handleDownload(file)} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 md:py-20 bg-secondary/30" id="projects">
      <div className="container mx-auto px-4">
        <div
          ref={titleReveal.ref}
          className={`reveal-base reveal-up ${titleReveal.isVisible ? "reveal-visible" : ""}`}
        >
          <h2 className="mb-3 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Our Projects
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            Browse our completed projects by category
          </p>
        </div>

        <div
          ref={tabsReveal.ref}
          className={`mb-10 flex flex-wrap justify-center gap-3 reveal-base reveal-scale ${tabsReveal.isVisible ? "reveal-visible" : ""}`}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
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
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-lg font-bold text-foreground">Layout Projects</h3>
              {renderFiles("dtcp", "layout")}
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-foreground">Building Projects</h3>
              {renderFiles("dtcp", "building")}
            </div>
          </div>
        )}

        {activeTab === "localbody" && (
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-lg font-bold text-foreground">Village Panchayat</h3>
              {renderFiles("localbody", "village")}
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-foreground">Town Panchayat</h3>
              {renderFiles("localbody", "town")}
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-foreground">Municipality</h3>
              {renderFiles("localbody", "municipality")}
            </div>
          </div>
        )}

        {activeTab === "vasthu" && (
          <div>
            <h3 className="mb-4 text-lg font-bold text-foreground text-center">Vasthu Plans</h3>
            {renderFiles("vasthu")}
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-fade-in" onClick={() => setViewFile(null)}>
          <div className="relative max-h-[90vh] max-w-4xl w-full bg-background rounded-xl overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-foreground">{viewFile.name}</h3>
              <button onClick={() => setViewFile(null)} className="rounded-lg p-2 hover:bg-secondary transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
              {viewFile.fileUrl && viewFile.fileType?.startsWith("image/") && (
                <img src={viewFile.fileUrl} alt={viewFile.name} className="w-full h-auto" />
              )}
              {viewFile.fileUrl && viewFile.fileType === "application/pdf" && (
                <iframe src={viewFile.fileUrl} className="w-full h-[70vh]" title={viewFile.name} />
              )}
              {viewFile.fileUrl && !viewFile.fileType?.startsWith("image/") && viewFile.fileType !== "application/pdf" && (
                <p className="text-center text-muted-foreground">Preview not available. Please download to view.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
