import Link from "next/link";
export default function PackageButton({ package_ID }: { package_ID: number }) {
  return (
    <Link
      href={`/packages/${package_ID}`}
      className="bg-teal-400 text-white hover:bg-teal-700 p-3 m-5 rounded-2xl mb-5"
    >
      Book this package
    </Link>
  );
}
