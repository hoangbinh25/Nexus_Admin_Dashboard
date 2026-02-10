import { useAuth } from "@/context/AuthContext"
import { ERouter } from "@/enums/route";
import { Navigate, Outlet } from "react-router-dom";

export const AuthRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to={`${ERouter.LOGIN}`} replace />;
    }

    return <Outlet />;
}