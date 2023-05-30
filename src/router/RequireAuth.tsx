import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

export default function RequireAuth() {
  const location = useLocation();
  const { currentUser } = useAppSelector((s) => s.authReducer);
  const uid = localStorage.getItem("breakout/user-id");

  return uid || currentUser !== undefined ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/signin" state={{ from: location }} replace />
  );
}
