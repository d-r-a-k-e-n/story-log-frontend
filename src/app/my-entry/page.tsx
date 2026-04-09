"use client";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_ALL_ENTRY_QUERY } from "@/src/graphql/entry/entry.query";
import EntryCard from "@/src/components/entryCard/entryCard";
import { useEffect, useState } from "react";
import EntryDetailInfoCard from "@/src/components/entryDetailInfoCard/entryDetailInfoCard";
import { DELETE_ENTRY_MUTATION } from "@/src/graphql/entry/entry.mutation";

import type {
  IDeleteEntryResponse,
  IDeleteEntryVariables,
  IGetAllEntry,
} from "@/src/graphql/entry/entry.types";

export default function MyEntryPage() {
  const [selectedEntry, setSelectedEntry] = useState<IGetAllEntry | null>(null);
  const { data, refetch } = useQuery<{ getAllEntry: IGetAllEntry[] }>(
    GET_ALL_ENTRY_QUERY
  );
  const [deleteEntry] = useMutation<
    IDeleteEntryResponse | IDeleteEntryVariables
  >(DELETE_ENTRY_MUTATION);

  async function onDeleteEntry(id: number) {
    await deleteEntry({
      variables: {
        id,
      },
    });
    setSelectedEntry(null);
    await refetch();
  }

  useEffect(() => {
    refetch().then();
  }, [refetch]);

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
          onDelete={() => onDeleteEntry(Number(selectedEntry.id))}
        />
      )}
    </main>
  );
}
