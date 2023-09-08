"use client";

import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "~/convex/_generated/api";
import { useRouter } from "next/navigation";

export default function Join() {
  const [code, setCode] = useState("");
  const [player, setPlayer] = useState("");
  const addPlayer = useMutation(api.games.addPlayer);

  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>Join Game</div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPlayer({ code, player });
          router.push(`/play/${code}`);
        }}
      >
        <input
          type="text"
          value={code}
          placeholder="Game Code"
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="text"
          value={player}
          placeholder="Player Name"
          onChange={(e) => setPlayer(e.target.value)}
        />
        <button type="submit">Join</button>
      </form>
    </main>
  );
}
