import apiClient from "./apiClient";

const adminServices = {
  getDashboard: async () => {
    const response = await apiClient.get("/admin/dashboard");

    return response.data;
  },

  getUsers: async () => {
    const response = await apiClient.get("/admin/users");

    return response.data;
  },

  updateUserRole: async (id, role) => {
    const response = await apiClient.put(`/admin/users/${id}/role`, { role });

    return response.data;
  },

  getOrders: async () => {
    const response = await apiClient.get("/admin/orders");

    return response.data;
  },

  updateOrderStatus: async (id, status) => {
    const response = await apiClient.put(`/admin/orders/${id}/status`, {
      status,
    });

    return response.data;
  },

  updateUserStatus: async (id, status) => {
    const response = await apiClient.put(`/admin/users/${id}/status`, {
      status,
    });

    return response.data;
  },

  
};

export default adminServices;
