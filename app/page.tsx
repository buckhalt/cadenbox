"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import { faker } from "@faker-js/faker";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function Home() {
  const createGame = useMutation(api.games.createGame);
  const router = useRouter();

  const newGame = () => {
    const code = faker.word.noun(4).toUpperCase();
    createGame({ code });
    router.push(`/game/${code}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Button onClick={newGame}>New Game</Button>
    </main>
  );
}
