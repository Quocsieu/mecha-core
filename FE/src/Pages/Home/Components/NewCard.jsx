function NewCard({ name, price, category, image }) {
  return (
    <article className="group w-full overflow-hidden rounded-xl border border-border bg-background text-left shadow-mecha transition duration-200 hover:-translate-y-1 hover:border-primary">
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-50">
        <span className="absolute left-2 top-2 z-10 rounded-full bg-foreground px-2.5 py-1 text-[11px] font-bold text-primary-foreground">
          {category}
        </span>

        <img
          className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
          src={image}
          alt={name}
        />
      </div>

      {/* Content */}
      <div className="relative p-3">
        <p className="text-[11px] font-medium tracking-wide text-foreground/50">
          MECHA
        </p>

        <h4 className="mt-1 line-clamp-1 text-sm font-bold text-foreground">
          {name}
        </h4>

        <p className="mt-0.5 line-clamp-1 text-xs text-foreground/60">
          {category}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-extrabold text-primary">
            {Number(price).toLocaleString("vi-VN")}đ
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
            <i className="fa-solid fa-cart-plus text-sm"></i>
          </span>
        </div>
      </div>
    </article>
  );
}

export default NewCard;