import { useLocation, Navigate, Outlet } from "react-router-dom";
const RequireAuth = ({ children, allowedRoles }: any) => {
  // const { role }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");


  const auth = {
    user: localStorage.getItem("careUserData"),
    roles: ["admin"],
  };
  const location = useLocation();
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) && auth?.user ? (
    children || <Outlet />) : auth?.user ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />) : (
    <Navigate to="/login" state={{ from: location }} replace />);
};
export default RequireAuth;