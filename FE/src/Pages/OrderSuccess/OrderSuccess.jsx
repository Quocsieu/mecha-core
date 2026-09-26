import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-8">
      <div className="w-full max-w-xl rounded-xl border p-10 text-center">
        <div className="mb-5 text-5xl">
          ✓
        </div>

        <h1 className="text-3xl font-bold">
          Order Successful
        </h1>

        <p className="mt-3 text-gray-500">
          Thank you for your order!
        </p>

        {order && (
          <div className="mt-8 space-y-3 text-left">
            <p>
              <strong>Order ID:</strong>{" "}
              #{order.id}
            </p>

            <p>
              <strong>Total:</strong>{" "}
              {order.total.toLocaleString()}đ
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {order.paymentMethod}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {order.status}
            </p>
          </div>
        )}

        <button
          onClick={() =>
            navigate("/products")
          }
          className="mt-8 rounded bg-black px-6 py-3 text-white"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;