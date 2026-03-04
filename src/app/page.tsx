"use client";

import { useQuery } from "@apollo/client/react";
import { FullScreenLoader } from "@/src/components/fullScreenLoader";
import { GET_ALL_USERS_QUERY } from "@/src/graphql/auth/auth.query";

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_USERS_QUERY);

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {loading && <FullScreenLoader />}
        {error && <div>Error: {error.message}</div>}
        <div>
          {data &&
            (data as any).getUsers.map((user: any) => (
              <div key={user.id}>
                {user.name} - {user.email}
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
