import axiosInstance from "./axios";

export const verifyPayment = async (data) => {
  try {
    // Validate data before sending
    if (!data.orderId || !data.paymentId || !data.signature) {
      throw new Error(
        "Missing required payment fields: orderId, paymentId, signature",
      );
    }

    console.log("💳 Verifying payment with:", data);

    const res = await axiosInstance.post("/payment/verify", data);

    console.log("✅ Payment verified:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Payment verification failed:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      sentData: data,
    });
    throw error;
  }
};

export { signupUser, loginUser } from "./authApi";
export { createOrder, getOrders } from "./orderApi";
export { getProducts } from "./productApi";
