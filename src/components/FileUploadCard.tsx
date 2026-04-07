import { useState, useRef } from "react";
import { Upload, Download, Eye, FileText, X, Trash2 } from "lucide-react";
import type { FileItem } from "@/hooks/useFiles";

interface FileUploadCardProps {
  title: string;
  files: FileItem[];
  onUpload: (name: string, fileData: string, fileType: string) => void;
  onDelete?: (id: string) => void;
}

const FileUploadCard = ({ title, files, onUpload, onDelete }: FileUploadCardProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [viewFile, setViewFile] = useState<FileItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onUpload(file.name, result, file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) handleFileRead(droppedFiles[0]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (selected && selected.length > 0) {
      handleFileRead(selected[0]);
      e.target.value = "";
    }
  };

  const handleDownload = (file: FileItem) => {
    if (!file.fileUrl) return;
    const safeName = file.name.replace(/[^a-zA-Z0-9._\-\s]/g, "_");
    const safeUrl = file.fileUrl.startsWith("data:") || file.fileUrl.startsWith("blob:") ? file.fileUrl : "";
    if (!safeUrl) return;
    const link = document.createElement("a");
    link.href = safeUrl;
    link.download = safeName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="premium-card rounded-xl p-6">
        <h4 className="mb-4 text-base font-bold tracking-tight text-foreground">{title}</h4>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mb-5 cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all ${
            dragOver ? "border-primary bg-primary/5 scale-[1.02]" : "border-border/60 hover:border-primary/40 hover:bg-primary/[0.02]"
          }`}
        >
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Upload className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            Drag & drop or <span className="font-semibold text-primary">browse files</span>
          </p>
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} accept="image/*,.pdf,.doc,.docx" />
        </div>
        {files.length > 0 ? (
          <div className="space-y-2">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between rounded-lg bg-secondary/40 px-4 py-2.5 transition-colors hover:bg-secondary/70">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{file.name}</p>
                    <p className="text-[10px] text-muted-foreground">{file.uploadDate}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {file.fileUrl && (
                    <>
                      <button onClick={() => setViewFile(file)} className="rounded-lg p-1.5 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary" title="View">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => handleDownload(file)} className="rounded-lg p-1.5 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary" title="Download">
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                  {onDelete && (
                    <button onClick={() => onDelete(file.id)} className="rounded-lg p-1.5 text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive" title="Delete">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xs text-muted-foreground/60">No files uploaded yet</p>
        )}
      </div>

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
    </>
  );
};

export default FileUploadCard;
