"use client";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_ENTRY } from "@/src/graphql/entry/entry.query";
import EntryCard from "@/src/components/entryCard/entryCard";
import type { IGetAllEntry } from "@/src/app/my-entry/types/getAllEntry.interface";

export default function MyEntryPage() {
  const { data } = useQuery<{ getAllEntry: IGetAllEntry[] }>(GET_ALL_ENTRY);

  return (
    <main className="p-6">
      <ul className="flex flex-col items-center gap-4">
        {data?.getAllEntry.map((entry) => (
          <EntryCard
            key={entry.id}
            title={entry.title}
            image={entry.image}
            description={entry.description}
            status={entry.status}
            type={entry.type}
            genres={entry.genres}
          />
        ))}
      </ul>
    </main>
  );
}
