function WySection() {
  return (
    <section className="py-6 lg:hidden">
      {/* Section title */}
      <div className="mb-3 border-b border-border pb-2">
        <p className="mb-1 text-xs font-bold tracking-widest text-primary">
          OUR PROMISE
        </p>

        <h3 className="text-xl font-extrabold tracking-tight text-foreground">
          WHY MECHA CORE
        </h3>
      </div>

      {/* Features */}
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
    </section>
  );
}

export default WySection;