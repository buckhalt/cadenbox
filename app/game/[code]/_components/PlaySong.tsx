"use client";

import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import PlayerCard from "~/components/playerCard";

interface PlaySongProps {
  code: string;
  nextStep: () => void;
}

function PlaySong({ code, nextStep }: PlaySongProps) {
  const game = useQuery(api.games.getGame, { code });
  const allPlayers = useQuery(api.players.getAllPlayersInGame, { code });
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Play Song{code}</CardTitle>
          <CardDescription>Play a sOng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-evenly">
            {allPlayers && allPlayers.length > 0 ? (
              allPlayers.map((player) => (
                <div key={player.name} className="text-center mb-4">
                  <PlayerCard name={player.name} color={player.color} />
                </div>
              ))
            ) : (
              <p>No players in the game.</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={nextStep}> Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default PlaySong;
