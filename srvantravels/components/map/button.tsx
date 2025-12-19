"use client";

export default function RouteButton({
  optimize,
  routeInOrder,
  clear,
  disabled,
}: {
  optimize: () => void;
  routeInOrder: () => void;
  clear: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      className="
        absolute z-10
        bottom-4
        left-1/2 -translate-x-1/2
        lg:top-24 lg:left-6 lg:bottom-auto lg:translate-x-0
        bg-white/90 backdrop-blur-md
        rounded-2xl shadow-xl
        p-3
        flex items-center gap-2
        border border-black/5
      "
    >
      {/* Optimize (Primary) */}
      <button
        onClick={optimize}
        disabled={disabled}
        title="Optimize driving route (fastest)"
        className="
          px-4 py-2 rounded-xl
          text-sm font-semibold
          bg-[#36B9CB] text-white
          hover:bg-[#2fa6b6]
          hover:-translate-y-0.5
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
        "
      >
        Optimize
      </button>

      {/* Route in Order (Secondary) */}
      <button
        onClick={routeInOrder}
        disabled={disabled}
        title="Use my current order"
        className="
          px-4 py-2 rounded-xl
          text-sm font-semibold
          border border-gray-300
          text-gray-700
          bg-white
          hover:bg-gray-100
          hover:-translate-y-0.5
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
        "
      >
        My Order
      </button>

      {/* Clear */}
      <button
        onClick={clear}
        title="Clear route"
        className="
          px-3 py-2 rounded-xl
          text-sm font-semibold
          text-gray-600
          border border-gray-300
          bg-white
          hover:bg-red-50 hover:text-red-600 hover:border-red-300
          transition-all duration-200
        "
      >
        Clear
      </button>
    </div>
  );
}
