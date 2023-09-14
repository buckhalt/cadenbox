"use client";

import PlayerCard from "~/components/playerCard";

interface PlayerWaitingRoomProps {
  code: string;
  player: {
    code: string;
    name: string;
    points: number;
    color: string;
    note?: string;
  };
}

function PlayerWaitingRoom({ code, player }: PlayerWaitingRoomProps) {
  return (
    <div>
      <div>
        <h1>Waiting for game {code} to begin...</h1>
        <div className="flex flex-wrap justify-evenly">
          <PlayerCard name={player.name} color={player.color} />
        </div>
      </div>
    </div>
  );
}

export default PlayerWaitingRoom;
