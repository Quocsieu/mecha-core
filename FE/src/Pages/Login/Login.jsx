import { useState } from "react";
import { useNavigate } from "react-router-dom";

import authServices from "../../Services/authServices";
import { useAuth } from "../../Context/AuthContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const data = await authServices.login({
        email,
        password,
      });

      login(data.user, data.token);

      console.log("LOGIN RESPONSE:", data);

      if (data.user.role === "admin") {
        console.log("GO ADMIN");
        navigate("/admin");
      } else {
        console.log("GO HOME");
        navigate("/");
      }

      console.log("Login success:", data);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      {/* ================= MAIN ================= */}
      <main className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-8 md:px-8 md:py-12">
        <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-background shadow-mecha md:flex">
          {/* ================= LEFT VISUAL ================= */}
          <div className="hidden min-h-[620px] w-1/2 flex-col justify-between bg-slate-50 md:flex">
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
                Premium kits, precision tools, and tactical accessories for
                dedicated builders.
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
                    SYSTEM READY
                  </p>
                </div>
              </div>
            </div>

            {/* System status */}
            <div className="flex items-center justify-between border-t border-border px-8 py-5">
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-foreground/50">
                SYSTEM ACCESS
              </span>

              <span className="font-mono text-[8px] font-bold text-primary">
                MCH // CORE
              </span>
            </div>
          </div>

          {/* ================= LOGIN FORM ================= */}
          <div className="w-full px-5 py-8 sm:px-8 md:w-1/2 md:px-10 md:py-12 lg:px-12">
            {/* Mobile brand */}
            <div className="mb-9 text-center md:hidden">
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
                SYSTEM ACCESS
              </div>

              <h2 className="mt-4 text-3xl font-extrabold leading-none tracking-tight text-foreground md:text-4xl">
                SIGN IN
              </h2>

              <p className="mt-3 max-w-md text-xs leading-5 text-foreground/60">
                Access your account to manage orders, saved kits, and your MECHA
                CORE workspace.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-red-600">
                <i className="fa-solid fa-circle-exclamation mt-0.5 text-xs"></i>

                <span className="text-xs leading-5">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-foreground"
                >
                  EMAIL / USER ID
                </label>

                <div className="relative mt-2">
                  <i className="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-foreground/30"></i>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-xs text-foreground outline-none transition placeholder:text-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mt-5">
                <label
                  htmlFor="password"
                  className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-foreground"
                >
                  PASSWORD
                </label>

                <div className="relative mt-2">
                  <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-foreground/30"></i>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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

              {/* Remember + Forgot */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3.5 w-3.5 accent-primary"
                  />

                  <span className="text-[9px] text-foreground/60">
                    Remember me
                  </span>
                </label>

                <a
                  href="#"
                  className="text-[9px] font-bold text-primary transition hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-lg text-xs tracking-widest transition hover:-translate-y-0.5 hover:shadow-mecha disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin text-[11px]"></i>
                    SIGNING IN...
                  </>
                ) : (
                  <>
                    SIGN IN
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-3">
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
              CONTINUE WITH GOOGLE
            </button>

            {/* Register */}
            <div className="mt-8 border-t border-border pt-6 text-center">
              <p className="text-[10px] text-foreground/50">
                Don't have an account?
              </p>

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="mt-2 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-primary transition hover:underline"
              >
                CREATE ACCOUNT
              </button>
            </div>

            {/* Security */}
            <div className="mt-8 flex items-center justify-center gap-2 text-foreground/30">
              <i className="fa-solid fa-shield-halved text-[10px]"></i>

              <span className="font-mono text-[6px] uppercase tracking-[0.1em]">
                SECURE CORE ACCESS
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
