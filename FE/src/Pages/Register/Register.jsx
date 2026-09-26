import authServices from "../../Services/authServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setError("Invalid email");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service");
      return;
    }

    try {
      setLoading(true);

      const response = await authServices.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-lg font-extrabold tracking-tight transition hover:text-primary"
          >
            MECHA CORE
          </button>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-primary transition hover:underline"
          >
            BACK TO SHOP
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-8 md:px-8 md:py-12">

        <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-background shadow-mecha md:flex">

          {/* ================= LEFT VISUAL ================= */}
          <div className="hidden min-h-[680px] w-1/2 flex-col justify-between bg-slate-50 md:flex">

            {/* Intro */}
            <div className="p-8 lg:p-10">
              <span className="border-l-4 border-primary pl-3 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-primary">
                MECHA HOBBY STORE
              </span>

              <h1 className="mt-5 max-w-[400px] text-4xl font-extrabold leading-[0.95] tracking-tight text-foreground lg:text-5xl">
                BUILD YOUR
                <br />
                MECHA.
                <br />
                <span className="text-primary">
                  DEFINE YOUR
                  <br />
                  CORE.
                </span>
              </h1>

              <p className="mt-6 max-w-[360px] text-sm leading-6 text-foreground/60">
                Create your MECHA CORE account and keep your builds,
                collections, and orders in one place.
              </p>
            </div>

            {/* Visual */}
            <div className="flex flex-1 items-center justify-center px-8">
              <div className="group flex aspect-square w-full max-w-[350px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-background shadow-mecha transition hover:border-primary">

                <div className="text-center transition duration-300 group-hover:scale-105">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <i className="fa-solid fa-robot text-4xl"></i>
                  </div>

                  <p className="mt-4 font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-foreground/40">
                    MECHA CORE SYSTEM
                  </p>

                  <p className="mt-1 text-[10px] text-foreground/40">
                    READY FOR NEW BUILDER
                  </p>
                </div>

              </div>
            </div>

            {/* System status */}
            <div className="flex items-center justify-between border-t border-border px-8 py-5">
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-foreground/50">
                NEW BUILDER
              </span>

              <span className="font-mono text-[8px] font-bold text-primary">
                MCH // CORE
              </span>
            </div>
          </div>

          {/* ================= REGISTER FORM ================= */}
          <div className="w-full px-5 py-8 sm:px-8 md:w-1/2 md:px-10 md:py-10 lg:px-12">

            {/* Mobile brand */}
            <div className="mb-8 text-center md:hidden">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-mecha">
                <i className="fa-solid fa-robot text-xl"></i>
              </div>

              <div className="mt-4 text-lg font-extrabold tracking-tight">
                MECHA CORE
              </div>
            </div>

            {/* Title */}
            <div>
              <div className="border-l-4 border-primary pl-3 font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-primary">
                NEW BUILDER REGISTRATION
              </div>

              <h2 className="mt-4 text-3xl font-extrabold leading-none tracking-tight text-foreground md:text-4xl">
                CREATE ACCOUNT
              </h2>

              <p className="mt-3 max-w-md text-xs leading-5 text-foreground/60">
                Register your account to start building your MECHA CORE
                collection.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-red-600">
                <i className="fa-solid fa-circle-exclamation mt-0.5 text-xs"></i>

                <span className="text-xs leading-5">
                  {error}
                </span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-7">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-foreground"
                >
                  BUILDER NAME
                </label>

                <div className="relative mt-2">
                  <i className="fa-solid fa-user absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-foreground/30"></i>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-xs text-foreground outline-none transition placeholder:text-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-foreground"
                >
                  EMAIL
                </label>

                <div className="relative mt-2">
                  <i className="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-foreground/30"></i>

                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-xs text-foreground outline-none transition placeholder:text-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-foreground"
                >
                  PASSWORD
                </label>

                <div className="relative mt-2">
                  <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-foreground/30"></i>

                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-10 text-xs text-foreground outline-none transition placeholder:text-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Show password"
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-foreground/40 transition hover:text-primary"
                  >
                    <i
                      className={`fa-solid ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      } text-[11px]`}
                    ></i>
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mt-4">
                <label
                  htmlFor="confirmPassword"
                  className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-foreground"
                >
                  CONFIRM PASSWORD
                </label>

                <div className="relative mt-2">
                  <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-foreground/30"></i>

                  <input
                    name="confirmPassword"
                    id="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-10 text-xs text-foreground outline-none transition placeholder:text-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    aria-label="Show confirm password"
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-foreground/40 transition hover:text-primary"
                  >
                    <i
                      className={`fa-solid ${
                        showConfirmPassword
                          ? "fa-eye-slash"
                          : "fa-eye"
                      } text-[11px]`}
                    ></i>
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="mt-5 flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-[1px] h-3.5 w-3.5 shrink-0 accent-primary"
                />

                <span className="text-[9px] leading-relaxed text-foreground/55">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-bold text-primary hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-bold text-primary hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              {/* Register button */}
              <button
                disabled={loading}
                type="submit"
                className="btn-primary mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg text-xs tracking-widest transition hover:-translate-y-0.5 hover:shadow-mecha disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin text-[11px]"></i>
                    REGISTERING...
                  </>
                ) : (
                  <>
                    REGISTER
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <hr className="flex-1 border-border" />

              <span className="font-mono text-[7px] font-bold uppercase tracking-[0.12em] text-foreground/30">
                OR
              </span>

              <hr className="flex-1 border-border" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-border bg-background text-xs font-semibold text-foreground transition hover:border-primary hover:bg-primary/5"
            >
              <i className="fa-brands fa-google text-sm"></i>
              SIGN UP WITH GOOGLE
            </button>

            {/* Login */}
            <div className="mt-7 border-t border-border pt-5 text-center">
              <p className="text-[10px] text-foreground/50">
                Already have an account?
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="mt-2 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-primary transition hover:underline"
              >
                SIGN IN
              </button>
            </div>

            {/* Security */}
            <div className="mt-6 flex items-center justify-center gap-2 text-foreground/30">
              <i className="fa-solid fa-shield-halved text-[10px]"></i>

              <span className="font-mono text-[6px] uppercase tracking-[0.1em]">
                SECURE CORE REGISTRATION
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-border bg-slate-50 px-4 py-5">
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="font-mono text-[7px] font-bold uppercase tracking-[0.12em] text-foreground/50">
            MECHA CORE
          </span>

          <span className="font-mono text-[6px] uppercase tracking-[0.08em] text-foreground/30">
            © 2024 MECHA CORE INDUSTRIAL SYSTEMS
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Register;