import { useEffect, useState } from "react";
import adminProductServices from "../../../Services/adminProductServices";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await adminProductServices.getProducts();

        console.log("Products:", data);

        setProducts(data.products || data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa sản phẩm này không?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await adminProductServices.deleteProduct(id);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id),
      );
    } catch (error) {
      console.error(error);
      alert("Xóa sản phẩm thất bại");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase()),
  );

  if (loading) {
    return <div className="p-8">Loading products...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Product Management</h1>

      <button
        onClick={() => navigate("/admin/products/add")}
        className="rounded-lg bg-black px-5 py-3 text-white"
      >
        + Add Product
      </button>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search product..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full max-w-md rounded-lg border px-4 py-3 outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-4">{product.id}</td>

                <td className="p-4">{product.name}</td>

                <td className="p-4">{product.category}</td>

                <td className="p-4">{product.price.toLocaleString()}đ</td>

                <td className="p-4">{product.stock}</td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      navigate(`/admin/products/edit/${product.id}`)
                    }
                    className="mr-2 rounded border px-3 py-1"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="rounded bg-red-500 px-3 py-1 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
