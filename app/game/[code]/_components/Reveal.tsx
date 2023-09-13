"use client";

import { useMutation, useQuery } from "convex/react";
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
import { useRouter } from "next/navigation";

interface RevealProps {
  code: string;
}

function Reveal({ code }: RevealProps) {
  const router = useRouter();
  const game = useQuery(api.games.getGame, { code });
  const allPlayers = useQuery(api.players.getAllPlayersInGame, { code });

  const deleteGame = useMutation(api.games.deleteGame);

  const endGame = () => {
    deleteGame({ code });
    router.push("/");
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Reveal{code}</CardTitle>
          <CardDescription>Voting revealed</CardDescription>
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
          <Button onClick={endGame}> Finish Game</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Reveal;
