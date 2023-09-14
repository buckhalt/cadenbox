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
      stage: 0,
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

export const addPlayerToGame = mutation({
  args: {
    code: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("code"), args.code))
      .first();
    if (game) {
      // check if player with name already exists in game
      if (game.players.includes(args.name)) {
        throw new Error("Player with that name already exists in game");
      }
      await ctx.db.patch(game._id, {
        players: [...game.players, args.name],
      });
    }
  },
});

export const advanceGameStage = mutation({
  args: {
    code: v.string(),
    nextStage: v.number(),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("code"), args.code))
      .first();
    if (game) {
      await ctx.db.patch(game._id, {
        stage: args.nextStage,
      });
    }
  },
});

export const deleteGame = mutation({
  args: {
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("code"), args.code))
      .first();
    if (game) {
      await ctx.db.delete(game._id);
    }
  },
});
