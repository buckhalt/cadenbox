import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...

  games: defineTable({
    code: v.string(),
    players: v.array(v.string()),
    round: v.number(),
  }),
});
