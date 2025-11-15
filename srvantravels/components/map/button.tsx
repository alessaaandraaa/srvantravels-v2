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
    <div className="absolute z-10 left-6 top-24 bg-white rounded-xl shadow-md p-3 flex items-center gap-2">
      <button
        className="border rounded-lg px-3 py-1 hover:bg-gray-50"
        onClick={optimize}
        disabled={disabled}
        title="Optimize driving route (fastest)"
      >
        Optimize route
      </button>

      <button
        className="border rounded-lg px-3 py-1 hover:bg-gray-50"
        onClick={routeInOrder}
        disabled={disabled}
        title="Use my current order"
      >
        Route (my order)
      </button>

      <button
        className="border rounded-lg px-3 py-1 hover:bg-gray-50"
        onClick={clear}
        title="Clear route"
      >
        Clear
      </button>
    </div>
  );
}
