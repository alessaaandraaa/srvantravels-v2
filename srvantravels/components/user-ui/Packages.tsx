import Image from "next/image";
import Link from "next/link";
import { PackageWithTags } from "@/types/package.types";

export default function Packages(props: PackageWithTags) {
  return (
    <Link href={`/packages/${props.package_ID}`} className="block">
      <div
        className="
          my-4
          mx-4
          h-[260px]
          rounded-3xl
          overflow-hidden
          shadow-lg
          flex
          cursor-pointer
          transition
          hover:shadow-xl
          hover:scale-[1.01]
          focus-visible:ring-2
          focus-visible:ring-[#36B9CB]
        "
      >
        {/* CONTENT PANEL */}
        <div
          className="
            w-full
            md:w-[60%]
            bg-white/90
            backdrop-blur-sm
            p-6
            flex
            flex-col
            justify-between
          "
        >
          {/* TOP CONTENT */}
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-[#36B9CB] leading-tight">
              {props.package_name}
            </h3>

            <div className="h-[2px] w-14 bg-[#F3B54D] rounded-full" />

            <p className="text-sm text-gray-700 line-clamp-2">
              <span className="font-semibold text-gray-900">Route:</span>{" "}
              {props.route}
            </p>

            <p className="text-sm text-gray-700 line-clamp-2">
              <span className="font-semibold text-gray-900">Inclusions:</span>{" "}
              {props.inclusions}
            </p>

            <p className="text-sm text-gray-700">
              <span className="font-semibold text-gray-900">Capacity:</span>{" "}
              {props.number_of_PAX} pax
            </p>
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-1.5 max-w-[80%]">
            {props.package_itinerary_tag.map((tag: any) => (
              <span
                key={tag.tag.tag_id}
                className="
                  px-2
                  py-[2px]
                  rounded-full
                  text-[11px]
                  font-medium
                  text-white
                "
                style={{ backgroundColor: tag.tag.color }}
              >
                {tag.tag.name}
              </span>
            ))}
          </div>
        </div>

        {/* IMAGE PANEL */}
        <div className="hidden md:block w-[40%] relative">
          <Image
            src={`/${props.package_picture}`}
            alt={props.package_name}
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    </Link>
  );
}
