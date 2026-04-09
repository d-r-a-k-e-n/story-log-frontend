"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
} from "@/src/graphql/auth/auth.mutation";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import type {
  ILoginInput,
  ILoginResponse,
} from "@/src/graphql/auth/auth.types";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [register, { loading: registerLoading, error: registerError }] =
    useMutation(REGISTER_MUTATION);

  const [login, { loading: loginLoading, error: loginError }] = useMutation<
    ILoginResponse,
    ILoginInput
  >(LOGIN_MUTATION);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({
        variables: { input: { email, password, name } },
      });
      const loginResult = await login({
        variables: { input: { email, password } },
      });
      const tokens = loginResult.data?.login;
      if (!tokens) throw new Error("Failed to login");
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const loading = registerLoading || loginLoading;
  const errorMessage = registerError?.message ?? loginError?.message;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <form
        className="flex flex-col gap-2 w-full max-w-70 sm:max-w-xs items-center"
        onSubmit={handleRegister}
      >
        <h1 className="text-xl font-medium mb-1">Register</h1>

        <Input
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          {loading ? "Registering..." : "Register"}
        </Button>

        {errorMessage && (
          <p className="text-sm text-destructive">{errorMessage}</p>
        )}

        <p className="text-sm text-muted-foreground mt-2">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}
