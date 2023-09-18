import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "convex/react";
import { api } from "~/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "~/components/ui/form";
import PlayerCard from "~/components/playerCard";

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

  return (
    <div>
      <div>
        <div className="flex flex-col items-center space-y-8 p-24">
          <PlayerCard name={player.name} color={player.color} />
          {submitted ? (
            <Card>
              <CardHeader>
                <CardTitle>Suggestion Submitted!</CardTitle>
              </CardHeader>
              <CardContent>
                Waiting for the host to start the game...
              </CardContent>
            </Card>
          ) : (
            <Card className="w-96">
              {" "}
              {/* Increase the width of the sidebar here */}
              <CardHeader>
                <CardTitle>Song Suggestion</CardTitle>
                <CardDescription>
                  Waiting? Suggest a song for this round.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                    autoComplete="off"
                  >
                    <FormField
                      control={form.control}
                      name="song"
                      render={({ field }) => (
                        <FormItem>
                          <Input placeholder="Song name" {...field} />
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

export default PlayerLobby;
