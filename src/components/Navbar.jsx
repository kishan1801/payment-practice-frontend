import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

// Decode JWT to get role
const getRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return null;
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isActive = (path) => location.pathname === path;
  const role = getRole();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      <span className="text-amber-400 font-bold text-lg">💳 PayShop</span>

      <div className="flex items-center gap-6 text-sm">
        <Link
          to="/products"
          className={`transition-colors ${
            isActive("/products")
              ? "text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5"
              : "text-slate-300 hover:text-amber-400"
          }`}
        >
          Products
        </Link>

        <Link
          to="/cart"
          className={`relative transition-colors ${
            isActive("/cart")
              ? "text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5"
              : "text-slate-300 hover:text-amber-400"
          }`}
        >
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2.5 -right-4 bg-amber-500 text-slate-950 text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        <Link
          to="/orders"
          className={`transition-colors ${
            isActive("/orders")
              ? "text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5"
              : "text-slate-300 hover:text-amber-400"
          }`}
        >
          Orders
        </Link>

        {/* Only visible to admin */}
        {role === "admin" && (
          <Link
            to="/admin"
            className={`transition-colors ${
              isActive("/admin")
                ? "text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5"
                : "text-slate-300 hover:text-amber-400"
            }`}
          >
            🛡️ Admin
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-1.5 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
