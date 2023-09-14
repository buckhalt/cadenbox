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
import NoteCard from "~/components/noteCard";
import { useRouter } from "next/navigation";

interface RevealProps {
  code: string;
}

interface Player {
  code: string;
  name: string;
  color: string;
  note: string;
  vote: string;
  points: number;
}

function Reveal({ code }: RevealProps) {
  const router = useRouter();
  const game = useQuery(api.games.getGame, { code });
  const allPlayers = useQuery(api.players.getAllPlayersInGame, { code });

  function sortPlayersByVotes(allPlayers: Player[]): Player[] {
    allPlayers.sort((playerA, playerB) => playerB.points - playerA.points);
    return allPlayers;
  }

  if (allPlayers) {
    sortPlayersByVotes(allPlayers);
  }

  function getVotersForPlayer(playerName: string): Player[] {
    return allPlayers
      ? allPlayers.filter((player) => player.vote === playerName)
      : [];
  }

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
          <CardDescription>Results:</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-evenly">
            {allPlayers && allPlayers.length > 0 ? (
              allPlayers.map((player) => (
                <div key={player.name} className="text-center mb-4">
                  <PlayerCard name={player.name} color={player.color} />
                  <NoteCard note={player.note} />
                  <p>Points: {player.points}</p>
                  {/* Render voters for this player */}
                  {player.vote && player.vote !== player.name && (
                    <div>
                      <p>Voters for {player.name}:</p>
                      {getVotersForPlayer(player.name).map((voter) => (
                        <PlayerCard
                          key={voter.name}
                          name={voter.name}
                          color={voter.color}
                        />
                      ))}
                    </div>
                  )}
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
