import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FileText, Eye, Download, LogOut, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { storage } from "@/lib/storage";
import type { FileItem } from "@/types";
import dmvLogo from "@/assets/dmv-logo-new.jpeg";

const ClientPortal = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [viewFile, setViewFile] = useState<FileItem | null>(null);
  const files = storage.getFiles().filter((f) => f.assignedTo === user?.clientId);

  const handleLogout = () => {
    logout();
    navigate("/client");
  };

  const handleDownload = (file: FileItem) => {
    const link = document.createElement("a");
    link.href = file.fileUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={dmvLogo} alt="DMV" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <h1 className="text-lg font-black">Welcome, {user?.name}</h1>
              {user?.projectName && <p className="text-xs text-muted-foreground">{user.projectName}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary">← Website</Link>
            <button onClick={handleLogout} className="flex items-center gap-1 text-xs text-destructive hover:bg-destructive/10 px-3 py-1.5 rounded-lg">
              <LogOut className="h-3 w-3" /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-black mb-2">Your Files</h2>
          <p className="text-sm text-muted-foreground">Total: {files.length} files</p>
        </div>

        {files.length === 0 ? (
          <div className="premium-card rounded-xl p-12 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
            <p className="text-muted-foreground">No files assigned yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <div key={file.id} className="premium-card rounded-xl p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground truncate">{file.name}</h3>
                    <p className="text-xs text-muted-foreground">{file.uploadDate}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground">
                    {file.category} › {file.subcategory}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewFile(file)}
                    className="flex-1 flex items-center justify-center gap-1 bg-primary/10 text-primary hover:bg-primary/20 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" /> View
                  </button>
                  <button
                    onClick={() => handleDownload(file)}
                    className="flex-1 flex items-center justify-center gap-1 bg-secondary hover:bg-secondary/80 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
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
              {viewFile.fileType?.startsWith("image/") && (
                <img src={viewFile.fileUrl} alt={viewFile.name} className="w-full h-auto" />
              )}
              {viewFile.fileType === "application/pdf" && (
                <iframe src={viewFile.fileUrl} className="w-full h-[70vh]" title={viewFile.name} />
              )}
              {!viewFile.fileType?.startsWith("image/") && viewFile.fileType !== "application/pdf" && (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground/40" />
                  <p className="text-muted-foreground mb-4">Preview not available for this file type.</p>
                  <button
                    onClick={() => handleDownload(viewFile)}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold"
                  >
                    <Download className="h-4 w-4" /> Download to View
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPortal;
