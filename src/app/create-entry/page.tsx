"use client";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";
import { CREATE_ENTRY_MUTATION } from "@/src/graphql/entry/entry.mutation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useEffect, useState } from "react";

import {
  GET_ALL_GENRES_QUERY,
  GET_ALL_STATUSES_QUERY,
  GET_ALL_TYPES_QUERY,
  GET_INFO_FROM_TMDB_QUERY,
} from "@/src/graphql/entry/entry.query";

import type {
  ICreateEntryMutation,
  IGetAllGenres,
  IGetAllStatuses,
  IGetAllTypes,
  IGetInfoFromTmdb,
  IGetInfoFromTmdbItem,
} from "@/src/graphql/entry/entry.types";

import { useDebounce } from "@/src/hooks/useDebounce";
import { SearchResultCard } from "@/src/components/searchResultCard/searchResultCard";
import { Textarea } from "@/src/components/ui/textarea";

import { CreateEntrySelect } from "@/src/components/createEntrySelect/createEntrySelect";
import { MultiSelect } from "@/src/components/ui/multi-select";
import { useRouter } from "next/navigation";

export default function CreateEntryPage() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [genreIds, setGenreIds] = useState<number[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [typeId, setTypeId] = useState<number | null>(null);
  const [statusId, setStatusId] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedFromSearchTitle, setSelectedFromSearchTitle] =
    useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [createEntry, { loading }] = useMutation<ICreateEntryMutation>(
    CREATE_ENTRY_MUTATION
  );

  const [getInfoTmdb, { data: getInfoTmdbData }] =
    useLazyQuery<IGetInfoFromTmdb>(GET_INFO_FROM_TMDB_QUERY);

  const { data: getAllGenresData } =
    useQuery<IGetAllGenres>(GET_ALL_GENRES_QUERY);

  const { data: getAllStatusesData } = useQuery<IGetAllStatuses>(
    GET_ALL_STATUSES_QUERY
  );

  const { data: getAllTypesData } = useQuery<IGetAllTypes>(GET_ALL_TYPES_QUERY);

  const debouncedTitle = useDebounce(title, 1000);

  useEffect(() => {
    const list = getAllGenresData?.getAllGenres ?? [];
    setGenres(
      list.map((g) => g.name).filter((name): name is string => Boolean(name))
    );
  }, [getAllGenresData]);

  useEffect(() => {
    const normalizedTitle = debouncedTitle.trim();
    if (!normalizedTitle) {
      setIsSearchOpen(false);
      return;
    }
    if (
      selectedFromSearchTitle &&
      normalizedTitle === selectedFromSearchTitle
    ) {
      setIsSearchOpen(false);
      return;
    }

    getInfoTmdb({
      variables: {
        input: { name: normalizedTitle },
      },
    });
    setIsSearchOpen(true);
  }, [debouncedTitle, selectedFromSearchTitle]);

  async function handleCreateEntry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    if (!title.trim()) return setFormError("Input name");
    if (description.trim().length < 10) {
      return setFormError("Description min 10");
    }
    if (rating === null || Number.isNaN(rating) || rating < 0 || rating > 10) {
      return setFormError("Rating 0-10");
    }
    if (!genreIds.length || !typeId || !statusId) {
      return setFormError("Choose genre, type and status");
    }

    try {
      await createEntry({
        variables: {
          input: {
            title: title.trim(),
            description: description.trim(),
            image: image || null,
            rating,
            genreIds,
            typeId,
            statusId,
          },
        },
      });
      router.push("/my-entry");
    } catch (error) {
      setFormError("Try again");
      console.error(error);
    }
  }

  const handleSearchResultCardClick = (
    title: string,
    rating: number,
    posterPath: string,
    tmdbGenreIds: string[],
    mediaType: "movie" | "tv"
  ) => {
    setTitle(title);
    setRating(rating);
    setImage(posterPath);
    setIsSearchOpen(false);
    setSelectedFromSearchTitle(title.trim());

    if (!getAllGenresData?.getAllGenres?.length || !tmdbGenreIds.length) return;

    const matchedGenres = getAllGenresData.getAllGenres.filter((genre) =>
      tmdbGenreIds.includes(genre.name)
    );

    if (matchedGenres.length) {
      setSelectedGenres(matchedGenres.map((genre) => genre.name));
      setGenreIds(matchedGenres.map((genre) => genre.id));
    }

    const mappedTypeName = mediaType === "tv" ? "TV Show" : "Movie";
    const matchedType = getAllTypesData?.getAllTypes?.find(
      (type) => type.name === mappedTypeName
    );
    if (matchedType) {
      setTypeId(matchedType.id);
    }
  };
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <form
        className="flex flex-col gap-2 w-full max-w-70 sm:max-w-xs items-center"
        onSubmit={handleCreateEntry}
      >
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (selectedFromSearchTitle) {
                setSelectedFromSearchTitle("");
              }
            }}
          />

          {isSearchOpen &&
            getInfoTmdbData?.getInfoFromTmdb &&
            getInfoTmdbData.getInfoFromTmdb.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto flex flex-col gap-2 p-2">
                {getInfoTmdbData.getInfoFromTmdb.map(
                  ({
                    posterPath,
                    title,
                    rating,
                    genreIds,
                    mediaType,
                  }: IGetInfoFromTmdbItem) => (
                    <SearchResultCard
                      onClick={() =>
                        handleSearchResultCardClick(
                          title,
                          rating,
                          posterPath,
                          genreIds,
                          mediaType
                        )
                      }
                      key={posterPath}
                      imgUrl={posterPath}
                      title={title}
                      rating={rating}
                      genres={genreIds}
                    />
                  )
                )}
              </div>
            )}
        </div>
        <Textarea
          className="max-h-40"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Rating"
          value={rating ?? ""}
          min={0}
          max={10}
          step="0.1"
          onChange={(e) => {
            const next = Number(e.target.value);
            setRating(Number.isNaN(next) ? null : next);
          }}
          required
        />

        <MultiSelect
          options={genres}
          value={selectedGenres}
          onChange={(next) => {
            setSelectedGenres(next);
            const ids = next
              .map(
                (name) =>
                  getAllGenresData?.getAllGenres?.find((g) => g.name === name)
                    ?.id
              )
              .filter((id): id is number => typeof id === "number");
            setGenreIds(ids);
          }}
          placeholder="Genre"
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
        {formError && <p className="text-sm text-destructive">{formError}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Entry"}
        </Button>
      </form>
    </main>
  );
}
