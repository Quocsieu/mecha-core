import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import productService from "../../Services/productServieces";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const data = await productService.getProductById(id);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    callAPI();
  }, [id]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
        <div>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <i className="fa-solid fa-box-open text-xl"></i>
          </div>

          <h2 className="mt-4 text-lg font-extrabold tracking-tight">
            PRODUCT NOT FOUND
          </h2>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="btn-primary mt-4 rounded-lg px-5 py-2.5 text-xs transition hover:-translate-y-0.5 hover:shadow-mecha"
          >
            BACK TO PRODUCTS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <main className="w-full px-4 py-6 md:px-8 md:py-10">
        <section className="mx-auto w-full max-w-7xl">

          {/* ================= BREADCRUMB ================= */}
          <div className="flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.13em] text-foreground/50">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="transition hover:text-primary"
            >
              HOME
            </button>

            <i className="fa-solid fa-chevron-right text-[6px] text-foreground/30"></i>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="transition hover:text-primary"
            >
              PRODUCTS
            </button>

            <i className="fa-solid fa-chevron-right text-[6px] text-foreground/30"></i>

            <span className="max-w-[180px] truncate text-primary">
              {product.name}
            </span>
          </div>

          {/* ================= PRODUCT DETAIL ================= */}
          <section className="mt-5">
            <div className="grid gap-6 md:grid-cols-2 md:gap-10 lg:gap-14">

              {/* ================= PRODUCT IMAGE ================= */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-slate-50 shadow-mecha">
                <span className="absolute left-3 top-3 z-10 rounded-full bg-foreground px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-widest text-primary-foreground">
                  {product.status}
                </span>

                <img
                  src={product.image}
                  alt={product.alt}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* ================= PRODUCT INFO ================= */}
              <div className="flex flex-col">

                {/* Product code */}
                <div className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-foreground/50">
                  {product.code}
                </div>

                {/* Product name */}
                <h1 className="mt-2 whitespace-pre-line text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex gap-1 text-primary">
                    <i className="fa-solid fa-star text-[10px]"></i>
                    <i className="fa-solid fa-star text-[10px]"></i>
                    <i className="fa-solid fa-star text-[10px]"></i>
                    <i className="fa-solid fa-star text-[10px]"></i>
                    <i className="fa-solid fa-star text-[10px]"></i>
                  </div>

                  <span className="font-mono text-[9px] text-foreground/50">
                    {product.rating}
                  </span>
                </div>

                {/* Price */}
                <div className="mt-5 border-y border-border py-4">
                  <span className="font-mono text-2xl font-extrabold text-primary md:text-3xl">
                    {product.price}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-5 max-w-2xl text-sm leading-6 text-foreground/65">
                  {product.description}
                </p>

                {/* Quantity */}
                <div className="mt-6">
                  <div className="mb-2 font-mono text-[8px] font-bold uppercase tracking-widest text-foreground">
                    QUANTITY
                  </div>

                  <div className="flex h-10 w-32 items-center overflow-hidden rounded-lg border border-border bg-background">
                    <button
                      type="button"
                      className="flex h-full w-10 items-center justify-center text-primary transition hover:bg-primary/5"
                    >
                      <i className="fa-solid fa-minus text-[9px]"></i>
                    </button>

                    <span className="flex h-full flex-1 items-center justify-center border-x border-border font-mono text-xs font-bold">
                      {product.stock}
                    </span>

                    <button
                      type="button"
                      className="flex h-full w-10 items-center justify-center text-primary transition hover:bg-primary/5"
                    >
                      <i className="fa-solid fa-plus text-[9px]"></i>
                    </button>
                  </div>
                </div>

                {/* Add to cart */}
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    className="btn-primary flex h-12 flex-1 items-center justify-center gap-2 rounded-lg px-5 text-xs uppercase tracking-widest transition hover:-translate-y-0.5 hover:shadow-mecha"
                  >
                    <i className="fa-solid fa-cart-plus text-sm"></i>
                    ADD TO CART
                  </button>
                </div>

                {/* Small service info */}
                <div className="mt-5 grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-slate-50 px-2 py-3 text-center">
                    <i className="fa-solid fa-certificate text-sm text-primary"></i>
                    <span className="mt-1 text-[8px] font-bold text-foreground/60">
                      AUTHENTIC
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-slate-50 px-2 py-3 text-center">
                    <i className="fa-solid fa-truck-fast text-sm text-primary"></i>
                    <span className="mt-1 text-[8px] font-bold text-foreground/60">
                      FAST SHIP
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-slate-50 px-2 py-3 text-center">
                    <i className="fa-solid fa-headset text-sm text-primary"></i>
                    <span className="mt-1 text-[8px] font-bold text-foreground/60">
                      SUPPORT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= PRODUCT SPECIFICATIONS ================= */}
          <section className="mt-10">
            <div className="border-t border-border pt-5">

              <div className="mb-4">
                <p className="mb-1 text-xs font-bold tracking-widest text-primary">
                  TECHNICAL DATA
                </p>

                <h2 className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                  PRODUCT SPECIFICATIONS
                </h2>
              </div>

              <div className="overflow-hidden rounded-xl border border-border bg-background shadow-mecha">

                {/* Product Code */}
                <div className="grid grid-cols-1 border-b border-border sm:grid-cols-2">
                  <div className="bg-slate-50 px-4 py-3 font-mono text-[8px] font-bold uppercase tracking-widest text-foreground/50">
                    PRODUCT CODE
                  </div>

                  <div className="px-4 py-3 font-mono text-xs text-foreground">
                    {product.code}
                  </div>
                </div>

                {/* Series */}
                <div className="grid grid-cols-1 border-b border-border sm:grid-cols-2">
                  <div className="bg-slate-50 px-4 py-3 font-mono text-[8px] font-bold uppercase tracking-widest text-foreground/50">
                    SERIES
                  </div>

                  <div className="px-4 py-3 text-xs text-foreground">
                    {product.series}
                  </div>
                </div>

                {/* Material */}
                <div className="grid grid-cols-1 border-b border-border sm:grid-cols-2">
                  <div className="bg-slate-50 px-4 py-3 font-mono text-[8px] font-bold uppercase tracking-widest text-foreground/50">
                    MATERIAL
                  </div>

                  <div className="px-4 py-3 text-xs text-foreground">
                    {product.material}
                  </div>
                </div>

                {/* Compatibility */}
                <div className="grid grid-cols-1 border-b border-border sm:grid-cols-2">
                  <div className="bg-slate-50 px-4 py-3 font-mono text-[8px] font-bold uppercase tracking-widest text-foreground/50">
                    COMPATIBILITY
                  </div>

                  <div className="px-4 py-3 text-xs text-foreground">
                    {product.compatibility}
                  </div>
                </div>

                {/* Weight */}
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="bg-slate-50 px-4 py-3 font-mono text-[8px] font-bold uppercase tracking-widest text-foreground/50">
                    WEIGHT
                  </div>

                  <div className="px-4 py-3 text-xs text-foreground">
                    {product.weight}
                  </div>
                </div>

              </div>
            </div>
          </section>

        </section>
      </main>
    </div>
  );
}

export default ProductDetail;