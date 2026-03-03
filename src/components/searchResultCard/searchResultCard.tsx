import Image from "next/image";
import { ISearchResultCardProps } from "@/src/components/searchResultCard/searchResultCard.interface";

export function SearchResultCard({
  imgUrl,
  title,
  rating,
  genres,
}: ISearchResultCardProps) {
  return (
    <div className="flex items-center gap-2 w-full max-w-[280px] sm:max-w-xs">
      <Image
        className="rounded-sm"
        src={imgUrl}
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
