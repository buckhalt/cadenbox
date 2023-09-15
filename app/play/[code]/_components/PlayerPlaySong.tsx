import { useState, useEffect } from "react";
import PlayerCard from "~/components/playerCard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";

interface PlayerPlaySongProps {
  code: string;
  player: {
    code: string;
    name: string;
    points: number;
    color: string;
    note?: string;
  };
}

function PlayerPlaySong({ code, player }: PlayerPlaySongProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const decrementTimer = () => {
      if (seconds < 45) {
        setSeconds(seconds + 1);
      }
    };
    const timer = setInterval(decrementTimer, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [seconds]);

  const progressPercentage = (seconds / 45) * 100;

  return (
    <div className="w-96 h-screen flex flex-col justify-center items-center p-8">
      <div className="mb-8">
        <PlayerCard name={player.name} color={player.color} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Song Playing</CardTitle>
          <CardDescription>
            Listen to the song and think of a note
          </CardDescription>
        </CardHeader>
        <CardContent className="mb-4">
          <Progress value={progressPercentage} />
        </CardContent>
      </Card>
    </div>
  );
}

export default PlayerPlaySong;
