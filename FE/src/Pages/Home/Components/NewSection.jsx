import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../../../Services/productServieces";
import NewCard from "./NewCard";

function NewSection() {
  const [newProduct, setNewProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const callAPI = async () => {
      try {
        const data = await productService.getProductNew();
        console.log(data);
        setNewProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    callAPI();
  }, []);

  return (
    <section className="py-8">
      {/* Section title */}
      <div className="mb-4 flex items-end justify-between border-b border-border pb-3">
        <div>
          <p className="mb-1 text-xs font-bold tracking-widest text-primary">
            JUST ARRIVED
          </p>

          <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
            NEW ARRIVALS
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
        {newProduct.map((p) => (
          <NewCard
            key={p.id}
            name={p.name}
            image={p.image}
            price={p.price}
            category={p.category}
          />
        ))}
      </div>

      {/* Mobile view all */}
      <button
        onClick={() => navigate("/products")}
        className="mt-4 w-full rounded-lg border border-border py-3 text-sm font-bold text-primary transition hover:bg-slate-50 sm:hidden"
      >
        VIEW ALL PRODUCTS
      </button>
    </section>
  );
}

export default NewSection;