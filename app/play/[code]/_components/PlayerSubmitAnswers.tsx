"use client";

import PlayerCard from "~/components/playerCard";

interface PlayerSubmitAnswersProps {
  code: string;
  player: {
    code: string;
    name: string;
    points: number;
    color: string;
    note?: string;
  };
}

function PlayerSubmitAnswers({ code, player }: PlayerSubmitAnswersProps) {
  return (
    <div>
      <div>
        <h1>Submit your answer...{code}</h1>
        <div className="flex flex-wrap justify-evenly">
          <PlayerCard name={player.name} color={player.color} />
        </div>
      </div>
    </div>
  );
}

export default PlayerSubmitAnswers;
