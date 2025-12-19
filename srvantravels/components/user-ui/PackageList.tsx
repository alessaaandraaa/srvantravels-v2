"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

  /* TOP 3 PACKAGES (MOST TAGS) */
  const topPackages = [...packages]
    .sort(
      (a, b) =>
        b.package_itinerary_tag.length -
        a.package_itinerary_tag.length
    )
    .slice(0, 3);

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
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: "url('/bg-images/bg7.jpg')" }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20" />

      {/* CONTENT */}
      <div className="relative z-10 px-6 py-20 flex-grow">

        {/* ================= HERO ================= */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1
            className="text-5xl md:text-7xl font-extrabold text-white mb-6"
            style={{
              textShadow: `
                -2px -2px 0 #000,
                 2px -2px 0 #000,
                -2px  2px 0 #000,
                 2px  2px 0 #000
              `,
            }}
          >
            WELCOME TO SR VAN TRAVELS
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8">
            Your trusted partner for comfortable, reliable, and stress-free
            travel across Cebu and beyond.
          </p>

          <Link
            href="/about"
            className="
              inline-block
              px-8 py-3
              rounded-2xl
              bg-[#F3B54D]
              text-white
              font-bold
              shadow-lg
              hover:bg-[#eaa93f]
              hover:-translate-y-0.5
              transition-all duration-200
            "
          >
            Show More
          </Link>
        </div>

        {/* DIVIDER */}
        <div className="flex justify-center mb-20">
          <div className="h-1 w-40 rounded-full bg-gradient-to-r from-[#36B9CB] via-[#F3B54D] to-[#36B9CB]" />
        </div>

        {/* ================= TOP 3 ================= */}
        {packages.length > 0 && (
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-12">
              TOP 3 PACKAGES
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topPackages.map((pack, index) => (
                <Link
                  key={pack.package_ID}
                  href={`/packages/${pack.package_ID}`}
                  className="block"
                >
                  <div className="bg-white/90 rounded-2xl shadow-lg p-4 h-full flex flex-col hover:-translate-y-1 hover:shadow-2xl transition-all relative">
                    <span className="absolute top-2 right-2 bg-[#F3B54D] text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold">
                      {index + 1}
                    </span>

                    <h4 className="font-bold text-gray-900 mb-1 line-clamp-2">
                      {pack.package_name}
                    </h4>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {pack.package_description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {pack.package_itinerary_tag.map((t: any) => (
                        <span
                          key={t.tag.name}
                          className="text-[11px] px-2 py-0.5 rounded-full bg-[#36B9CB]/20 text-[#36B9CB] font-semibold"
                        >
                          {t.tag.name}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-gray-500 font-semibold mt-auto">
                      {pack.package_itinerary_tag.length} tags
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* DIVIDER */}
        <div className="flex justify-center mb-16">
          <div className="h-1 w-32 rounded-full bg-gradient-to-r from-[#36B9CB] via-[#F3B54D] to-[#36B9CB]" />
        </div>

        {/* ================= EXPLORE ================= */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-10">
          EXPLORE OUR PACKAGES!
        </h2>

        {/* SEARCH + FILTER */}
        <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search packages..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 px-4 py-3 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-[#36B9CB]"
          />

          <select
            value={selectedTag}
            onChange={(e) => {
              setSelectedTag(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-3 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-[#36B9CB]"
          >
            <option value="all">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* PACKAGE LIST */}
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
            className="px-4 py-2 rounded-lg bg-[#36B9CB] disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-lg font-semibold">
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg bg-[#36B9CB] disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 text-center py-6 text-white/80 text-sm">
        <div className="mb-2">
          © {new Date().getFullYear()} <span className="font-semibold">SR Van Travels</span>
        </div>

        <div className="flex justify-center gap-6 text-white/90">
          <Link href="/about" className="hover:underline">
            About Us
          </Link>
          <Link href="/help" className="hover:underline">
            Help
          </Link>
        </div>
      </footer>
    </div>
  );
}
