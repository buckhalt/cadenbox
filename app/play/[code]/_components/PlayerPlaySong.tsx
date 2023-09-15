"use client";

import { useState, useEffect } from "react";
import PlayerCard from "~/components/playerCard";
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
      if (seconds < 30) {
        setSeconds(seconds + 1);
      }
    };
    const timer = setInterval(decrementTimer, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [seconds]);

  const progressPercentage = (seconds / 30) * 100;
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <div className="flex flex-wrap justify-evenly">
          <PlayerCard name={player.name} color={player.color} />
          <Progress value={progressPercentage} />
          <div className="text-center">
            Listen to the song and think of a note.
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerPlaySong;
