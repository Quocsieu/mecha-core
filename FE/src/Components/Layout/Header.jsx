import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import logo from "../../assets/images/logo.png";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Sản Phẩm");

  const { user, isLoggedIn, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center transition hover:opacity-80"
          >
            <img
              src={logo}
              alt="MECHA CORE"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  to="/products"
                  onClick={() => setActiveNav("Sản Phẩm")}
                  className={`text-sm font-bold transition ${
                    activeNav === "Sản Phẩm"
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  Sản Phẩm
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  onClick={() => setActiveNav("Mecha Kits")}
                  className={`text-sm font-bold transition ${
                    activeNav === "Mecha Kits"
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  Mecha Kits
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  onClick={() => setActiveNav("Tools")}
                  className={`text-sm font-bold transition ${
                    activeNav === "Tools"
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  Tools
                </Link>
              </li>
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* User */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <i className="fa-solid fa-user"></i>
                  <span>{user.name}</span>
                </button>

                <button onClick={logout} className="text-sm font-semibold">
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <i className="fa-solid fa-user"></i>
                <span>Đăng nhập</span>
              </Link>
            )}
            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition hover:bg-primary/10 hover:text-primary"
            >
              <i className="fa-solid fa-cart-shopping text-lg"></i>

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>


            {/* Mobile menu */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition hover:bg-primary/10 hover:text-primary md:hidden"
            >
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      ></div>

      {/* Mobile Navigation */}
      <nav
        className={`fixed right-0 top-0 z-50 h-full w-72 border-l border-border bg-background px-5 py-5 shadow-mecha transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="text-sm font-extrabold tracking-widest text-primary">
            MECHA CORE
          </span>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-primary/10 hover:text-primary"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Mobile menu */}
        <ul className="mt-6 flex flex-col gap-2">
          <li>
            <Link
              to="/products"
              onClick={() => {
                setActiveNav("Sản Phẩm");
                setIsOpen(false);
              }}
              className={`block rounded-lg px-3 py-3 text-sm font-bold transition ${
                activeNav === "Sản Phẩm"
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-primary/5 hover:text-primary"
              }`}
            >
              Sản Phẩm
            </Link>
          </li>

          <li>
            <Link
              to="/products"
              onClick={() => {
                setActiveNav("Mecha Kits");
                setIsOpen(false);
              }}
              className={`block rounded-lg px-3 py-3 text-sm font-bold transition ${
                activeNav === "Mecha Kits"
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-primary/5 hover:text-primary"
              }`}
            >
              Mecha Kits
            </Link>
          </li>

          <li>
            <Link
              to="/products"
              onClick={() => {
                setActiveNav("Tools");
                setIsOpen(false);
              }}
              className={`block rounded-lg px-3 py-3 text-sm font-bold transition ${
                activeNav === "Tools"
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-primary/5 hover:text-primary"
              }`}
            >
              Tools
            </Link>
          </li>

          <li>
            <Link
              to="/login"
              onClick={() => {
                setActiveNav("Tài khoản");
                setIsOpen(false);
              }}
              className={`block rounded-lg px-3 py-3 text-sm font-bold transition ${
                activeNav === "Tài khoản"
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-primary/5 hover:text-primary"
              }`}
            >
              Tài khoản
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
