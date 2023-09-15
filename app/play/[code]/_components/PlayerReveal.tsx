"use client";

import { useQuery } from "convex/react";
import PlayerCard from "~/components/playerCard";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
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
        <div className="flex flex-col items-center space-y-8 p-24">
          <PlayerCard name={player.name} color={player.color} />
          <Card>
            <CardHeader>
              <h1 className="text-primary text-4xl">Results</h1>
            </CardHeader>
            <CardContent>
              <p>Points: {player.points}</p>
              {rank !== -1 && <p>Rank: {rank + 1}</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PlayerReveal;
