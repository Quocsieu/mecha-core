import Product from "../Products/Component/Products";
import productServieces from "../../Services/productServieces";
import { useCart } from "../../Context/CartContext";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyWord] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;
  // FILTER LỌC SẢN PHẨM
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  const catgories = [...new Set(products.map((p) => p.category))];

  // LỌC SẢN PHẨM THEO SORT
  const sortProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;

      case "price-desc":
        return b.price - a.price;

      case "name-asc":
        return a.name.localeCompare(b.name);

      case "name-desc":
        return b.name.localeCompare(a.name);

      default:
        return 0;
    }
  });
  // PHÂN TRANG
  const totalPages = Math.ceil(sortProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = sortProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  useEffect(() => {
    const callAPI = async () => {
      try {
        const data = await productServieces.getProducts();
        console.log(data);

        setProducts(data);
      } catch (error) {
        console.log(error);

        setError(true);
      } finally {
        setLoading(false);
      }
    };
    callAPI();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const value = keyword.trim();
    if (!value) {
      const data = await productServieces.getProducts();
      setProducts(data);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const data = await productServieces.searchProducts(value);
      setProducts(data);
    } catch (error) {
      console.log(error);
      setError(true);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const { addToCart } = useCart();


  return (
    <>
      <div className="min-h-screen bg-[#f8fafc] text-[#111827]">
        {/* ================= MAIN ================= */}
        <main>
          {/* Breadcrumb + title */}
          <section className="px-[12px] pt-[16px]">
            <div className="flex items-center gap-[7px] font-mono text-[7px] font-bold uppercase tracking-[0.13em] text-[#6b7280]">
              <span>HOME</span>

              <i className="fa-solid fa-chevron-right text-[5px] text-[#9ca3af]" />

              <span className="text-[#17458f]">PRODUCTS</span>
            </div>

            <h1 className="mt-[3px] text-[24px] font-black leading-[1] tracking-[-0.035em] text-[#111111]">
              ALL PRODUCTS
            </h1>
          </section>

          {/* ================= SEARCH ================= */}
          <section className="px-[12px]">
            <section className="px-[12px]">
              <form onSubmit={handleSearch} className="relative mt-[16px]">
                <i
                  className="
                    fa-solid
                    fa-magnifying-glass
                    absolute
                    left-[11px]
                    top-1/2
                    -translate-y-1/2
                    text-[13px]
                    text-[#6b7280]
                  "
                />

                <input
                  type="text"
                  placeholder="Search schematic ID, component..."
                  value={keyword}
                  onChange={(e) => setKeyWord(e.target.value)}
                  className="
        h-[37px]
        w-full
        rounded-[6px]
        border
        border-[#d5dbe2]
        bg-white
        pl-[32px]
        pr-[12px]
        text-[10px]
        text-[#374151]
        outline-none
        placeholder:text-[#4b5563]
        focus:border-[#17458f]
        focus:ring-1
        focus:ring-[#17458f]/10
      "
                />
              </form>
            </section>
          </section>

          {/* ================= FILTER / SORT ================= */}
          <section className="px-[12px]">
            <div className="mt-[17px] flex items-center gap-[7px]">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-[33px] rounded-[4px] border border-[#cbd5e1] bg-white px-[13px] text-[9px] font-bold tracking-[0.03em] text-[#17458f]"
              >
                <option value="All">ALL</option>
                {catgories.map((cate) => (
                  <option value={cate}>{cate}</option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="default">DEFAULT</option>
                <option value="price-asc">GIÁ: THẤP → CAO</option>
                <option value="price-desc">GIÁ: CAO → THẤP</option>
                <option value="name-asc">A → Z</option>
                <option value="name-desc">Z → A</option>
              </select>

              <span
                className="
                  ml-auto
                  whitespace-nowrap
                  font-mono
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-[#4b5563]
                "
              >
                {sortProducts.length} PRODUCTS
              </span>
            </div>
          </section>

          {/* ================= PRODUCT GRID ================= */}
          <section className="px-[12px]">
            <div className="mt-[17px] grid grid-cols-2 gap-[9px] md:grid-cols-4 lg:grid-cols-6">
              {/* ================= PRODUCT 01 ================= */}
              {sortProducts.length === 0 ? (
                <div>NO PRODUCTS FOUND</div>
              ) : (
                currentProducts.map((product) => (
                  <Product
                    key={product.id}
                    status={product.status}
                    img={product.image}
                    masp={product.code}
                    name={product.name}
                    price={product.price}
                    onClick={() => navigate(`/products/${product.id}`)}
                    onAddToCart={() => addToCart(product)}
                  />
                ))
              )}
            </div>
          </section>

          {/* ================= PAGINATION ================= */}
          <section
            className="
              mt-[17px]
              border-t
              border-[#e2e8f0]
              px-[12px]
              py-[17px]
            "
          >
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                PREV
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                NEXT
              </button>
            </div>
          </section>
        </main>
      </div>
      {loading && <h2>Đang loading, vui lòng chờ</h2>}
      {error && <h2>Trang lỗi, vui lòng thử lại</h2>}
    </>
  );
}

export default Products;
