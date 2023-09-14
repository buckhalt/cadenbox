"use client";

import { useQuery } from "convex/react";
import PlayerCard from "~/components/playerCard";
import { api } from "~/convex/_generated/api";
import sortPlayersByVotes from "~/lib/utils/sortPlayersByVotes";

interface PlayerRevealProps {
  code: string;
  player: {
    code: string;
    name: string;
    points: number;
    color: string;
    note?: string;
  };
}

function PlayerReveal({ code, player }: PlayerRevealProps) {
  const allPlayers = useQuery(api.players.getAllPlayersInGame, { code });

  let rank = -1;

  if (allPlayers) {
    const sortedPlayers = sortPlayersByVotes([...allPlayers]); // Create a copy and sort it
    rank = sortedPlayers.findIndex((p) => p.name === player.name);
  }

  return (
    <div>
      <div>
        <h1>Reveal{code}</h1>
        <div className="flex flex-wrap justify-evenly">
          <PlayerCard name={player.name} color={player.color} />
          <p>Points: {player.points}</p>
          {rank !== -1 && <p>Rank: {rank + 1}</p>}{" "}
        </div>
      </div>
    </div>
  );
}

export default PlayerReveal;
