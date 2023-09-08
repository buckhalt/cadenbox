"use client";

import { useMutation } from "convex/react";
import { api } from "~/convex/_generated/api";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const JoinGameSchema = z.object({
  code: z.string().length(4),
  player: z.string().min(1),
});

export default function Join() {
  const addPlayer = useMutation(api.games.addPlayer);

  const form = useForm<z.infer<typeof JoinGameSchema>>({
    resolver: zodResolver(JoinGameSchema),
    defaultValues: {
      code: "",
      player: "",
    },
  });
  function onSubmit(data: z.infer<typeof JoinGameSchema>) {
    console.log("submitted", data);
    const code = data.code;
    const player = data.player;
    addPlayer({ code, player });
    router.push(`/play/${code}`);
  }

  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Card>
        <CardHeader>
          <CardTitle>Join Game</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Game Code</FormLabel>
                    <FormControl>
                      <Input placeholder="CODE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="player"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Player Name</FormLabel>
                    <FormControl>
                      <Input placeholder="NAME" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
