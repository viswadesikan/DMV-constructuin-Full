import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { storage } from "@/lib/storage";
import { useRateLimit } from "@/hooks/useRateLimit";
import dmvLogo from "@/assets/dmv-logo-new.jpeg";

const ClientLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isAllowed, remainingSeconds } = useRateLimit(5, 60_000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAllowed()) { setError(`Too many attempts. Wait ${remainingSeconds()}s.`); return; }
    setLoading(true);
    setError("");
    setTimeout(async () => {
      try {
        const res = await storage.loginClient({ username, password });
        if (res.success && res.client) {
          login({ role: "client", username: res.client.username, clientId: res.client.id, name: res.client.name, projectName: res.client.projectName }, true);
          navigate("/client/portal");
        } else {
          setError(res.message || "Invalid credentials.");
        }
      } catch (err) {
        setError("Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-sm">
        <div className="premium-card rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="absolute -inset-2 rounded-full bg-primary/20 blur-lg" />
              <img src={dmvLogo} alt="DMV Construction" className="relative h-16 w-16 rounded-full object-cover border-2 border-primary/30" />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <User className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-black tracking-wide text-foreground">Client Portal</h1>
            </div>
            <p className="text-xs text-muted-foreground">DMV Construction — Client Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={50}
                required
                autoComplete="username"
                className="w-full rounded-xl border border-border bg-secondary/30 pl-10 pr-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={100}
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-border bg-secondary/30 pl-10 pr-10 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && <p className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground btn-magnetic disabled:opacity-60">
              {loading ? "Verifying..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground/60">
            <Link to="/" className="hover:text-primary transition-colors">← Back to Website</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
