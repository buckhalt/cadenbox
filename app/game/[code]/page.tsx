"use client";

import { useState } from "react";
import WaitingRoom from "./_components/WaitingRoom";
import SubmitAnswers from "./_components/SubmitAnswers";
import Vote from "./_components/Vote";
import PlaySong from "./_components/PlaySong";
import Reveal from "./_components/Reveal";

export default function Game({ params }: { params: { code: string } }) {
  const [step, setStep] = useState(0);
  const code = params.code;

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {step === 0 && <WaitingRoom code={code} nextStep={nextStep} />}
      {step === 1 && <PlaySong code={code} nextStep={nextStep} />}
      {step === 2 && <SubmitAnswers code={code} nextStep={nextStep} />}
      {step === 3 && <Vote code={code} nextStep={nextStep} />}
      {step === 4 && <Reveal code={code} nextStep={nextStep} />}
    </main>
  );
}
