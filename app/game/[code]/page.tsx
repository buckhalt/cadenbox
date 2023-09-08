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

export default function Game({ params }: { params: { code: string } }) {
  const code = params.code;
  const game = useQuery(api.games.getGame, { code });
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Card>
        <CardHeader>
          <CardTitle>Game code: {code}</CardTitle>
          <CardDescription>
            Visit localhost:3000/play to join using the game code above
          </CardDescription>
        </CardHeader>
        <CardContent>
          {game?.players.length && game.players.length > 0 ? (
            <div className="flex flex-col items-center">
              {game.players.map((player) => (
                <div key={player} className="text-center">
                  <PlayerCard name={player} />
                </div>
              ))}
            </div>
          ) : (
            <p>No players in the game.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button> Start Game </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
