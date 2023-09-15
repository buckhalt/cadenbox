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
// Define a schema for the song suggestion
const SongSuggestionSchema = z.object({
  song: z.string().min(1),
});

interface PlayerLobbyProps {
  code: string;
  player: {
    code: string;
    name: string;
    points: number;
    color: string;
    note?: string;
  };
}

function PlayerLobby({ code, player }: PlayerLobbyProps) {
  const [submitted, setSubmitted] = useState(false);
  const addSuggestedSong = useMutation(api.games.addSuggestedSong);
  const form = useForm<z.infer<typeof SongSuggestionSchema>>({
    resolver: zodResolver(SongSuggestionSchema),
    defaultValues: {
      song: "",
    },
  });

  function onSubmit(data: z.infer<typeof SongSuggestionSchema>) {
    const songSuggestion = data.song;
    addSuggestedSong({
      code,
      song: songSuggestion,
    });
    setSubmitted(true);
    // toast success
  }

  if (submitted) {
    return <div>Song suggestion submitted!</div>;
  }

  return (
    <div>
      <div>
        <div className="flex flex-col items-center space-y-8">
          <PlayerCard name={player.name} color={player.color} />
          <Card>
            <CardHeader>
              <CardTitle>Song Suggestion</CardTitle>
              <CardDescription>
                Waiting? Suggest a song for this roung.
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
                    name="song"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Song name</FormLabel>
                        <FormControl>
                          <Input placeholder="Hey Driver" {...field} />
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
        </div>
      </div>
    </div>
  );
}

export default PlayerLobby;
