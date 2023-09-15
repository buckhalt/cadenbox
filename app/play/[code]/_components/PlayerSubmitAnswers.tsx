"use client";

import PlayerCard from "~/components/playerCard";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import * as z from "zod";
import { useMutation } from "convex/react";
import { api } from "~/convex/_generated/api";

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

const SubmitNoteSchema = z.object({
  note: z.string().min(1),
});

function PlayerSubmitAnswers({ code, player }: PlayerSubmitAnswersProps) {
  const [submitted, setSubmitted] = useState(false);
  const addPlayerNote = useMutation(api.players.addPlayerNote);
  const form = useForm<z.infer<typeof SubmitNoteSchema>>({
    resolver: zodResolver(SubmitNoteSchema),
    defaultValues: {
      note: "",
    },
  });

  function onSubmit(data: z.infer<typeof SubmitNoteSchema>) {
    const note = data.note;
    addPlayerNote({
      code: player.code,
      note,
      name: player.name,
    });
    setSubmitted(true);
    // toast success
  }

  return (
    <div className="w-96">
      <div>
        <div className="flex flex-col items-center space-y-8 p-24">
          <PlayerCard name={player.name} color={player.color} />
          {submitted ? (
            <Card>
              <CardHeader>
                <CardTitle>Note Submitted!</CardTitle>
              </CardHeader>
              <CardContent>Waiting for other players...</CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Submit a note</CardTitle>
                <CardDescription>
                  Think of a creative description for the song
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes of...</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="watermelon on a hot day"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerSubmitAnswers;
