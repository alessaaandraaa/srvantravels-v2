import Image from "next/image";

export default function Packages(props: any) {
  return (
    <li className="m-5 bg-gray-200">
      <Image
        src={`/${props.package_picture}`}
        width={500}
        height={500}
        alt="Image"
      />
      <h3>{props.package_name}</h3>
      <p>{props.inclusions}</p>
      <p>Capacity: {props.number_of_PAX}</p>
      <p>Route: {props.route}</p>
    </li>
  );
}
