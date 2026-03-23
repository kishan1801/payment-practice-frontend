import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const getEmoji = (name) => {
  const map = {
    Carrot: "🥕",
    Radish: "🌱",
    "Baby Potato": "🥔",
    Tomato: "🍅",
    Spinach: "🥬",
    Onion: "🧅",
    Broccoli: "🥦",
    Cucumber: "🥒",
  };
  return map[name] || "🛒";
};

const ProductCard = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.productId === product._id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { productId: product._id, quantity: 1 }]);
    }
  };

  const inCart = cart.find((item) => item.productId === product._id);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
      <div className="bg-slate-800 rounded-xl h-32 flex items-center justify-center text-6xl">
        {getEmoji(product.name)}
      </div>
      <h3 className="text-white font-semibold text-lg">{product.name}</h3>
      <p className="text-slate-400 text-sm">{product.description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-amber-400 font-bold text-lg">
          ₹{product.price}
        </span>
        <span className="text-slate-500 text-xs">Stock: {product.stock}</span>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded-xl transition-colors text-sm"
      >
        {inCart ? `In Cart (${inCart.quantity})` : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
