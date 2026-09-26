import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../../../Services/productServieces";
import FeaturedCard from "./FeaturedCard";

function FeaturedSection() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const data = await productService.getProducts();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    callAPI();
  }, []);

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <section className="py-8">
      {/* Section title */}
      <div className="mb-4 flex items-end justify-between border-b border-border pb-3">
        <div>
          <p className="mb-1 text-xs font-bold tracking-widest text-primary">
            COLLECTION
          </p>

          <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
            FEATURED BUILDS
          </h3>
        </div>

        <button
          onClick={() => navigate("/products")}
          className="hidden text-sm font-bold text-primary transition hover:underline sm:block"
        >
          VIEW ALL
        </button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => (
          <FeaturedCard
            key={product.id}
            category={product.category}
            image={product.image}
            code={product.code}
            name={product.name}
            price={product.price}
            status={product.status}
            onClick={() => handleClick(product.id)}
          />
        ))}
      </div>

      {/* Mobile view all */}
      <button
        onClick={() => navigate("/products")}
        className="mt-4 w-full rounded-lg border border-border py-3 text-sm font-bold text-primary transition hover:bg-slate-50 sm:hidden"
      >
        VIEW ALL BUILDS
      </button>
    </section>
  );
}

export default FeaturedSection;