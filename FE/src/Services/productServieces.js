import apiClient from "./apiClient";

const productService = {
  getProducts: async () => {
    const response = await apiClient.get("/products");
    return response.data;
  },
  
  getCategories: async () => {
    const response = await apiClient.get("/products");
    return response.data;
  },

  getProductById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  getProductNew: async () => {
    const response = await apiClient.get('/products/new');
    return response.data;
  },

  searchProducts: async (name) => {
    const response = await apiClient.get("/products/search", {
      params: { name },
    });
    return response.data
  },

  createProduct: async (product) => {
   const response = await apiClient.post("/products", product);
    return response.data;
  },

  updateProduct: async (id, product) => {
   const response = await apiClient.patch(`/products/${id}`, product);
    return response.data;
  },

  deleteProduct: async (id) => {
   const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};

export default productService