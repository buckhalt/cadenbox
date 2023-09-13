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

interface WaitingRoomProps {
  code: string;
  nextStep: () => void;
}

function WaitingRoom({ code, nextStep }: WaitingRoomProps) {
  const game = useQuery(api.games.getGame, { code });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Game code: {code}</CardTitle>
          <CardDescription>
            Visit localhost:3000/play to join using the game code above
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter>
          <Button onClick={nextStep}> Start Game </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default WaitingRoom;
