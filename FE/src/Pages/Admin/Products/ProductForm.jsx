import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import adminProductServices from "../../../Services/adminProductServices";
import uploadServices from "../../../Services/uploadServices";

function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Gundam Kits");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [sold, setSold] = useState("0");
  const [rating, setRating] = useState("0");
  const [reviewCount, setReviewCount] = useState("0");
  const [status, setStatus] = useState("active");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      const data = await adminProductServices.getProductById(id);

      const product = data.product || data;

      setName(product.name || "");
      setPrice(product.price || "");
      setCategory(product.category || "Gundam Kits");
      setImage(product.image || "");
      setDescription(product.description || "");
      setStock(product.stock || "");
      setSold(product.sold || "0");
      setRating(product.rating || "0");
      setReviewCount(product.reviewCount || "0");
      setStatus(product.status || "active");
      setFeatured(product.featured || false);
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Failed to load product");
    }
  };
  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = {
        name,
        price: Number(price),
        category,
        image,
        description,
        stock: Number(stock),
        sold: Number(sold),
        rating: Number(rating),
        reviewCount: Number(reviewCount),
        status,
        featured,
      };

      if (isEditMode) {
        await adminProductServices.updateProduct(id, data);
      } else {
        await adminProductServices.createProduct(data);
      }

      navigate("/admin/products");
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Save product failed");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImage = async () => {
    if (!imageFile) {
      setError("Please select an image");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const data = await uploadServices.uploadImage(imageFile);

      console.log("UPLOAD RESPONSE:", data);
      console.log("FILE:", data?.file);
      console.log("PATH:", data?.file?.path);

      const imageUrl = data.file?.path;

      if (!imageUrl) {
        throw new Error("Image URL not found");
      }

      setImage(imageUrl);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message || error.message || "Image upload failed",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        {isEditMode ? "Edit Product" : "Add Product"}
      </h1>

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Name */}
        <div>
          <label className="mb-2 block font-medium">Product Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="mb-2 block font-medium">Price</label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block font-medium">Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="Gundam Kits">Gundam Kits</option>

            <option value="Mecha Kits">Mecha Kits</option>

            <option value="Tools">Tools</option>

            <option value="Accessories">Accessories</option>
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="mb-2 block font-medium">Product Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
            }}
            className="w-full rounded-lg border p-3"
          />

          <button
            type="button"
            onClick={handleUploadImage}
            disabled={uploading || !imageFile}
            className="mt-3 rounded-lg border px-5 py-2"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>

          {image && (
            <img
              src={image}
              alt={name}
              className="mt-4 h-40 w-40 rounded-lg border object-cover"
            />
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block font-medium">Description</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-32 w-full rounded-lg border p-3"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="mb-2 block font-medium">Stock</label>

          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block font-medium">Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="active">Active</option>

            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />

          <label>Featured Product</label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-black px-6 py-3 text-white"
          >
            {loading
              ? "Saving..."
              : isEditMode
                ? "Update Product"
                : "Create Product"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="rounded-lg border px-6 py-3"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
