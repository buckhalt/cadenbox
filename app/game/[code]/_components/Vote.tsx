"use client";

import { useState, useEffect } from "react";
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
import { Progress } from "~/components/ui/progress";

interface VoteProps {
  code: string;
  nextStep: () => void;
}

function Vote({ code, nextStep }: VoteProps) {
  const game = useQuery(api.games.getGame, { code });
  const allPlayers = useQuery(api.players.getAllPlayersInGame, { code });
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const decrementTimer = () => {
      if (seconds < 30) {
        setSeconds(seconds + 1);
      } else {
        nextStep();
      }
    };
    const timer = setInterval(decrementTimer, 1000);

    return () => clearInterval(timer);
  }, [seconds, nextStep]);

  const progressPercentage = (seconds / 30) * 100;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Vote{code}</CardTitle>
          <CardDescription>Players who have submitted votes:</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-evenly">
            {allPlayers && allPlayers.length > 0 ? (
              allPlayers.map((player) => (
                <div key={player.name} className="text-center mb-4">
                  {player.vote !== "" && (
                    <PlayerCard name={player.name} color={player.color} />
                  )}
                </div>
              ))
            ) : (
              <p>Cast your votes!</p>
            )}
            <Progress value={progressPercentage} />{" "}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={nextStep}> Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Vote;
