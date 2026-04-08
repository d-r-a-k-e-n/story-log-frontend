import Image from "next/image";
import type { IEntryCardProps } from "@/src/components/entryCard/entryCard.interfase";

export default function EntryCard({
  title,
  image,
  description,
  status,
  type,
  genres,
}: IEntryCardProps) {
  return (
    <li className="flex flex-col w-full hover:bg-gray-100 rounded-md cursor-pointer">
      <div className="flex items-center gap-2">
        <Image
          src={image}
          alt={`${title} image`}
          width={64}
          height={96}
          className="rounded-sm"
        />
        <div>
          <h3>
            <span className="font-medium">Title: </span>
            {title}
          </h3>
          <p>
            <span className="font-medium">Status: </span>
            {status.name}
          </p>
          <p>
            <span className="font-medium">Type: </span>
            {type.name}
          </p>
          <p className="line-clamp-1">
            <span className="font-medium">Genres: </span>
            {genres.map((genres) => genres.name).join(", ")}
          </p>
        </div>
      </div>

      <p className="line-clamp-1">
        <span className="font-medium">Description: </span>
        {description}
      </p>

      <span className="border border-gray-200 mt-3" />
    </li>
  );
}
