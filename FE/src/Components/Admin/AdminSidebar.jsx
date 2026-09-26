import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function AdminSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "fa-solid fa-chart-line",
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: "fa-solid fa-box",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "fa-solid fa-users",
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: "fa-solid fa-cart-shopping",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-border bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <h1 className="text-xl font-extrabold tracking-wider text-primary">
          MECHA CORE
        </h1>
      </div>

      {/* Admin info */}
      <div className="border-b border-border px-6 py-5">
        <p className="text-xs font-semibold uppercase text-gray-400">
          Administrator
        </p>

        <p className="mt-1 truncate font-bold text-foreground">
          {user?.name}
        </p>

        <p className="text-sm text-gray-500">
          {user?.email}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Management
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-primary/10 hover:text-primary"
                }`
              }
            >
              <i className={`${item.icon} w-5 text-center`}></i>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-border p-4">
        <button
          onClick={() => navigate("/")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-foreground transition hover:bg-gray-100"
        >
          <i className="fa-solid fa-store w-5 text-center"></i>
          <span>View Store</span>
        </button>

        <button
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
        >
          <i className="fa-solid fa-right-from-bracket w-5 text-center"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;