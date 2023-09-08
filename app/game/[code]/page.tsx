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
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { faker } from "@faker-js/faker";

export default function Game({ params }: { params: { code: string } }) {
  const code = params.code;
  const game = useQuery(api.games.getGame, { code });
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Cadenbox</CardTitle>
          <CardDescription>Game code: {code}</CardDescription>
        </CardHeader>
        <CardContent>
          {game?.players ? (
            <div className="flex flex-col items-center">
              {game.players.map((player) => (
                <div key={player} className="text-center">
                  <Avatar>
                    <AvatarImage src={faker.image.avatar()} />
                    <AvatarFallback>{player}</AvatarFallback>
                  </Avatar>
                  <div>{player}</div>
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
