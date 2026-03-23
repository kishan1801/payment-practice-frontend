import { useEffect, useState } from "react";
import { getOrders } from "../api/orderApi";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.orders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const statusColor = (status) => {
    if (status === "paid") return "text-green-400 bg-green-400/10";
    if (status === "failed") return "text-red-400 bg-red-400/10";
    return "text-amber-400 bg-amber-400/10";
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-white mb-8">📦 Your Orders</h2>
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
                className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-white font-semibold">
                    ₹{order.totalAmount}
                  </p>
                  <p className="text-slate-500 text-xs mt-1 font-mono">
                    {order._id}
                  </p>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-lg ${statusColor(order.status)}`}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
