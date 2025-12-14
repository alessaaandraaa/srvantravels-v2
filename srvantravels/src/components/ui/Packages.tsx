import Image from "next/image";
import Link from "next/link";

type Props = {
  package_ID: number;
  package_name: string;
  inclusions: string;
  number_of_PAX: number;
  route: string;
  description: string;
  is_made_by_manager: number;
  is_available: boolean;
  package_picture: string;
};

export default function Packages(props: Props) {
  return (
    <li
      className="bg-white rounded-3xl overflow-hidden shadow-lg
                 hover:shadow-2xl transition duration-300"
    >
      {/* Image */}
      <div className="relative h-56 w-full">
        <Image
          src={`/${props.package_picture}`}
          alt={props.package_name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3 className="text-2xl font-bold text-[#36B9CB]">
          {props.package_name}
        </h3>

        <p className="text-sm text-gray-600">
          {props.inclusions}
        </p>

        <div className="text-sm text-gray-700 space-y-1">
          <p>
            <span className="font-semibold">Route:</span>{" "}
            {props.route}
          </p>
          <p>
            <span className="font-semibold">Capacity:</span>{" "}
            {props.number_of_PAX} pax
          </p>
        </div>

        <Link
          href={`/packages/${props.package_ID}`}
          className="block mt-4 text-center py-3 rounded-xl
                     bg-[#F3B54D] text-white font-semibold
                     hover:bg-orange-600 transition"
        >
          View Package
        </Link>
      </div>
    </li>
  );
}
