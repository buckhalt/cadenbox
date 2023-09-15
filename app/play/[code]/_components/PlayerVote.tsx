"use client";

import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import NoteCard from "~/components/noteCard";
import PlayerCard from "~/components/playerCard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "~/components/ui/card";
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
      <div className="flex flex-col items-center space-y-8 p-24">
        <Card>
          <CardHeader>
            <CardTitle>Vote Submitted!</CardTitle>
          </CardHeader>
          <CardContent>Waiting for other players...</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="flex flex-col items-center space-y-8 p-24">
          <PlayerCard name={player.name} color={player.color} />
          <Card>
            <CardHeader>
              <CardTitle>VOTE</CardTitle>
              <CardDescription>Select a note to cast your vote</CardDescription>
            </CardHeader>
            <CardContent>
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
                  <p>No votes in the game.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PlayerVote;
