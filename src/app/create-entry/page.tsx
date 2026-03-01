"use client";
import { useMutation, useLazyQuery } from "@apollo/client/react";
import { CREATE_ENTRY_MUTATION } from "@/src/graphql/entry/entry.mutation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ICreateEntryMutation } from "@/src/app/create-entry/types/createEntry.interface";
import { useState, useEffect } from "react";
import { IGetInfoTmdb } from "@/src/app/create-entry/types/getInfoTmdb.interface";
import { GET_INFO_TMBD_QUERY } from "@/src/graphql/entry/entry.query";
import { useDebounce } from "@/src/hooks/useDebounce";

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
    useLazyQuery<IGetInfoTmdb>(GET_INFO_TMBD_QUERY);

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
    <section className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <form
        className="flex flex-col gap-2 w-full max-w-[280px] sm:max-w-xs items-center"
        onSubmit={handleCreateEntry}
      >
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

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
      {getInfoTmdbData?.getInfo && getInfoTmdbData.getInfo.length > 0 && (
        <div className="mt-4 flex flex-col gap-2 w-full max-w-[280px] sm:max-w-xs">
          {getInfoTmdbData.getInfo.map((item, index) => {
            return <p key={index}>{item.posterPath}</p>;
          })}
        </div>
      )}
    </section>
  );
}
