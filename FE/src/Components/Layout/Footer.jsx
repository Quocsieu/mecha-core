import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-10 border-t border-border bg-foreground px-4 py-8 text-primary-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Footer content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-extrabold tracking-widest">
              MECHA CORE
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-primary-foreground/60">
              Build your mecha. Define your core.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
              Shop
            </h4>

            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link
                  to="/products"
                  className="transition hover:text-primary"
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="transition hover:text-primary"
                >
                  Gundam Kits
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="transition hover:text-primary"
                >
                  Mecha Kits
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="transition hover:text-primary"
                >
                  Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
              Support
            </h4>

            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link
                  to="/cart"
                  className="transition hover:text-primary"
                >
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="transition hover:text-primary"
                >
                  Account
                </Link>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-primary"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
              Follow Us
            </h4>

            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary-foreground/20 transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary-foreground/20 transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary-foreground/20 transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile links */}
        <nav className="mt-8 border-t border-primary-foreground/15 pt-5 md:hidden">
          <ul className="flex flex-col">
            <li className="border-b border-primary-foreground/10">
              <Link
                to="/products"
                className="flex items-center justify-between py-3 text-sm font-medium"
              >
                Shop
                <i className="fa-solid fa-chevron-right text-xs text-primary-foreground/50"></i>
              </Link>
            </li>

            <li className="border-b border-primary-foreground/10">
              <a
                href="#"
                className="flex items-center justify-between py-3 text-sm font-medium"
              >
                Support
                <i className="fa-solid fa-chevron-right text-xs text-primary-foreground/50"></i>
              </a>
            </li>

            <li className="border-b border-primary-foreground/10">
              <Link
                to="/login"
                className="flex items-center justify-between py-3 text-sm font-medium"
              >
                Account
                <i className="fa-solid fa-chevron-right text-xs text-primary-foreground/50"></i>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Copyright */}
        <div className="mt-6 border-t border-primary-foreground/15 pt-5 text-center">
          <p className="text-xs text-primary-foreground/50">
            © 2024 MECHA CORE INDUSTRIAL SYSTEMS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;