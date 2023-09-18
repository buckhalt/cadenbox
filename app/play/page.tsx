"use client";

import { useMutation } from "convex/react";
import { api } from "~/convex/_generated/api";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { faker } from "@faker-js/faker";

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
  name: z.string().min(1),
});

export default function Join() {
  const addPlayerToGame = useMutation(api.games.addPlayerToGame);
  const createPlayer = useMutation(api.players.createPlayer);

  const form = useForm<z.infer<typeof JoinGameSchema>>({
    resolver: zodResolver(JoinGameSchema),
    defaultValues: {
      code: "",
      name: "",
    },
  });
  function onSubmit(data: z.infer<typeof JoinGameSchema>) {
    const code = data.code;
    const name = data.name;
    const color = faker.color.rgb();
    createPlayer({ code, name, color });
    addPlayerToGame({ code, name });
    router.push(`/play/${code}?name=${name}`);
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
              autoComplete="off"
            >
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
                name="name"
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
