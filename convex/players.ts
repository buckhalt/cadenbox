import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPlayer = mutation({
  args: {
    code: v.string(),
    name: v.string(),
    color: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("players", {
      code: args.code,
      name: args.name,
      points: 0,
      color: args.color,
      note: "",
      vote: "",
    });
  },
});

export const getPlayer = query({
  args: {
    code: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("code"), args.code))
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();
    return player;
  },
});

export const getAllPlayersInGame = query({
  args: {
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const players = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("code"), args.code))
      .collect();
    return players;
  },
});

export const addPlayerNote = mutation({
  args: {
    code: v.string(),
    name: v.string(),
    note: v.string(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("code"), args.code))
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();
    if (player) {
      await ctx.db.patch(player._id, {
        note: args.note,
      });
    }
  },
});

export const getPlayerNote = query({
  args: {
    code: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("code"), args.code))
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();
    if (player) {
      return player.note;
    }
  },
});

export const addPlayerPoints = mutation({
  args: {
    code: v.string(),
    name: v.string(),
    points: v.number(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("code"), args.code))
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();
    if (player) {
      await ctx.db.patch(player._id, {
        points: player.points + args.points,
      });
    }
  },
});

export const getPlayerPoints = query({
  args: {
    code: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("code"), args.code))
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();
    if (player) {
      return player.points;
    }
  },
});

export const setPlayerVote = mutation({
  args: {
    code: v.string(),
    name: v.string(),
    vote: v.string(),
  },
  handler: async (ctx, args) => {
    const player = await ctx.db
      .query("players")
      .filter((q) => q.eq(q.field("code"), args.code))
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();
    if (player) {
      await ctx.db.patch(player._id, {
        vote: args.vote,
      });
    }
  },
});
