import apiClient from "./apiClient";

const authService = {
  register: async (data) => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  login: async (data) => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },

  getMe: async () => {
    const token = localStorage.getItem("token");

    const response = await apiClient.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  updateProfile: async (data) => {
    const response = await apiClient.put("/users/profile", data);
    return response.data;
  },

  changePassword: async (data) => {
    const response = await apiClient.put("/users/change-password", data);

    return response.data;
  },
};

export default authService;
