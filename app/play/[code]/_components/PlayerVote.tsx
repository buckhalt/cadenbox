"use client";

import { useQuery } from "convex/react";
import NoteCard from "~/components/noteCard";
import PlayerCard from "~/components/playerCard";
import { api } from "~/convex/_generated/api";

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
  const allPlayers = useQuery(api.players.getAllPlayersInGame, { code });

  return (
    <div>
      <div>
        <h1>Vote! {code}</h1>
        <div className="flex flex-col flex-wrap justify-evenly">
          <PlayerCard name={player.name} color={player.color} />
          <div className="flex flex-wrap justify-evenly">
            {allPlayers && allPlayers.length > 0 ? (
              allPlayers.map((player) => (
                <div key={player.name} className="text-center mb-4">
                  <NoteCard note={player.note} />
                </div>
              ))
            ) : (
              <p>No players in the game.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerVote;
