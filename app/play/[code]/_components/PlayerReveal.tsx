"use client";

import PlayerCard from "~/components/playerCard";

interface PlayerRevealProps {
  code: string;
  player: {
    code: string;
    name: string;
    points: number;
    color: string;
    note?: string;
  };
}

function PlayerReveal({ code, player }: PlayerRevealProps) {
  return (
    <div>
      <div>
        <h1>REveal{code}</h1>
        <div className="flex flex-wrap justify-evenly">
          <PlayerCard name={player.name} color={player.color} />
        </div>
      </div>
    </div>
  );
}

export default PlayerReveal;
