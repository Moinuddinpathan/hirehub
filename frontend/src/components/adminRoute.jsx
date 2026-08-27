import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user, isLoggedIn } = useAuth();
  const location = useLocation();

  console.log("========== ADMIN ROUTE ==========");
  console.log("Current Path:", location.pathname);
  console.log("Admin User:", user);
  console.log("Is Logged In:", isLoggedIn);
  console.log("User Role:", user?.role);

  // Not logged in
  if (!isLoggedIn || !user) {
    console.log("❌ AdminRoute: User not logged in");
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (user.role !== "admin") {
    console.log("❌ AdminRoute: User is not admin");
    return <Navigate to="/" replace />;
  }

  // Admin
  console.log("✅ AdminRoute: Admin access granted");

  return children;
}

export default AdminRoute;