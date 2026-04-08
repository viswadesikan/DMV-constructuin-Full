import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: Role;
  redirectTo: string;
}

const ProtectedRoute = ({ children, allowedRole, redirectTo }: ProtectedRouteProps) => {
  const { user } = useAuth();
  
  if (!user || user.role !== allowedRole) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
