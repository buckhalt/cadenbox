"use client";

import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import PlayerLobby from "~/app/play/[code]/_components/PlayerLobby";
import PlayerPlaySong from "~/app/play/[code]/_components/PlayerPlaySong";
import PlayerSubmitAnswers from "~/app/play/[code]/_components/PlayerSubmitAnswers";
import PlayerVote from "~/app/play/[code]/_components/PlayerVote";
import PlayerReveal from "~/app/play/[code]/_components/PlayerReveal";

export default function Play({ params }: { params: { code: string } }) {
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") || "");
  const code = params.code;
  const game = useQuery(api.games.getGame, { code });

  const player = useQuery(api.players.getPlayer, { code, name });

  if (!game || !player) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center">
      {game.stage === 0 && <PlayerLobby code={code} player={player} />}
      {game.stage === 1 && (
        <div>
          <PlayerPlaySong code={code} player={player} />
        </div>
      )}
      {game.stage === 2 && (
        <div>
          <PlayerSubmitAnswers code={code} player={player} />
        </div>
      )}
      {game.stage === 3 && (
        <div>
          <PlayerVote code={code} player={player} />
        </div>
      )}
      {game.stage === 4 && (
        <div>
          <PlayerReveal code={code} player={player} />
        </div>
      )}
    </div>
  );
}
