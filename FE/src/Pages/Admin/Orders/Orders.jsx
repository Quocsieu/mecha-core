import { useEffect, useState } from "react";

import adminServices from "../../../Services/adminServices";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await adminServices.getOrders();

        setOrders(data.orders || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await adminServices.updateOrderStatus(id, status);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status } : order,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeStatus = async (id, status) => {
    try {
      await adminServices.updateOrderStatus(id, status);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id
            ? {
                ...order,
                status,
              }
            : order,
        ),
      );
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Update order status failed");
    }
  };

  if (loading) {
    return <div className="p-8">Loading orders...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Order Management</h1>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-4 text-left">Order ID</th>

              <th className="p-4 text-left">Customer</th>

              <th className="p-4 text-left">Total</th>

              <th className="p-4 text-left">Payment</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Created At</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-4">#{order.id}</td>

                <td className="p-4">{order.customer.name}</td>

                <td className="p-4 font-medium">
                  {order.total.toLocaleString()}đ
                </td>

                <td className="p-4">{order.paymentMethod}</td>

                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="rounded border px-3 py-2"
                  >
                    <option value="pending">Pending</option>

                    <option value="confirmed">Confirmed</option>

                    <option value="shipping">Shipping</option>

                    <option value="completed">Completed</option>

                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleChangeStatus(order.id, e.target.value)
                    }
                    className="rounded border px-3 py-2"
                  >
                    <option value="pending">Pending</option>

                    <option value="confirmed">Confirmed</option>

                    <option value="shipping">Shipping</option>

                    <option value="completed">Delivered</option>

                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg rounded-xl bg-white p-6">
              <h2 className="mb-6 text-2xl font-bold">
                Order #{selectedOrder.id}
              </h2>

              <div className="space-y-3">
                <p>
                  <strong>Customer:</strong> {selectedOrder.customer.name}
                </p>

                <p>
                  <strong>Email:</strong> {selectedOrder.customer.email}
                </p>

                <p>
                  <strong>Phone:</strong> {selectedOrder.customer.phone}
                </p>

                <p>
                  <strong>Address:</strong> {selectedOrder.shippingAddress}
                </p>

                <p>
                  <strong>Total:</strong> {selectedOrder.total.toLocaleString()}
                  đ
                </p>

                <p>
                  <strong>Payment:</strong> {selectedOrder.paymentMethod}
                </p>

                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="mb-3 font-bold">Products</h3>

                {selectedOrder.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between border-b py-2"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span>
                      {(item.price * item.quantity).toLocaleString()}đ
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="mt-6 rounded-lg bg-black px-5 py-2 text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setSelectedOrder(orders)}
          className="rounded border px-3 py-1"
        >
          View
        </button>
      </div>
    </div>
  );
}

export default Orders;
