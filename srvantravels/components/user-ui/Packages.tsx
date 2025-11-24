import Image from "next/image";
import PackageButton from "./PackageButton";
import { PackageWithTags } from "@/types/package.types";

interface Tag {
  tag_id: number;
}

export default function Packages(props: PackageWithTags) {
  return (
    <div className="m-5 flex items-start">
      <div className="min-w-1/2 max-w-1/2">
        <Image
          src={`/${props.package_picture}`}
          width={500}
          height={500}
          alt={`/${props.package_name}`}
          className="rounded-2xl"
        />
      </div>
      <div>
        <h3 className="text-5xl font-extrabold">{props.package_name}</h3>
        <hr className="mt-3 mb-5 border-black" />
        <p>
          <b>Route:</b> {props.route}
        </p>
        <p>
          <b>Inclusions: </b>
          {props.inclusions}
        </p>
        <p className="mt-4">
          <b>Capacity:</b> {props.number_of_PAX}
        </p>

        <div className="flex items-start gap-5 mt-10">
          {props.package_itinerary_tag.map((tag: any) => (
            <p
              key={tag.tag.tag_id}
              className="p-2 rounded-2xl text-white max-w-fit shadow-md"
              style={{ backgroundColor: tag.tag.color }}
            >
              {tag.tag.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
