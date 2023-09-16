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

  let rankText = "";

  if (allPlayers) {
    const sortedPlayers = sortPlayersByVotes([...allPlayers]); // Create a copy and sort it
    const rank = sortedPlayers.findIndex((p) => p.name === player.name);

    if (rank === 0) {
      rankText = "🥇";
    } else if (rank === 1) {
      rankText = "🥈";
    } else if (rank === 2) {
      rankText = "🥉";
    } else {
      rankText = `${rank + 1}th place`;
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <h1 className="text-primary text-4xl text-center">RESULTS</h1>
        </CardHeader>

        <div className="flex flex-col items-center space-y-4 p-4">
          <PlayerCard name={player.name} color={player.color} />
          <CardContent>
            <p className="text-center text-6xl">{rankText}</p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default PlayerReveal;
