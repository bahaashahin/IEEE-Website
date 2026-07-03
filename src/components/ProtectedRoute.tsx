import { Navigate } from "react-router-dom";
import { useSession } from "../lib/auth-client";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: sessionData, error, isPending } = useSession();

  if (error) {
    return <Navigate to="/login" replace />;
  }

  if (isPending) {
    return null;
  }

  if (!sessionData?.session) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
