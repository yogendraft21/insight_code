import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import {
  setUser,
  setLoading,
  clearUser,
  setError,
} from "@/lib/redux/slices/userSlice";
import api from "@/lib/api";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (isAuthenticated && user) {
        setAuthChecking(false);
        return;
      }

      const token = localStorage.getItem("authToken");

      if (!token) {
        dispatch(clearUser());
        setAuthChecking(false);
        return;
      }
      dispatch(setLoading(true));

      try {
        const userData = await api.auth.getCurrentUser();

        dispatch(setUser(userData?.user));
        dispatch(setError(null));
      } catch (error: any) {
        try {
          const refreshToken = localStorage.getItem("refreshToken");

          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const tokens = await api.auth.refreshToken(refreshToken);

          localStorage.setItem("authToken", tokens.accessToken);
          localStorage.setItem("refreshToken", tokens.refreshToken);

          const userData = await api.auth.getCurrentUser();

          dispatch(setUser(userData?.user));

          dispatch(setError(null));
        } catch (refreshError: any) {
          console.error("Token refresh failed:", refreshError);

          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");

          dispatch(clearUser());

          dispatch(setError(refreshError.message || "Authentication failed"));

          toast.error("Your session has expired. Please log in again.");
        }
      } finally {
        dispatch(setLoading(false));
        setAuthChecking(false);
      }
    };

    verifyAuth();
  }, [dispatch, isAuthenticated, user]);

  if (isLoading || authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
