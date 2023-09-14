"use client";

import { useMutation } from "convex/react";
import { api } from "~/convex/_generated/api";
import { faker } from "@faker-js/faker";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { useSession, signIn } from "next-auth/react";

export default function Home() {
  const createGame = useMutation(api.games.createGame);
  const router = useRouter();
  const { data: session } = useSession();

  const newGame = () => {
    const code = faker.word.noun(4).toUpperCase();
    createGame({ code });
    router.push(`/game/${code}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {session ? (
        <>
          <div className="text-4xl font-bold mb-8">
            Welcome {session?.user?.name}
          </div>
          <Button onClick={newGame}>New Game</Button>
        </>
      ) : (
        <>
          <div className="text-4xl font-bold mb-8">Please sign in</div>
          <Button onClick={() => signIn()}>Sign In</Button>
        </>
      )}
    </main>
  );
}
