"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import PlayerCard from "~/components/playerCard";
import NoteCard from "~/components/noteCard";
import { useRouter } from "next/navigation";
import sortPlayersByVotes from "~/lib/utils/sortPlayersByVotes";
import GameCode from "~/components/gameCode";

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
    <div className="flex justify-center">
      <Card className="w-1/2">
        <CardHeader className="relative">
          <div>
            <CardTitle className="flex justify-between">
              <h1 className="text-6xl text-primary">RESULTS</h1>
              <GameCode code={code} />
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {game && (
            <iframe
              style={{ borderRadius: "12px" }}
              src={`https://open.spotify.com/embed/track/${game.song}?utm_source=generator`}
              width="100%"
              height="100"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          )}
          <h1 className="text-xl mb-2">NOTES OF</h1>
          <div className="flex flex-wrap">
            {allPlayers && allPlayers.length > 0 ? (
              allPlayers.map((player) => (
                <div key={player.name} className="text-center mb-4">
                  <div className="flex flex-row space-x-2 items-start">
                    <PlayerCard name={player.name} color={player.color} />
                    <NoteCard note={player.note} />
                    {player.vote && player.vote !== player.name && (
                      <div className="ml-2 flex space-x-2">
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
