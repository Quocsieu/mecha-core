import tool_2 from "../../../assets/images/tool_2.jpg";
import { useNavigate } from "react-router-dom";

function BannerSection() {
  const navigate = useNavigate();

  return (
    <section className="my-8 overflow-hidden rounded-2xl border border-border shadow-mecha">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            className="h-full min-h-64 w-full object-cover"
            src={tool_2}
            alt="Level up your workspace"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center gap-6 p-6 md:w-1/2 md:p-8">
          {/* Promotion */}
          <div>
            <p className="mb-2 text-xs font-bold tracking-widest text-primary">
              BUILD BETTER
            </p>

            <h3 className="text-2xl font-extrabold tracking-tight text-foreground">
              LEVEL UP YOUR WORKSPACE
            </h3>

            <p className="mt-2 max-w-lg text-sm leading-6 text-foreground/70">
              Professional-grade tools and organizers for precision engineering.
            </p>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="btn-primary mt-5 h-11 rounded-lg px-6 transition hover:-translate-y-0.5 hover:shadow-mecha"
            >
              SHOP TOOLS
            </button>
          </div>

          {/* Why Mecha Core */}
          <div>
            <div className="mb-3 border-b border-border pb-2">
              <h3 className="text-sm font-extrabold tracking-widest text-foreground">
                WHY MECHA CORE
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex h-20 flex-col items-center justify-center rounded-lg border border-border bg-primary/5 transition hover:border-primary hover:bg-primary/10">
                <span className="text-lg text-primary">
                  <i className="fa-solid fa-certificate"></i>
                </span>
                <h4 className="mt-1 text-xs font-bold text-foreground">
                  Authentic Kits
                </h4>
              </div>

              <div className="flex h-20 flex-col items-center justify-center rounded-lg border border-border bg-primary/5 transition hover:border-primary hover:bg-primary/10">
                <span className="text-lg text-primary">
                  <i className="fa-solid fa-truck-fast"></i>
                </span>
                <h4 className="mt-1 text-xs font-bold text-foreground">
                  Fast Shipping
                </h4>
              </div>

              <div className="flex h-20 flex-col items-center justify-center rounded-lg border border-border bg-primary/5 transition hover:border-primary hover:bg-primary/10">
                <span className="text-lg text-primary">
                  <i className="fa-solid fa-headset"></i>
                </span>
                <h4 className="mt-1 text-xs font-bold text-foreground">
                  Expert Support
                </h4>
              </div>

              <div className="flex h-20 flex-col items-center justify-center rounded-lg border border-border bg-primary/5 transition hover:border-primary hover:bg-primary/10">
                <span className="text-lg text-primary">
                  <i className="fa-solid fa-medal"></i>
                </span>
                <h4 className="mt-1 text-xs font-bold text-foreground">
                  Premium Tools
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerSection;