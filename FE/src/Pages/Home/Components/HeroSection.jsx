import herodt from "../../../assets/images/herodt.jpg";
import hero from "../../../assets/images/hero.png";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2 md:items-center md:gap-10 lg:py-10">
      {/* Content */}
      <div className="flex flex-col gap-5">
        {/* Small heading */}
        <span className="w-fit border-l-4 border-primary pl-3 text-sm font-bold tracking-widest text-primary">
          MECHA HOBBY STORE
        </span>

        {/* Main heading */}
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          BUILD YOUR MECHA.
          <br />
          <span className="text-primary">DEFINE YOUR CORE.</span>
        </h1>

        {/* Description */}
        <p className="max-w-xl text-sm leading-6 text-foreground/70 sm:text-base">
          Premium kits, precision tools, and tactical accessories for
          dedicated builders.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/products"
            className="btn-primary flex h-12 items-center justify-center rounded-xl px-7 transition hover:-translate-y-0.5 hover:shadow-mecha"
          >
            SHOP NOW
          </Link>

          <Link
            to="/products"
            className="btn-secondary flex h-12 items-center justify-center rounded-xl border border-border px-7 transition hover:bg-slate-50"
          >
            EXPLORE COLLECTION
          </Link>
        </div>
      </div>

      {/* Mobile image */}
      <div className="h-64 overflow-hidden rounded-2xl border border-border md:hidden">
        <img
          className="h-full w-full object-cover"
          src={herodt}
          alt="Featured Mecha Model"
        />
      </div>

      {/* Desktop image */}
      <div className="hidden h-full min-h-[420px] overflow-hidden rounded-2xl border border-border md:block">
        <img
          className="h-full w-full object-cover"
          src={hero}
          alt="Featured Mecha Model"
        />
      </div>
    </section>
  );
}

export default HeroSection