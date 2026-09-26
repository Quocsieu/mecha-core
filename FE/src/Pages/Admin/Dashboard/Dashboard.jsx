import { useEffect, useState } from "react";

import adminServices from "../../../Services/adminServices";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result =
          await adminServices.getDashboard();

        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-10">
        Loading dashboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-10">
        Failed to load dashboard
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-xl border p-6">
          <p className="text-gray-500">
            Products
          </p>

          <p className="mt-2 text-3xl font-bold">
            {data.products}
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <p className="text-gray-500">
            Users
          </p>

          <p className="mt-2 text-3xl font-bold">
            {data.users}
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <p className="text-gray-500">
            Orders
          </p>

          <p className="mt-2 text-3xl font-bold">
            {data.orders}
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <p className="text-gray-500">
            Revenue
          </p>

          <p className="mt-2 text-3xl font-bold">
            {data.revenue.toLocaleString()}đ
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;