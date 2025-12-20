"use client";

import { useRef, useState } from "react";
import { useLocationsStore } from "@/store/custom-itinerary.store";
import { GripVertical } from "lucide-react";

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
    if (from === null || from === to) return;

    const next = [...locations];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setLocationAll(next);
    cleanup();
  };

  const cleanup = () => {
    dragIndex.current = null;
    setOverIndex(null);
    setDraggingIndex(null);
  };

  if (locations.length === 0) {
    return (
      <p className="text-sm text-gray-600">
        No pit stops selected yet.
      </p>
    );
  }

  return (
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
            onDragEnd={cleanup}
            className={`
              flex items-start gap-3
              border rounded-2xl p-4 transition
              cursor-grab active:cursor-grabbing
              ${isDragging ? "bg-gray-50 opacity-80" : "bg-white"}
              ${isOver ? "ring-2 ring-[#36B9CB]/40" : ""}
            `}
          >
            {/* Drag handle */}
            <div className="pt-1 text-gray-400">
              <GripVertical className="w-5 h-5" />
            </div>

            {/* Location info */}
            <div className="flex-1">
              <h3 className="font-semibold text-black">
                {l.name ?? "Unnamed Location"}
              </h3>
              <p className="text-sm text-gray-600">{l.address}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
