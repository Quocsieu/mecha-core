import apiClient from "./apiClient";

const uploadServices = {
  uploadImage: async (file) => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await apiClient.post(
      "/upload",
      formData
    );

    return response.data;
  },
};

export default uploadServices;