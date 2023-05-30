import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

export default function RedirectAuth() {
  const location = useLocation();
  const { currentUser } = useAppSelector((s) => s.authReducer);
  const uid = localStorage.getItem("breakout/user-id");

  return uid || currentUser !== undefined ? (
    <Navigate to="/home" state={{ from: location }} replace={true} />
  ) : (
    <Outlet />
  );
}
