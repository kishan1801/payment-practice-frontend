const PaymentModal = ({ amount, orderId, onSuccess, onFailure, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💳</span>
            <span className="text-white font-bold text-lg">
              Payment Gateway
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white text-xl transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 mb-6" />

        {/* Order Info */}
        <div className="space-y-3 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Order ID</span>
            <span className="text-white font-mono text-xs">{orderId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Amount</span>
            <span className="text-amber-400 font-bold text-lg">₹{amount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Status</span>
            <span className="text-yellow-400 text-sm font-semibold">
              Pending
            </span>
          </div>
        </div>

        {/* Simulated card UI */}
        <div className="bg-slate-800 rounded-xl p-4 mb-6 border border-slate-700">
          <p className="text-slate-500 text-xs mb-3">Simulated Card Details</p>
          <div className="space-y-2">
            <div className="bg-slate-700 rounded-lg h-8 w-full animate-pulse" />
            <div className="flex gap-2">
              <div className="bg-slate-700 rounded-lg h-8 w-1/2 animate-pulse" />
              <div className="bg-slate-700 rounded-lg h-8 w-1/2 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={onSuccess}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-colors"
          >
            ✅ Pay ₹{amount}
          </button>
          <button
            onClick={onFailure}
            className="w-full bg-red-900/40 hover:bg-red-900/70 text-red-400 font-bold py-3 rounded-xl transition-colors border border-red-900"
          >
            ❌ Simulate Failure
          </button>
        </div>

        <p className="text-slate-600 text-xs text-center mt-4">
          This is a simulated payment gateway
        </p>
      </div>
    </div>
  );
};

export default PaymentModal;
