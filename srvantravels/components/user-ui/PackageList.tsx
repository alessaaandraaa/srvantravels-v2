"use client";

import { useEffect, useState } from "react";
import Packages from "./Packages";
import { PackageWithTags } from "@/types/package.types";

export default function PackageList() {
  const [packages, setPackages] = useState<PackageWithTags[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    fetch("/api/packages")
      .then((res) => res.json())
      .then((json) => setPackages(json.packages));
  }, []);

  /* FILTER + SEARCH */
  const filteredPackages = packages.filter((pack) => {
    const matchesSearch = pack.package_name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesTag =
      selectedTag === "all" ||
      pack.package_itinerary_tag.some(
        (t: any) => t.tag.name === selectedTag
      );

    return matchesSearch && matchesTag;
  });

  /* PAGINATION */
  const totalPages = Math.ceil(filteredPackages.length / ITEMS_PER_PAGE);
  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const allTags = Array.from(
    new Set(
      packages.flatMap((p) =>
        p.package_itinerary_tag.map((t: any) => t.tag.name)
      )
    )
  );

  return (
    <div
      className="
        relative
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage: "url('/bg-images/bg7.jpg')",
      }}
    >
      {/* DARK GRADIENT OVERLAY (stable + readable) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20" />

      {/* CONTENT */}
      <div className="relative z-10 px-6 py-14">
        {/* HEADER */}
        <h2
          className="
            text-5xl
            md:text-7xl
            font-extrabold
            text-center
            text-white
            mb-10
            tracking-tight
          "
          style={{
            textShadow: `
              -2px -2px 0 #000,
               2px -2px 0 #000,
              -2px  2px 0 #000,
               2px  2px 0 #000
            `,
          }}
        >
          WELCOME TO SR VAN TRAVELS!
        </h2>

        {/* SEARCH + FILTER */}
        <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search packages..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="
              flex-1
              px-4
              py-3
              rounded-xl
              bg-white
              text-gray-900
              placeholder-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-[#36B9CB]
            "
          />

          <select
            value={selectedTag}
            onChange={(e) => {
              setSelectedTag(e.target.value);
              setCurrentPage(1);
            }}
            className="
              px-4
              py-3
              rounded-xl
              bg-white
              text-gray-900
              focus:outline-none
              focus:ring-2
              focus:ring-[#36B9CB]
            "
          >
            <option value="all">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* CARD LIST */}
        <ul className="flex flex-col items-center gap-2 pb-10">
          {paginatedPackages.map((pack) => (
            <li key={pack.package_ID} className="w-full max-w-6xl">
              <Packages {...pack} />
            </li>
          ))}
        </ul>

        {/* PAGINATION */}
        <div className="flex justify-center gap-4 text-white">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="
              px-4
              py-2
              rounded-lg
              bg-[#36B9CB]
              disabled:opacity-40
            "
          >
            Previous
          </button>

          <span className="text-lg font-semibold">
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="
              px-4
              py-2
              rounded-lg
              bg-[#36B9CB]
              disabled:opacity-40
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
