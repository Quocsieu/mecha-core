import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = 15000;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <i className="fa-solid fa-cart-shopping text-2xl"></i>
          </div>

          <h2 className="mt-5 text-xl font-extrabold tracking-tight">
            YOUR CART IS EMPTY
          </h2>

          <p className="mt-2 max-w-sm text-sm text-foreground/60">
            You haven't added any products to your cart yet.
          </p>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="btn-primary mt-5 rounded-lg px-6 py-3 text-xs font-bold transition hover:-translate-y-0.5 hover:shadow-mecha"
          >
            CONTINUE SHOPPING
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <main className="w-full px-4 py-6 md:px-8 md:py-10">
        {/* TITLE */}
        <section className="mx-auto w-full max-w-6xl">
          <div className="flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.13em] text-foreground/50">
            <span>HOME</span>
            <i className="fa-solid fa-chevron-right text-[6px] text-foreground/30"></i>
            <span className="text-primary">CART</span>
          </div>

          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-bold tracking-widest text-primary">
                YOUR SELECTION
              </p>

              <h1 className="text-3xl font-extrabold leading-none tracking-tight md:text-4xl">
                YOUR CART
              </h1>

              <p className="mt-2 text-xs text-foreground/60">
                Review your selected components before checkout.
              </p>
            </div>

            <span className="hidden whitespace-nowrap font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-foreground/50 sm:block">
              {cart.length} {cart.length === 1 ? "ITEM" : "ITEMS"}
            </span>
          </div>
        </section>

        {/* CART CONTENT */}
        <section className="mx-auto mt-7 grid w-full max-w-6xl gap-5 lg:grid-cols-[1fr_340px]">
          {/* PRODUCTS */}
          <div className="w-full min-w-0">
            <div className="overflow-hidden rounded-xl border border-border bg-background shadow-mecha">
              {/* Cart Header */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3 md:px-5">
                <div className="text-xs font-bold uppercase tracking-widest text-foreground">
                  SELECTED COMPONENTS
                </div>

                <div className="hidden font-mono text-[7px] uppercase tracking-[0.1em] text-foreground/40 sm:block">
                  CART // MECHA CORE
                </div>
              </div>

              {/* Cart Items */}
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="flex w-full min-w-0 gap-3 border-b border-border p-3 last:border-b-0 md:gap-5 md:p-5"
                >
                  {/* Product Image */}
                  <div className="h-[100px] w-[100px] shrink-0 overflow-hidden rounded-lg bg-slate-50 md:h-[140px] md:w-[140px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-primary">
                          MECHA KIT
                        </p>

                        <h2 className="mt-1 break-words text-sm font-bold leading-tight text-foreground md:text-lg">
                          {item.name}
                        </h2>

                        <div className="mt-2 inline-flex rounded-md bg-primary/10 px-2 py-1 font-mono text-[7px] font-bold uppercase tracking-widest text-primary">
                          IN STOCK
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        type="button"
                        aria-label="Remove product"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-foreground/40 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <i className="fa-solid fa-trash-can text-[11px]"></i>
                      </button>
                    </div>

                    {/* Price + Quantity */}
                    <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                      <div>
                        <span className="font-mono text-[7px] uppercase tracking-widest text-foreground/50">
                          UNIT PRICE
                        </span>

                        <div className="mt-1 font-mono text-sm font-bold text-primary md:text-base">
                          {item.price.toLocaleString("vi-VN")}đ
                        </div>

                        <div className="mt-2">
                          <span className="font-mono text-[7px] uppercase tracking-widest text-foreground/50">
                            SUBTOTAL
                          </span>

                          <p className="mt-1 font-mono text-sm font-bold text-foreground">
                            {(item.price * item.quantity).toLocaleString(
                              "vi-VN",
                            )}
                            đ
                          </p>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div>
                        <span className="mb-1 block font-mono text-[7px] uppercase tracking-widest text-foreground/50">
                          QUANTITY
                        </span>

                        <div className="flex h-9 items-center overflow-hidden rounded-lg border border-border">
                          <button
                            className="flex h-full w-9 items-center justify-center text-foreground transition hover:bg-slate-50"
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            -
                          </button>

                          <span className="flex h-full min-w-8 items-center justify-center border-x border-border text-sm font-bold">
                            {item.quantity}
                          </span>

                          <button
                            className="flex h-full w-9 items-center justify-center text-primary transition hover:bg-primary/5"
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {/* Security */}
              <div className="border-t border-border bg-slate-50 px-4 py-3 md:px-5">
                <div className="flex items-center gap-2 text-foreground/50">
                  <i className="fa-solid fa-shield-halved text-[10px] text-primary"></i>

                  <span className="font-mono text-[7px] uppercase tracking-widest">
                    Authentic product • Secure checkout
                  </span>
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary transition hover:gap-3"
            >
              <i className="fa-solid fa-arrow-left text-[9px]"></i>
              CONTINUE SHOPPING
            </button>
          </div>

          {/* ORDER SUMMARY */}
          <aside className="w-full min-w-0">
            <div className="rounded-xl border border-border bg-background p-4 shadow-mecha md:p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-widest">
                  ORDER SUMMARY
                </h2>

                <i className="fa-solid fa-receipt text-xs text-primary"></i>
              </div>

              <hr className="my-4 border-border" />

              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Subtotal</span>

                <span className="font-mono text-xs font-bold">
                  {subtotal.toLocaleString("vi-VN")}đ
                </span>
              </div>

              {/* Shipping */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-foreground/60">Shipping</span>

                <span className="font-mono text-xs font-bold">
                  {shipping.toLocaleString("vi-VN")}đ
                </span>
              </div>

              {/* Delivery */}
              <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-truck-fast text-[11px] text-primary"></i>

                  <span className="text-[9px] font-medium text-foreground/60">
                    Estimated delivery: 3–5 business days
                  </span>
                </div>
              </div>

              <hr className="my-4 border-border" />

              {/* Total */}
              <div className="flex items-end justify-between gap-3">
                <div>
                  <span className="font-mono text-[7px] uppercase tracking-widest text-foreground/50">
                    TOTAL
                  </span>

                  <p className="mt-1 text-[8px] text-foreground/40">
                    Tax calculated at checkout
                  </p>
                </div>

                <span className="font-mono text-xl font-extrabold text-primary">
                  {total.toLocaleString("vi-VN")}đ
                </span>
              </div>

              {/* Checkout */}
              <button
                onClick={() => navigate("/checkout")}
                type="button"
                className="btn-primary mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg text-xs tracking-wide transition hover:-translate-y-0.5 hover:shadow-mecha"
              >
                PROCEED TO CHECKOUT
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </button>

              {/* Payment */}
              <div className="mt-4 flex items-center justify-center gap-3 text-foreground/30">
                <i className="fa-brands fa-cc-visa text-lg"></i>
                <i className="fa-brands fa-cc-mastercard text-lg"></i>
                <i className="fa-brands fa-cc-paypal text-lg"></i>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-4 rounded-xl border border-border bg-slate-50 p-4">
              <div className="text-[9px] font-extrabold uppercase tracking-widest text-foreground">
                MECHA CORE SERVICE
              </div>

              <div className="mt-3 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-certificate w-4 text-center text-[11px] text-primary"></i>
                  <span className="text-[9px] text-foreground/60">
                    Authentic kits
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-truck-fast w-4 text-center text-[11px] text-primary"></i>
                  <span className="text-[9px] text-foreground/60">
                    Fast shipping
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-headset w-4 text-center text-[11px] text-primary"></i>
                  <span className="text-[9px] text-foreground/60">
                    Expert support
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Cart;
