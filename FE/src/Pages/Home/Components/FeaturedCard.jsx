function FeaturedCard({
  category,
  image,
  code,
  name,
  price,
  status,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="w-full overflow-hidden rounded-xl shadow text-left"
    >
      {/* Image */}
      <div className="relative">
        {/* Category */}
        <span className="absolute top-2 left-2 z-10 rounded-2xl bg-foreground px-2 py-1 text-sm text-primary-foreground">
          {category}
        </span>

        <img
          className="aspect-square w-full object-cover"
          src={image}
          alt={name}
        />
      </div>

      {/* Information */}
      <div className="relative px-2 pt-2 pb-3">

        {/* Product code */}
        <p className="text-xs text-muted-foreground">
          {code}
        </p>

        {/* Product name */}
        <h4 className="line-clamp-1 text-base font-semibold">
          {name}
        </h4>

        {/* Category */}
        <p className="text-sm text-muted-foreground">
          {category}
        </p>

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {price}
          </span>

          {/* Cart */}
          <span className="rounded-full bg-primary/20 p-2">
            <i className="fa-solid fa-cart-plus"></i>
          </span>
        </div>

        {/* Status */}
        <p className="mt-1 text-xs">
          <span className="mr-1">●</span>
          {status}
        </p>
      </div>
    </button>
  );
}

export default FeaturedCard;