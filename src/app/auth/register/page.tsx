"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { REGISTER_MUTATION } from "@/src/graphql/auth/auth.mutation";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

  const handleRegister = async () => {
    await register({
      variables: {
        input: {
          email,
          password,
          name,
        },
      },
    });

    if (error) throw error;
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <header>
        <h1>Register</h1>
      </header>

      <form
        className="flex flex-col items-center justify-center gap-2"
        action=""
      >
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
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button type="submit" onClick={handleRegister} disabled={loading}>
          Register
        </Button>
      </form>
    </section>
  );
}
