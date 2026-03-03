"use client";
import { useMutation, useLazyQuery } from "@apollo/client/react";
import { CREATE_ENTRY_MUTATION } from "@/src/graphql/entry/entry.mutation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ICreateEntryMutation } from "@/src/app/create-entry/types/createEntry.interface";
import { useState, useEffect } from "react";
import {
  IGetInfoFromTmdb,
  IGetInfoFromTmdbItem,
} from "@/src/app/create-entry/types/getInfoFromTmdb.interface";
import { GET_INFO_FROM_TMDB_QUERY } from "@/src/graphql/entry/entry.query";
import { useDebounce } from "@/src/hooks/useDebounce";
import { SearchResultCard } from "@/src/components/searchResultCard/searchResultCard";

export default function CreateEntryPage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [genreId, setGenreId] = useState<number>(0);
  const [typeId, setTypeId] = useState<number>(0);
  const [statusId, setStatusId] = useState<number>(0);
  const [createEntry] = useMutation<ICreateEntryMutation>(
    CREATE_ENTRY_MUTATION,
  );

  const [getInfoTmdb, { data: getInfoTmdbData }] =
    useLazyQuery<IGetInfoFromTmdb>(GET_INFO_FROM_TMDB_QUERY);

  const debouncedTitle = useDebounce(title, 1000);

  useEffect(() => {
    getInfoTmdb({
      variables: {
        input: { name: debouncedTitle },
      },
    });
  }, [debouncedTitle]);

  function handleCreateEntry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createEntry({
      variables: {
        input: {
          title: title,
          description: description,
          author: author,
          image: image,
          rating: rating,
          userId: 1,
          genreId: genreId,
          typeId: typeId,
          statusId: statusId,
        },
      },
    });
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <form
        className="flex flex-col gap-2 w-full max-w-[280px] sm:max-w-xs items-center"
        onSubmit={handleCreateEntry}
      >
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {getInfoTmdbData?.getInfoFromTmdb &&
            getInfoTmdbData.getInfoFromTmdb.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto flex flex-col gap-2 p-2">
                {getInfoTmdbData.getInfoFromTmdb.map(
                  ({
                    posterPath,
                    title,
                    rating,
                    genreIds,
                  }: IGetInfoFromTmdbItem) => (
                    <SearchResultCard
                      key={posterPath}
                      imgUrl={posterPath}
                      title={title}
                      rating={rating}
                      genres={genreIds}
                    />
                  ),
                )}
              </div>
            )}
        </div>
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Genre ID"
          value={genreId}
          onChange={(e) => setGenreId(Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Type ID"
          value={typeId}
          onChange={(e) => setTypeId(Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Status ID"
          value={statusId}
          onChange={(e) => setStatusId(Number(e.target.value))}
        />
        <Button type="submit">Create Entry</Button>
      </form>
    </main>
  );
}
