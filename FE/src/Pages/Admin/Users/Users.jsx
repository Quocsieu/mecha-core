import { useEffect, useState } from "react";

import adminServices from "../../../Services/adminServices";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await adminServices.getUsers();

        setUsers(data.users || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChangeRole = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    const confirmChange = window.confirm(`Change role to ${newRole}?`);

    if (!confirmChange) {
      return;
    }

    try {
      await adminServices.updateUserRole(id, newRole);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id
            ? {
                ...user,
                role: newRole,
              }
            : user,
        ),
      );
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Change role failed");
    }
  };

  const handleChangeStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "disabled" ? "active" : "disabled";

    const confirmChange = window.confirm(
      `Bạn có chắc muốn ${
        newStatus === "disabled" ? "disable" : "enable"
      } user này?`,
    );

    if (!confirmChange) return;

    try {
      await adminServices.updateUserStatus(id, newStatus);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id
            ? {
                ...user,
                status: newStatus,
              }
            : user,
        ),
      );
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Update status failed");
    }
  };

  if (loading) {
    return <div className="p-8">Loading users...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">User Management</h1>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-4 text-left">ID</th>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Role</th>

              <th className="p-4 text-left">Created At</th>

              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">{user.id}</td>

                <td className="p-4">{user.name}</td>

                <td className="p-4">{user.email}</td>

                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleChangeRole(user.id, e.target.value)}
                    className="rounded border px-3 py-2"
                  >
                    <option value="user">User</option>

                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="p-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <span
                    className={
                      user.status === "disabled"
                        ? "rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
                        : "rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                    }
                  >
                    {user.status || "active"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => handleChangeStatus(users.id, users.status)}
          className="rounded border px-3 py-1"
        >
          {users.status === "disabled" ? "Enable" : "Disable"}
        </button>
      </div>
    </div>
  );
}

export default Users;
