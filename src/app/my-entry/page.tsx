"use client";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_ENTRY } from "@/src/graphql/entry/entry.query";

interface Entry {
  title: string;
  id: number;
}

export default function MyEntryPage() {
  const { data } = useQuery<{ getAllEntry: Entry[] }>(GET_ALL_ENTRY);

  return (
    <div>
      {data?.getAllEntry.map((entry) => (
        <p key={entry.id}>{entry.id + " " + entry.title}</p>
      ))}
    </div>
  );
}
