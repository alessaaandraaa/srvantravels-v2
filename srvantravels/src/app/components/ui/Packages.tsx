import Image from "next/image";

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
