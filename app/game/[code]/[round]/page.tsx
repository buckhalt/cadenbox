"use client";

import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import PlayerCard from "~/components/playerCard";

export default function Round({
  params,
}: {
  params: { code: string; round: string };
}) {
  const round = params.round;
  const code = params.code;
  const game = useQuery(api.games.getGame, { code });
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl">Round {round}</h1>
      <div className="flex flex-wrap justify-evenly">
        {game?.players.length && game.players.length > 0 ? (
          game.players.map((player) => (
            <div key={player} className="text-center mb-4">
              <PlayerCard name={player} />
            </div>
          ))
        ) : (
          <p>No players in the game.</p>
        )}
      </div>
    </main>
  );
}
