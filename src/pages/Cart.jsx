import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { createOrder } from "../api/orderApi";
import { verifyPayment } from "../api/paymentApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PaymentModal from "../components/PaymentModal";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null); // { orderId, totalAmount, paymentId, signature }

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Create order on backend
      // Backend returns orderId, totalAmount, paymentId, signature
      console.log("📦 Step 1: Creating order...");
      const order = await createOrder(cart);
      console.log("✅ Order created:", order);

      if (!order?.orderId) {
        throw new Error("Order created but no orderId returned");
      }

      // Step 2: Open payment modal
      // This simulates Razorpay opening its payment popup
      // User decides to pay or fail — nothing is verified yet
      setPendingOrder(order);
      setShowModal(true);
    } catch (error) {
      console.error("❌ Order creation failed:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to create order.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // User clicked "Pay" in modal
  // Simulates Razorpay success → sends correct paymentId + signature to backend
  const handlePaymentSuccess = async () => {
    setShowModal(false);
    setIsLoading(true);

    try {
      console.log("💳 Step 3: Verifying payment...");
      await verifyPayment({
        orderId: pendingOrder.orderId,
        paymentId: pendingOrder.paymentId, // correct
        signature: pendingOrder.signature, // correct → backend verification passes
      });
      console.log("✅ Payment verified!");
      setCart([]);
      navigate("/orders");
    } catch (error) {
      console.error("❌ Verification failed:", error);
      setError(
        error.response?.data?.message || error.message || "Payment failed.",
      );
    } finally {
      setIsLoading(false);
      setPendingOrder(null);
    }
  };

  // User clicked "Simulate Failure" in modal
  // Simulates Razorpay failure → sends wrong signature → backend rejects it
  const handlePaymentFailure = async () => {
    setShowModal(false);
    setIsLoading(true);

    try {
      await verifyPayment({
        orderId: pendingOrder.orderId,
        paymentId: pendingOrder.paymentId,
        signature: "invalid_signature", // wrong → backend returns 400
      });
    } catch (error) {
      const msg =
        error.response?.data?.message || "Payment verification failed.";
      console.error("❌ Payment failed (expected):", msg);
      setError(msg);
    } finally {
      setIsLoading(false);
      setPendingOrder(null);
    }
  };

  // User closed the modal
  const handleModalClose = () => {
    setShowModal(false);
    setPendingOrder(null);
    setError("Payment cancelled.");
  };

  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Payment Modal — opens after order creation, before verification */}
      {showModal && pendingOrder && (
        <PaymentModal
          amount={pendingOrder.totalAmount}
          orderId={pendingOrder.orderId}
          onSuccess={handlePaymentSuccess}
          onFailure={handlePaymentFailure}
          onClose={handleModalClose}
        />
      )}

      <div className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-white mb-8">🛍️ Your Cart</h2>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">Error: {error}</p>
          </div>
        )}

        {cart.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="text-5xl mb-4">🛒</p>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 flex justify-between items-center"
                >
                  <span className="text-slate-300 text-sm">
                    Product ID:{" "}
                    <span className="text-white font-mono text-xs">
                      {item.productId}
                    </span>
                  </span>
                  <span className="bg-amber-500/20 text-amber-400 text-sm font-bold px-3 py-1 rounded-lg">
                    Qty: {item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 flex justify-between items-center mb-6">
              <span className="text-slate-400">Total items</span>
              <span className="text-white font-bold">{total}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className={`w-full font-bold py-3 rounded-xl transition-colors ${
                isLoading
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-400 text-slate-950"
              }`}
            >
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
