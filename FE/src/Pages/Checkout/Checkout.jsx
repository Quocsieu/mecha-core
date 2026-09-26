import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import orderServices from "../../Services/orderServices";
import { CartContext } from "../../Context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    clearCart,
  } = useContext(CartContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !name ||
      !email ||
      !phone ||
      !address
    ) {
      setError(
        "Please fill in all information"
      );
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        customer: {
          name,
          email,
          phone,
        },

        shippingAddress: address,

        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),

        total,

        paymentMethod: "COD",
      };

      const data =
        await orderServices.createOrder(
          orderData
        );

      console.log(
        "Order created:",
        data
      );

      clearCart();

      navigate("/order-success", {
        state: {
          order: data.order,
        },
      });
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to create order"
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">
          Your cart is empty
        </h1>

        <button
          onClick={() =>
            navigate("/products")
          }
          className="mt-5 rounded bg-black px-6 py-3 text-white"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Checkout
      </h1>

      {error && (
        <div className="mb-5 rounded bg-red-100 p-4 text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 md:grid-cols-2"
      >
        {/* Customer Information */}
        <div className="rounded-lg border p-6">
          <h2 className="mb-5 text-xl font-semibold">
            Customer Information
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded border p-3"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded border p-3"
            />

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full rounded border p-3"
            />

            <textarea
              placeholder="Shipping address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              className="w-full rounded border p-3"
              rows="4"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-lg border p-6">
          <h2 className="mb-5 text-xl font-semibold">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between"
              >
                <div>
                  <p className="font-medium">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    x{item.quantity}
                  </p>
                </div>

                <p>
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString()}
                  đ
                </p>
              </div>
            ))}
          </div>

          <div className="my-6 border-t" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>

            <span>
              {total.toLocaleString()}đ
            </span>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 font-semibold">
              Payment Method
            </h3>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked
                readOnly
              />

              Cash on Delivery (COD)
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded bg-black py-3 text-white disabled:opacity-50"
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;