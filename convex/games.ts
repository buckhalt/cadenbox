import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createGame = mutation({
  args: {
    code: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("games", {
      code: args.code,
      players: [],
      round: 0,
    });
  },
});

export const getGames = query({
  handler: async (ctx) => {
    return ctx.db.query("games").collect();
  },
});

export const getGame = query({
  args: {
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("code"), args.code))
      .first();
    return game;
  },
});

export const addPlayer = mutation({
  args: {
    code: v.string(),
    player: v.string(),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("code"), args.code))
      .first();
    if (game) {
      await ctx.db.patch(game._id, {
        players: [...game.players, args.player],
      });
    }
  },
});
