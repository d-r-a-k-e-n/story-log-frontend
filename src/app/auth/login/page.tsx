"use client";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION } from "@/src/graphql/auth/auth.mutation";
import { useRouter } from "next/navigation";
import { ILoginResponse } from "@/src/app/auth/login/types/loginData.interface";
import { ILoginInput } from "@/src/app/auth/login/types/loginInput.interface";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [login, { loading, error, data }] = useMutation<
    ILoginResponse,
    ILoginInput
  >(LOGIN_MUTATION);

  const handleLogin = async () => {
    await login({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
    if (data && data.login) {
      localStorage.setItem("accessToken", data.login.accessToken);
      localStorage.setItem("refreshToken", data.login.refreshToken);
      router.push("/");
    }

    if (error) throw error;
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <form
        className="flex flex-col items-center justify-center gap-2"
        action=""
      >
        <header>
          <h1>Login</h1>
        </header>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" onClick={handleLogin} disabled={loading}>
          Login
        </Button>
      </form>
      {error && <div>{error.message}</div>}
    </section>
  );
}
