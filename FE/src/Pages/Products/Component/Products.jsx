function Products({ status, img, masp, name, price, onClick, onAddToCart }) {
  return (
    <>
      <article
        onClick={onClick}
        className="
          overflow-hidden
          rounded-[6px]
          border
          border-[#dce2e8]
          bg-white
          shadow-mecha
        "
      >
        <div className="relative aspect-square overflow-hidden bg-[#e9eef2]">
          <span
            className="
              absolute
              left-[7px]
              top-[7px]
              z-10
              bg-[#16383d]
              px-[6px]
              py-[2px]
              font-mono
              text-[6px]
              font-bold
              leading-none
              tracking-[0.12em]
              text-white
            "
          >
            {status}
          </span>

          <img
            src={img}
            alt="Actuator Servo Joint V2"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="px-[9px] pb-[8px] pt-[7px]">
          <div className="font-mono text-[7px] uppercase tracking-[0.1em] text-[#6b7280]">
            {masp}
          </div>

          <div className="mt-[3px] min-h-[34px] text-[11px] font-medium leading-[1.35] text-[#20252b]">
            {name}
          </div>

          <div className="mt-[5px] flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold text-[#17458f]">
              {price}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              type="button"
              aria-label="Add actuator servo to cart"
              className="
                flex
                h-[25px]
                w-[25px]
                items-center
                justify-center
                rounded-full
                bg-[#e8f0fc]
                text-[#17458f]
              "
            >
              <i className="fa-solid fa-cart-plus text-[10px]" />
            </button>
          </div>
        </div>
      </article>
    </>
  );
}

export default Products;
