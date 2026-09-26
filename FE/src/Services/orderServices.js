import apiClient from "./apiClient";

const orderServices = {
  createOrder: async (data) => {
    const response = await apiClient.post(
      "/orders",
      data
    );

    return response.data;
  },
};

export default orderServices;