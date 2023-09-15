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

interface PlaySongProps {
  code: string;
  nextStep: () => void;
}

function PlaySong({ code, nextStep }: PlaySongProps) {
  const game = useQuery(api.games.getGame, { code });
  const allPlayers = useQuery(api.players.getAllPlayersInGame, { code });
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const decrementTimer = () => {
      if (seconds < 30) {
        setSeconds(seconds + 1);
      } else {
        // When the timer reaches 30, call nextStep
        nextStep();
      }
    };
    const timer = setInterval(decrementTimer, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [seconds, nextStep]);

  const progressPercentage = (seconds / 30) * 100;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Play Song{code}</CardTitle>
          <CardDescription>Play a song</CardDescription>
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
            {game && (
              <iframe
                style={{ borderRadius: "12px" }}
                src={`https://open.spotify.com/embed/track/${game.song}?utm_source=generator`}
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            )}
            <Progress value={progressPercentage} />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={nextStep}>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default PlaySong;
