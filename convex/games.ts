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
