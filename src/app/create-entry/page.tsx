"use client";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client/react";
import { CREATE_ENTRY_MUTATION } from "@/src/graphql/entry/entry.mutation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ICreateEntryMutation } from "@/src/app/create-entry/types/createEntry.interface";
import { useState, useEffect } from "react";
import {
  IGetInfoFromTmdb,
  IGetInfoFromTmdbItem,
} from "@/src/app/create-entry/types/getInfoFromTmdb.interface";
import {
  GET_INFO_FROM_TMDB_QUERY,
  GET_ALL_GENRES_QUERY,
  GET_ALL_STATUSES_QUERY,
  GET_ALL_TYPES_QUERY,
} from "@/src/graphql/entry/entry.query";
import { useDebounce } from "@/src/hooks/useDebounce";
import { SearchResultCard } from "@/src/components/searchResultCard/searchResultCard";
import { Textarea } from "@/src/components/ui/textarea";

import { IGetAllGenres } from "@/src/app/create-entry/types/getAllGenres.interface";
import { IGetAllStatuses } from "@/src/app/create-entry/types/getAllStatuses.interface";
import { IGetAllTypes } from "@/src/app/create-entry/types/getAllTypes.interface";

import { CreateEntrySelect } from "@/src/components/createEntrySelect/createEntrySelect";

export default function CreateEntryPage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [userId, setUserId] = useState<number>();
  const [genreId, setGenreId] = useState<number>();
  const [typeId, setTypeId] = useState<number | null>(null);
  const [statusId, setStatusId] = useState<number | null>(null);
  const [createEntry] = useMutation<ICreateEntryMutation>(
    CREATE_ENTRY_MUTATION,
  );

  const [getInfoTmdb, { data: getInfoTmdbData }] =
    useLazyQuery<IGetInfoFromTmdb>(GET_INFO_FROM_TMDB_QUERY);

  const { data: getAllGenresData } =
    useQuery<IGetAllGenres>(GET_ALL_GENRES_QUERY);

  const { data: getAllStatusesData } = useQuery<IGetAllStatuses>(
    GET_ALL_STATUSES_QUERY,
  );

  const { data: getAllTypesData } = useQuery<IGetAllTypes>(GET_ALL_TYPES_QUERY);

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

  const handleSearchResultCardClick = (title: string, rating: number) => {
    setTitle(title);
    setRating(rating);
  };
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
                      onClick={() => handleSearchResultCardClick(title, rating)}
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
        <Textarea
          className="max-h-40"
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
          type="number"
          placeholder="Rating"
          value={rating ?? ""}
          onChange={(e) => setRating(Number(e.target.value))}
        />

        <CreateEntrySelect
          value={genreId?.toString() ?? ""}
          onChange={(value) => setGenreId(+value)}
          options={getAllGenresData?.getAllGenres ?? []}
          label="Genre"
        />

        <CreateEntrySelect
          value={typeId?.toString() ?? ""}
          onChange={(value) => setTypeId(+value)}
          options={getAllTypesData?.getAllTypes ?? []}
          label="Type"
        />

        <CreateEntrySelect
          value={statusId?.toString() ?? ""}
          onChange={(value) => setStatusId(+value)}
          options={getAllStatusesData?.getAllStatuses ?? []}
          label="Status"
        />
        <Button type="submit">Create Entry</Button>
      </form>
    </main>
  );
}
