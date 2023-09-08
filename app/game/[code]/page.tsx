"use client";

import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";

export default function Game({ params }: { params: { code: string } }) {
  const code = params.code;
  const game = useQuery(api.games.getGame, { code });
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>Game</div>
      <div>{code}</div>
      <div>Round: {game?.round}</div>
      <div>Players: {game?.players?.map((player) => player)}</div>
    </main>
  );
}
