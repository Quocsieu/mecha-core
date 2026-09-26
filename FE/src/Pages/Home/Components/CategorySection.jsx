import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import productService from "../../../Services/productServieces";

function CategoriesSection() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const callAPI = async () => {
      try {
        const data = await productService.getCategories();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    callAPI();
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <section className="py-8">
      {/* Section heading */}
      <div className="mb-4 flex items-end justify-between border-b border-border pb-3">
        <div>
          <p className="mb-1 text-xs font-bold tracking-widest text-primary">
            DISCOVER
          </p>

          <h2 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
            EXPLORE CATEGORIES
          </h2>
        </div>

        <button
          onClick={() => navigate("/products")}
          className="hidden text-sm font-bold text-primary transition hover:underline sm:block"
        >
          VIEW ALL
        </button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category}
            title={category}
            onClick={() => navigate("/products")}
          />
        ))}
      </div>

      {/* Mobile View All */}
      <button
        onClick={() => navigate("/products")}
        className="mt-4 w-full rounded-lg border border-border py-3 text-sm font-bold text-primary transition hover:bg-slate-50 sm:hidden"
      >
        VIEW ALL CATEGORIES
      </button>
    </section>
  );
}

export default CategoriesSection;