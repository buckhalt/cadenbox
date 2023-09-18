import React from "react";
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
import getSongClip from "~/lib/utils/getSongClip";
import { useSession } from "next-auth/react";
import GameCode from "~/components/gameCode";
import SongSidebar from "./SongSidebar";

interface LobbyProps {
  code: string;
  nextStep: () => void;
}

function Lobby({ code, nextStep }: LobbyProps) {
  const game = useQuery(api.games.getGame, { code });
  const allPlayers = useQuery(api.players.getAllPlayersInGame, { code });
  const updateSong = useMutation(api.games.updateSong);
  const { data: session } = useSession();

  async function startGame() {
    if (game?.suggestedSongs) {
      const randomSong =
        game?.suggestedSongs[
          Math.floor(Math.random() * game?.suggestedSongs.length)
        ];
      const songClip = await getSongClip(session, randomSong);

      updateSong({ code, song: songClip });
      nextStep();
    }
  }

  return (
    <div>
      <Card>
        <CardHeader className="relative">
          <div>
            <CardTitle className="flex justify-between">
              <h1 className="text-6xl text-primary">LOBBY</h1>
              <GameCode code={code} />
            </CardTitle>
          </div>

          <CardDescription>
            <p>Use your phone to join using the game code.</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-evenly">
            {allPlayers &&
              allPlayers.length > 0 &&
              allPlayers.map((player) => (
                <div key={player.name} className="text-center mb-4">
                  <PlayerCard name={player.name} color={player.color} />
                </div>
              ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={startGame} disabled={allPlayers?.length === 0}>
            Start Game
          </Button>
        </CardFooter>
      </Card>
      <div className="mt-4">
        <SongSidebar code={code} />
      </div>
    </div>
  );
}

export default Lobby;
