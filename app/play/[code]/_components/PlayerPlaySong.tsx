"use client";

import PlayerCard from "~/components/playerCard";

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
  return (
    <div>
      <div>
        <h1>Song playing... {code}</h1>
        <div className="flex flex-wrap justify-evenly">
          <PlayerCard name={player.name} color={player.color} />
        </div>
      </div>
    </div>
  );
}

export default PlayerPlaySong;
