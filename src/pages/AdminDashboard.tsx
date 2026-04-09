import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Upload, Trash2, Eye, Download, FileText, Users, Star, Home, LogOut, Undo2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { storage } from "@/lib/storage";
import type { FileItem, Client, Review, HomepageSection } from "@/types";
import dmvLogo from "@/assets/dmv-logo-new.jpeg";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"upload" | "showcase" | "clients" | "reviews" | "homepage">("upload");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [homepage, setHomepage] = useState<HomepageSection>({hero:true,overview:true,services:true,projects:true,reviews:true,contact:true});

  useEffect(() => {
    storage.getFiles().then(setFiles).catch(console.error);
    storage.getClients().then(setClients).catch(console.error);
    storage.getReviews().then(setReviews).catch(console.error);
    storage.getHomepage().then(setHomepage).catch(console.error);
  }, []);
  const [deleteQueue, setDeleteQueue] = useState<{ id: string; type: "file" | "client"; timer: NodeJS.Timeout } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({ name: "", category: "DTCP", subcategory: "Layout", assignedTo: "", isPublic: false });
  const [clientForm, setClientForm] = useState({ name: "", username: "", password: "", phone: "", projectName: "" });
  const [viewFile, setViewFile] = useState<FileItem | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const newFile: FileItem = {
        id: Date.now().toString(),
        name: formData.name || file.name,
        category: formData.category,
        subcategory: formData.subcategory,
        fileUrl: reader.result as string,
        fileType: file.type,
        uploadDate: new Date().toLocaleDateString(),
        isPublic: formData.isPublic,
        assignedTo: formData.assignedTo || undefined,
      };
      storage.addFile(newFile).then(savedFile => {
        setFiles([...files, savedFile]);
        setFormData({ name: "", category: "DTCP", subcategory: "Layout", assignedTo: "", isPublic: false });
        if (fileInputRef.current) fileInputRef.current.value = "";
      });
    };
    reader.readAsDataURL(file);
  };

  const deleteFile = (id: string) => {
    if (deleteQueue) clearTimeout(deleteQueue.timer);
    const timer = setTimeout(() => {
      storage.deleteFile(id).then(() => {
        setFiles(files.filter((f) => f.id !== id));
        setDeleteQueue(null);
      });
    }, 10000);
    setDeleteQueue({ id, type: "file", timer });
  };

  const undoDelete = () => {
    if (deleteQueue) {
      clearTimeout(deleteQueue.timer);
      setDeleteQueue(null);
    }
  };

  const togglePublic = (id: string) => {
    const file = files.find(f => f.id === id);
    if (!file) return;
    storage.updateFile(id, { isPublic: !file.isPublic }).then(() => {
      setFiles(files.map((f) => (f.id === id ? { ...f, isPublic: !f.isPublic } : f)));
    });
  };

  const assignToClient = (fileId: string, clientId: string) => {
    storage.updateFile(fileId, { assignedTo: clientId }).then(() => {
      setFiles(files.map((f) => (f.id === fileId ? { ...f, assignedTo: clientId } : f)));
    });
  };

  const addClient = () => {
    if (!clientForm.name || !clientForm.username || !clientForm.password) return;
    const newClient: Client = { ...clientForm, id: Date.now().toString() };
    storage.addClient(newClient).then(savedClient => {
      setClients([...clients, savedClient]);
      setClientForm({ name: "", username: "", password: "", phone: "", projectName: "" });
    });
  };

  const deleteClient = (id: string) => {
    if (!confirm("Delete this client?")) return;
    storage.deleteClient(id).then(() => {
      setClients(clients.filter((c) => c.id !== id));
    });
  };

  const approveReview = (id: string) => {
    storage.updateReview(id, { approved: true }).then(() => {
      setReviews(reviews.map((r) => (r.id === id ? { ...r, approved: true } : r)));
    });
  };

  const deleteReview = (id: string) => {
    storage.deleteReview(id).then(() => {
      setReviews(reviews.filter((r) => r.id !== id));
    });
  };

  const toggleSection = (section: keyof HomepageSection) => {
    const updated = { ...homepage, [section]: !homepage[section] };
    storage.setHomepage(updated).then(() => {
      setHomepage(updated);
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const getClientName = (id?: string) => clients.find((c) => c.id === id)?.name || "Unassigned";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={dmvLogo} alt="DMV" className="h-10 w-10 rounded-full object-cover" />
            <h1 className="text-lg font-black">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary">← Website</Link>
            <button onClick={handleLogout} className="flex items-center gap-1 text-xs text-destructive hover:bg-destructive/10 px-3 py-1.5 rounded-lg">
              <LogOut className="h-3 w-3" /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: "upload", label: "Upload Files", icon: Upload },
            { key: "showcase", label: "Showcase", icon: Eye },
            { key: "clients", label: "Clients", icon: Users },
            { key: "reviews", label: "Reviews", icon: Star },
            { key: "homepage", label: "Homepage", icon: Home },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                tab === key ? "bg-primary text-primary-foreground" : "bg-white hover:bg-secondary"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {tab === "upload" && (
          <div className="premium-card rounded-xl p-6 max-w-2xl">
            <h2 className="text-lg font-bold mb-4">Upload New File</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="File/Project Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
              <select value={formData.category} onChange={(e) => {
                  const newCat = e.target.value;
                  const newSub = newCat === "DTCP" ? "Layout" : newCat === "Local Body" ? "Village" : "";
                  setFormData({ ...formData, category: newCat, subcategory: newSub });
                }} className="w-full rounded-lg border px-3 py-2 text-sm">
                <option value="DTCP">DTCP</option>
                <option value="Local Body">Local Body</option>
                <option value="Vasthu Planning">Vasthu Planning</option>
                <option value="Construction Services">Construction Services</option>
                <option value="Agri NOC">Agri NOC</option>
                <option value="Fire NOC & Licence">Fire NOC & Licence</option>
                <option value="PWD - WRD NOC">PWD - WRD NOC</option>
                <option value="Building Running Licence">Building Running Licence</option>
                <option value="3D Elevation">3D Elevation</option>
                <option value="Structural Drawing">Structural Drawing</option>
                <option value="Plumbing & Electrical">Plumbing & Electrical</option>
                <option value="GO">GO</option>
              </select>
              {(formData.category === "DTCP" || formData.category === "Local Body") && (
                <select value={formData.subcategory} onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm">
                  {formData.category === "DTCP" && (
                    <>
                      <option value="Layout">Layout</option>
                      <option value="Building">Building</option>
                    </>
                  )}
                  {formData.category === "Local Body" && (
                    <>
                      <option value="Village">Village</option>
                      <option value="Town">Town</option>
                      <option value="Municipality">Municipality</option>
                    </>
                  )}
                </select>
              )}
              <select value={formData.assignedTo} onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm">
                <option value="">Assign to Client (Optional)</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={formData.isPublic} onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })} className="rounded" />
                Show on public website
              </label>
              <input ref={fileInputRef} type="file" onChange={handleFileUpload} accept="image/*,.pdf,.dwg,.doc,.docx,.xls,.xlsx" className="w-full text-sm" />
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-bold mb-3">Uploaded Files ({files.length})</h3>
              {deleteQueue && (
                <div className="mb-3 flex items-center justify-between bg-yellow-100 px-3 py-2 rounded-lg text-xs">
                  <span>Deleting in 10s...</span>
                  <button onClick={undoDelete} className="flex items-center gap-1 text-primary font-semibold">
                    <Undo2 className="h-3 w-3" /> Undo
                  </button>
                </div>
              )}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {files.map((file) => (
                  <div key={file.id} className={`flex items-center justify-between bg-secondary/40 px-3 py-2 rounded-lg ${deleteQueue?.id === file.id ? "opacity-50" : ""}`}>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs font-semibold">{file.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {file.category} › {file.subcategory} • {file.isPublic ? "Public" : "Private"} • {getClientName(file.assignedTo)}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => deleteFile(file.id)} className="text-destructive hover:bg-destructive/10 p-1.5 rounded">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "showcase" && (
          <div className="premium-card rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Showcase Files</h2>
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between bg-secondary/40 px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <div>
                      <p className="text-xs font-semibold">{file.name}</p>
                      <p className="text-[10px] text-muted-foreground">{file.category} › {file.subcategory}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select value={file.assignedTo || ""} onChange={(e) => assignToClient(file.id, e.target.value)} className="text-xs border rounded px-2 py-1">
                      <option value="">Unassigned</option>
                      {clients.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <button onClick={() => togglePublic(file.id)} className={`text-xs px-2 py-1 rounded ${file.isPublic ? "bg-green-100 text-green-700" : "bg-gray-100"}`}>
                      {file.isPublic ? "Public" : "Private"}
                    </button>
                    <button onClick={() => setViewFile(file)} className="p-1 hover:bg-primary/10 rounded">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "clients" && (
          <div className="premium-card rounded-xl p-6 max-w-2xl">
            <h2 className="text-lg font-bold mb-4">Create Client</h2>
            <div className="space-y-3 mb-6">
              <input type="text" placeholder="Name" value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" />
              <input type="text" placeholder="Username" value={clientForm.username} onChange={(e) => setClientForm({ ...clientForm, username: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" />
              <input type="text" placeholder="Password" value={clientForm.password} onChange={(e) => setClientForm({ ...clientForm, password: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" />
              <input type="tel" placeholder="Phone" value={clientForm.phone} onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" />
              <input type="text" placeholder="Project Name" value={clientForm.projectName} onChange={(e) => setClientForm({ ...clientForm, projectName: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" />
              <button onClick={addClient} className="w-full bg-primary text-primary-foreground py-2 rounded-lg text-sm font-semibold">Add Client</button>
            </div>

            <h3 className="text-sm font-bold mb-3">All Clients ({clients.length})</h3>
            <div className="space-y-2">
              {clients.map((client) => (
                <div key={client.id} className="flex items-center justify-between bg-secondary/40 px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">{client.name[0]}</div>
                    <div>
                      <p className="text-xs font-semibold">{client.name}</p>
                      <p className="text-[10px] text-muted-foreground">@{client.username} • {client.phone} • {client.projectName}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteClient(client.id)} className="text-destructive hover:bg-destructive/10 p-1.5 rounded">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "reviews" && (
          <div className="premium-card rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Reviews ({reviews.length})</h2>
            <div className="space-y-2">
              {reviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between bg-secondary/40 px-3 py-2 rounded-lg">
                  <div>
                    <p className="text-xs font-semibold">{review.name}</p>
                    <div className="flex items-center gap-1 my-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground">{review.comment}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-1 rounded ${review.approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {review.approved ? "Approved" : "Pending"}
                    </span>
                    {!review.approved && (
                      <button onClick={() => approveReview(review.id)} className="text-green-600 hover:bg-green-100 p-1.5 rounded">✓</button>
                    )}
                    <button onClick={() => deleteReview(review.id)} className="text-destructive hover:bg-destructive/10 p-1.5 rounded">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "homepage" && (
          <div className="premium-card rounded-xl p-6 max-w-md">
            <h2 className="text-lg font-bold mb-4">Homepage Sections</h2>
            <div className="space-y-3">
              {Object.entries(homepage).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{key}</span>
                  <input type="checkbox" checked={value} onChange={() => toggleSection(key as keyof HomepageSection)} className="rounded" />
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {viewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setViewFile(null)}>
          <div className="relative max-h-[90vh] max-w-4xl w-full bg-background rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold">{viewFile.name}</h3>
              <button onClick={() => setViewFile(null)} className="rounded-lg p-2 hover:bg-secondary">×</button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
              {viewFile.fileType?.startsWith("image/") && <img src={viewFile.fileUrl} alt={viewFile.name} className="w-full" />}
              {viewFile.fileType === "application/pdf" && <iframe src={viewFile.fileUrl} className="w-full h-[70vh]" title={viewFile.name} />}
              {!viewFile.fileType?.startsWith("image/") && viewFile.fileType !== "application/pdf" && (
                <p className="text-center text-muted-foreground">Preview not available. Please download to view.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
