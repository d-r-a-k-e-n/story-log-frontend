"use client";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_ENTRY } from "@/src/graphql/entry/entry.query";
import EntryCard from "@/src/components/entryCard/entryCard";
import type { IGetAllEntry } from "@/src/app/my-entry/types/getAllEntry.interface";
import { useState } from "react";
import EntryDetailInfoCard from "@/src/components/entryDetailInfoCard/entryDetailInfoCard";

export default function MyEntryPage() {
  const { data } = useQuery<{ getAllEntry: IGetAllEntry[] }>(GET_ALL_ENTRY);
  const [selectedEntry, setSelectedEntry] = useState<IGetAllEntry | null>(null);

  return (
    <main className="p-6">
      <ul className="flex flex-col items-center gap-4">
        {data?.getAllEntry.map((entry) => (
          <EntryCard
            key={entry.id}
            {...entry}
            onClick={() => setSelectedEntry(entry)}
          />
        ))}
      </ul>
      {selectedEntry && (
        <EntryDetailInfoCard
          {...selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </main>
  );
}
