import { Navigate, useLocation } from "react-router-dom";

function isDemoAuthed() {
  return localStorage.getItem("demoAuth") === "true";
}

export default function DemoAuthGuard({ children }) {
  const location = useLocation();

  // Avoid redirect loops if the user is already on the login page.
  if (location.pathname === "/demo-login" || location.pathname === "/app/auth/login") {
    return <>{children}</>;
  }

  const role = localStorage.getItem("demoRole");

  // Route-level permission model (demo)
  // Mapping between architecture modules and UI routes.
  const rolePermissions = {
    Admin: ["*"],
    "Field Agent": ["mapping", "propertyCapture", "fieldOps"],
    Supervisor: ["propertyCapture", "fieldOps", "reports"],
    Analyst: ["reports", "analytics"]
  };

  const perms = rolePermissions[role] || [];

  const canAccess = (required) => {
    if (!required) return true;
    return perms.includes("*") || perms.includes(required);
  };


  // Permission-by-route
  const path = location.pathname;
  const routeRequiredPermission = (() => {
    if (path.startsWith("/app/admin")) return "admin";
    if (path.startsWith("/app/mapping")) return "mapping";
    if (path.startsWith("/app/capture")) return "propertyCapture";
    if (path.startsWith("/app/agents") || path.startsWith("/app/sync")) return "fieldOps";
    if (path.startsWith("/app/reports")) return "reports";
    if (path.startsWith("/app/analytics")) return "analytics";
    // owners/tenants/dashboard are readable by all authenticated roles in this demo
    return null;
  })();

  if (isDemoAuthed()) {
    if (routeRequiredPermission === "admin") {
      if (role !== "Admin") return <Navigate replace to="/app/dashboard" />;
      return <>{children}</>;
    }

    if (!canAccess(routeRequiredPermission)) {
      return <Navigate replace to="/app/dashboard" />;
    }

    return <>{children}</>;
  }

  return (
    <Navigate replace to="/app/auth/login" state={{ from: location.pathname }} />
  );
}



