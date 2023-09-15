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
import { Progress } from "~/components/ui/progress";
import GameCode from "~/components/gameCode";

interface PlaySongProps {
  code: string;
  nextStep: () => void;
}

function PlaySong({ code, nextStep }: PlaySongProps) {
  const game = useQuery(api.games.getGame, { code });
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const decrementTimer = () => {
      if (seconds < 45) {
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

  const progressPercentage = (seconds / 45) * 100;

  return (
    <div className="flex justify-evenly flex-col">
      <Card className="m-12 w-96">
        <CardHeader className="relative">
          <div>
            <CardTitle className="flex justify-between">
              <h1 className="text-6xl text-primary">SONG</h1>
              <GameCode code={code} />
            </CardTitle>
          </div>

          <CardDescription>
            <p>Listen to the song and think of a note</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-evenly">
            <Progress value={progressPercentage} />
          </div>
        </CardContent>
      </Card>
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
    </div>
  );
}

export default PlaySong;
