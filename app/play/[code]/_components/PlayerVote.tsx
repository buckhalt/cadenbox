"use client";

import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import NoteCard from "~/components/noteCard";
import PlayerCard from "~/components/playerCard";
import { api } from "~/convex/_generated/api";
import shuffleArray from "~/lib/utils/shuffleArray";

interface PlayerVoteProps {
  code: string;
  player: {
    code: string;
    name: string;
    points: number;
    color: string;
    note: string;
    vote: string;
  };
}

function PlayerVote({ code, player }: PlayerVoteProps) {
  const allPlayers = useQuery(api.players.getAllPlayersInGame, { code });
  const allPlayersShuffled = allPlayers ? shuffleArray(allPlayers) : [];

  const setPlayerVote = useMutation(api.players.setPlayerVote);
  const addPlayerPoints = useMutation(api.players.addPlayerPoints);

  const castVote = (playerToVoteFor: string) => {
    // set voting player's vote
    setPlayerVote({
      code: player.code,
      name: player.name,
      vote: playerToVoteFor,
    });

    // give points to playerToVoteFor
    addPlayerPoints({
      code: player.code,
      name: playerToVoteFor,
      points: 1,
    });
  };

  const playersToVoteOn = allPlayersShuffled.filter(
    (otherPlayer) => otherPlayer.name !== player.name
  );

  if (player.vote) {
    return (
      <div>
        <h1>Thanks for voting!</h1>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Select a note to cast your vote. {code}</h1>
        <div className="flex flex-col flex-wrap justify-evenly">
          <PlayerCard name={player.name} color={player.color} />
          <div className="flex flex-wrap justify-evenly">
            {playersToVoteOn && playersToVoteOn.length > 0 ? (
              playersToVoteOn.map((player) => (
                <button
                  key={player.name}
                  className="text-center mb-4"
                  onClick={() => castVote(player.name)}
                >
                  <NoteCard note={player.note} />
                </button>
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
