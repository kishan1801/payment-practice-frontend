import axiosInstance from "./axios";

export const createOrder = async (items) => {
  const response = await axiosInstance.post("/orders", { items });
  return response.data;
};

export const getOrders = async () => {
  const response = await axiosInstance.get("/orders");
  return response.data;
};

// Admin only
export const getAllOrders = async () => {
  const response = await axiosInstance.get("/admin/orders");
  return response.data;
};
