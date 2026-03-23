import { useEffect, useState } from "react";
import { getAllOrders } from "../api/orderApi";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.orders);
      } catch (error) {
        console.error("Failed to fetch all orders", error);
        setError(error.response?.data?.message || "Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllOrders();
  }, []);

  const statusColor = (status) => {
    if (status === "paid") return "text-green-400 bg-green-400/10";
    if (status === "failed") return "text-red-400 bg-red-400/10";
    return "text-amber-400 bg-amber-400/10";
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">
            🛡️ Admin — All Orders
          </h2>
          <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-lg">
            {orders.length} total orders
          </span>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="text-5xl mb-4">📭</p>
            <p>No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4"
              >
                {/* Top row */}
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-white font-bold text-lg">
                      ₹{order.totalAmount}
                    </p>
                    <p className="text-slate-500 text-xs font-mono mt-0.5">
                      Order: {order._id}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-lg ${statusColor(order.status)}`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>

                {/* User ID */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-slate-500 text-xs">User:</span>
                  <span className="text-slate-300 text-xs font-mono">
                    {order.userId}
                  </span>
                </div>

                {/* Items */}
                <div className="bg-slate-800 rounded-lg px-4 py-3">
                  <p className="text-slate-500 text-xs mb-2">Items:</p>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-slate-400 font-mono">
                          {item.productId}
                        </span>
                        <span className="text-slate-300">
                          Qty: {item.quantity} × ₹{item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <p className="text-slate-600 text-xs mt-3">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
