import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  games: defineTable({
    code: v.string(),
    players: v.array(v.string()),
    round: v.number(),
  }),

  players: defineTable({
    code: v.string(),
    name: v.string(),
    points: v.number(),
    color: v.string(),
  }),
});
