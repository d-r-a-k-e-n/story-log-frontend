import Image from "next/image";
import { ISearchResultCardProps } from "@/src/components/searchResultCard/searchResultCard.interface";
import UnknownImage from "@/public/unknown-img.jpg";

export function SearchResultCard({
  imgUrl,
  title,
  rating,
  genres,
  onClick,
}: ISearchResultCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2 w-full max-w-[280px] sm:max-w-xs hover:bg-gray-100 rounded-md cursor-pointer"
    >
      <Image
        className="rounded-sm"
        src={
          imgUrl === "https://image.tmdb.org/t/p/originalnull"
            ? UnknownImage
            : imgUrl
        }
        width={50}
        height={75}
        alt={`${title} poster`}
      />

      <div className="leading-tight flex-1 overflow-hidden">
        <h3 className="font-medium truncate" title={title || undefined}>
          {title || "No title"}
        </h3>
        <p>{rating?.toFixed(1) || "No rating"}</p>
        <p className="truncate">
          {genres?.map((genre) => genre).join(", ") || "No genre"}
        </p>
      </div>
    </div>
  );
}
