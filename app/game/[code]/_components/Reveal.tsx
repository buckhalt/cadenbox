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

interface RevealProps {
  code: string;
  nextStep: () => void;
}

function Reveal({ code, nextStep }: RevealProps) {
  const game = useQuery(api.games.getGame, { code });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Reveal{code}</CardTitle>
          <CardDescription>Voting revealed</CardDescription>
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
          <Button onClick={nextStep}> Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Reveal;