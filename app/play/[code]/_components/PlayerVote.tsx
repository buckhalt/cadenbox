"use client";

import PlayerCard from "~/components/playerCard";

interface PlayerVoteProps {
  code: string;
  player: {
    code: string;
    name: string;
    points: number;
    color: string;
    note?: string;
  };
}

function PlayerVote({ code, player }: PlayerVoteProps) {
  return (
    <div>
      <div>
        <h1>Vote! {code}</h1>
        <div className="flex flex-wrap justify-evenly">
          <PlayerCard name={player.name} color={player.color} />
        </div>
      </div>
    </div>
  );
}

export default PlayerVote;
