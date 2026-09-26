import apiClient from "./apiClient";

const adminProductServices = {
  getProducts: async () => {
    const response = await apiClient.get("/products");

    return response.data;
  },

  getProductById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);

    return response.data;
  },

  createProduct: async (data) => {
    const response = await apiClient.post("/products", data);

    return response.data;
  },

  updateProduct: async (id, data) => {
    const response = await apiClient.patch(`/products/${id}`, data);

    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/products/${id}`);

    return response.data;
  },
};

export default adminProductServices;
