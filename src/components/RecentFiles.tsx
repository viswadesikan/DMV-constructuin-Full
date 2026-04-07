import { Download, Clock } from "lucide-react";
import type { FileItem } from "@/hooks/useFiles";

interface RecentFilesProps {
  files: FileItem[];
}

const RecentFiles = ({ files }: RecentFilesProps) => {
  const doubled = [...files, ...files];

  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-center gap-3">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Recent Files
          </h2>
        </div>
        <div className="premium-card mx-auto max-w-2xl overflow-hidden rounded-xl" style={{ height: "340px" }}>
          <div className="animate-scroll-up">
            {doubled.map((file, i) => (
              <div
                key={`${file.id}-${i}`}
                className="flex items-center justify-between border-b border-border/50 px-6 py-3.5 transition-all hover:bg-primary/5"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    {(i % files.length) + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.uploadDate}</p>
                  </div>
                </div>
                <button className="rounded-lg bg-primary/10 p-2.5 text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentFiles;
