import axiosInstance from "./axios";

export async function getProducts() {
  const response = await axiosInstance.get("/products");
  return response.data;
}
