import { IEntryCardProps } from "@/src/components/entryCard/entryCard.interfase";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";

interface Props extends Omit<IEntryCardProps, "onClick"> {
  onClose: () => void;
}

export default function EntryDetailInfoCard({
  title,
  image,
  description,
  status,
  type,
  genres,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white w-full max-w-lg rounded-lg shadow-lg p-4">
        <div className="flex items-start gap-3">
          <Image
            src={image}
            alt={`${title} image`}
            width={80}
            height={120}
            className="rounded-md"
          />
          <div>
            <h3 className="text-lg font-semibold truncate">{title}</h3>
            <p>
              <span className="font-medium">Status: </span>
              {status.name}
            </p>
            <p>
              <span className="font-medium">Type: </span>
              {type.name}
            </p>
            <p>
              <span className="font-medium">Genres: </span>
              {genres.map((g) => g.name).join(", ")}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-medium mb-1">Description:</p>
          <p className="max-h-52 overflow-y-auto">{description}</p>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
