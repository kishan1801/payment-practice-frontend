import { Navigate } from "react-router-dom";

// Decodes JWT token to get role without any extra package
const getRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    // JWT is 3 parts separated by "." — middle part is the payload
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return null;
  }
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = getRole();

  if (!token) return <Navigate to="/login" />;
  if (role !== "admin") return <Navigate to="/products" />;

  return children;
};

export default AdminRoute;
