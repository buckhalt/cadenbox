"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "~/convex/_generated/api";
import { faker } from "@faker-js/faker";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { useSession, signIn } from "next-auth/react";
import { Headphones } from "lucide-react";

export default function Home() {
  const createGame = useMutation(api.games.createGame);
  const router = useRouter();
  const { data: session } = useSession();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", checkIsMobile);

    checkIsMobile();

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const newGame = async () => {
    const code = faker.word.noun(4).toUpperCase();
    createGame({ code });
    router.push(`/game/${code}`);
  };

  if (isMobile) {
    router.push("/play");
    return null;
  }

  if (session && !session.user?.name) {
    return <div>Loading..</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {session ? (
        <>
          <Headphones className="w-24 h-24 mb-8 text-secondary" />
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
