"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import { faker } from "@faker-js/faker";
import { redirect } from "next/navigation";

export default function Home() {
  const createGame = useMutation(api.games.createGame);
  const games = useQuery(api.games.getGames);

  const newGame = () => {
    const code = faker.string.alpha({ length: 6, casing: "upper" });
    createGame({ code });
    redirect(`/games/${code}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {games?.map((game) => (
        <div key={game.code}>{game.code}</div>
      ))}
      <button onClick={newGame}>New Game</button>
    </main>
  );
}
