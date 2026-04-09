"use client";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION } from "@/src/graphql/auth/auth.mutation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type {
  ILoginInput,
  ILoginResponse,
} from "@/src/graphql/auth/auth.types";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [login, { loading, error }] = useMutation<ILoginResponse, ILoginInput>(
    LOGIN_MUTATION
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({
        variables: { input: { email, password } },
      });
      const tokens = result.data?.login;
      if (!tokens) throw new Error("Failed to login");

      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <form
        className="flex flex-col gap-2 w-full max-w-70 sm:max-w-xs items-center"
        onSubmit={handleLogin}
      >
        <h1 className="text-xl font-medium mb-1">Login</h1>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        {error && <p className="text-sm text-destructive">{error.message}</p>}

        <p className="text-sm text-muted-foreground mt-2">
          No account?{" "}
          <Link href="/register" className="underline">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}
