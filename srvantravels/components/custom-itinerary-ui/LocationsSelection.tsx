"use client";
import { useRef, useState } from "react";
import { useLocationsStore } from "@/store/custom-itinerary.store";

export default function LocationsSelection() {
  const locations = useLocationsStore((state) => state.locations);
  const setLocationAll = useLocationsStore((s) => s.setLocationAll);

  const dragIndex = useRef<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const onDragStart = (e: React.DragEvent, idx: number) => {
    dragIndex.current = idx;
    setDraggingIndex(idx);
    try {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", "");
    } catch {}
  };

  const onDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    setOverIndex(idx);
  };

  const onDrop = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    const from = dragIndex.current;
    const to = idx;
    if (from === null || from === undefined) return;
    if (from === to) {
      cleanupDrag();
      return;
    }
    const next = [...locations];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setLocationAll(next);
    cleanupDrag();
  };

  const onDragEnd = () => {
    cleanupDrag();
  };

  const cleanupDrag = () => {
    dragIndex.current = null;
    setOverIndex(null);
    setDraggingIndex(null);
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-6 text-black">
          <h1 className="text-2xl font-extrabold mb-4">Chosen Pit Stops</h1>

          {locations.length === 0 ? (
            <p className="text-sm text-gray-600">No pit stops selected yet.</p>
          ) : (
            <div className="space-y-3">
              {locations.map((l, idx) => {
                const isOver = overIndex === idx && draggingIndex !== idx;
                const isDragging = draggingIndex === idx;
                return (
                  <div
                    key={l.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, idx)}
                    onDragOver={(e) => onDragOver(e, idx)}
                    onDrop={(e) => onDrop(e, idx)}
                    onDragEnd={onDragEnd}
                    className={
                      `border rounded-2xl p-4 transition flex flex-col sm:flex-row sm:items-center gap-3 ` +
                      (isDragging ? "opacity-80 bg-gray-50" : "bg-white") +
                      (isOver ? " ring-2 ring-[#36B9CB]/40" : "")
                    }
                  >
                    <div className="flex-1">
                      <h2 className="font-semibold text-base">
                        {l.name ?? "Unnamed Location"}
                      </h2>
                      <p className="text-sm text-gray-600">{l.address}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">Drag</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
