import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Admin content */}
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;