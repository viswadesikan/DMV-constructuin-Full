import { useState, useEffect } from "react";
import { Layers, Building2, Landmark, Compass, HardHat, ShieldCheck, Flame, Droplets, Factory, Box, GitBranch, Zap, FileText, Eye, Download, X } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { storage } from "@/lib/storage";
import type { FileItem } from "@/types";

const tabs = [
  { id: "dtcp", label: "DTCP", icon: Layers },
];

const INITIAL_FILES = 6;

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("dtcp");
  const [viewFile, setViewFile] = useState<FileItem | null>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [showAllMap, setShowAllMap] = useState<Record<string, boolean>>({});
  const titleReveal = useScrollReveal();
  const tabsReveal = useScrollReveal();

  useEffect(() => {
    const fetchFiles = () => {
      storage.getFiles().then(all => {
        setFiles(all.filter(f => f.isPublic));
      }).catch(console.error);
    };
    fetchFiles();
    const interval = setInterval(fetchFiles, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = (file: FileItem) => {
    const link = document.createElement("a");
    link.href = file.fileUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderFiles = (category: string, subcategory?: string) => {
    const key = `${category}-${subcategory ?? "all"}`;
    const showAll = !!showAllMap[key];
    const filtered = files.filter(f =>
      f.category?.toLowerCase() === category.toLowerCase() &&
      (!subcategory || f.subcategory?.toLowerCase() === subcategory.toLowerCase())
    );
    if (filtered.length === 0) return (
      <div className="flex flex-col items-center py-10 sm:py-14 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 mb-4">
          <FileText className="h-8 w-8 text-primary/30" />
        </div>
        <p className="text-sm text-muted-foreground">No projects uploaded yet</p>
      </div>
    );

    const visible = showAll ? filtered : filtered.slice(0, INITIAL_FILES);

    return (
      <div>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((file, i) => (
            <div
              key={file.id}
              className="premium-card glow-on-hover rounded-xl p-4 sm:p-5 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-foreground truncate">{file.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{file.uploadDate}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => setViewFile(file)} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition-all duration-300 hover:scale-105">
                  <Eye className="h-3.5 w-3.5" /> View
                </button>
                <button onClick={() => handleDownload(file)} className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/20 transition-all duration-300 hover:scale-105">
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length > INITIAL_FILES && (
          <div className="mt-5 flex justify-center">
            <button
              onClick={() => setShowAllMap(m => ({ ...m, [key]: !m[key] }))}
              className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-6 py-2.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              {showAll ? "Show Less ↑" : `View All ${filtered.length} Projects ↓`}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="relative py-16 md:py-24 bg-secondary/30 overflow-hidden" id="projects">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      
      <div className="container relative mx-auto px-4 sm:px-6">
        <div ref={titleReveal.ref} className={`reveal-base reveal-up ${titleReveal.isVisible ? "reveal-visible" : ""}`}>
          <h2 className="mb-3 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Our <span className="gradient-text">Projects</span>
          </h2>
          <p className="mx-auto mb-10 sm:mb-14 max-w-2xl text-center text-sm sm:text-base text-muted-foreground">
            Browse our completed projects by category
          </p>
        </div>

        <div ref={tabsReveal.ref} className={`mb-8 sm:mb-10 flex flex-wrap justify-center gap-2 sm:gap-3 reveal-base reveal-scale ${tabsReveal.isVisible ? "reveal-visible" : ""}`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all duration-500 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                    : "premium-card text-foreground hover:shadow-md hover:scale-105"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div key={activeTab} className="animate-fade-in">
          {activeTab === "dtcp" && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="mb-4 text-base sm:text-lg font-bold text-foreground">Layout Projects</h3>
                {renderFiles("dtcp", "layout")}
              </div>
              <div>
                <h3 className="mb-4 text-base sm:text-lg font-bold text-foreground">Building Projects</h3>
                {renderFiles("dtcp", "building")}
              </div>
            </div>
          )}
        </div>
      </div>

      {viewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4 animate-fade-in" onClick={() => setViewFile(null)}>
          <div className="relative max-h-[90vh] max-w-4xl w-full bg-background rounded-2xl overflow-hidden shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-foreground truncate pr-4">{viewFile.name}</h3>
              <button
                onClick={() => setViewFile(null)}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-secondary transition-colors shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
              {viewFile.fileUrl && viewFile.fileType?.startsWith("image/") && <img src={viewFile.fileUrl} alt={viewFile.name} className="w-full h-auto rounded-lg" />}
              {viewFile.fileUrl && viewFile.fileType === "application/pdf" && <iframe src={viewFile.fileUrl} className="w-full h-[70vh]" title={viewFile.name} />}
              {viewFile.fileUrl && !viewFile.fileType?.startsWith("image/") && viewFile.fileType !== "application/pdf" && <p className="text-center text-muted-foreground py-8">Preview not available. Please download to view.</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
