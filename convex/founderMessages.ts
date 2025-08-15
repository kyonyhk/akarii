import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add a message to the founder
export const addFounderMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    message: v.string(),
    userAgent: v.optional(v.string()),
    referrer: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(args.email)) {
      throw new Error("Invalid email format");
    }

    // Validate required fields
    if (!args.name.trim()) {
      throw new Error("Name is required");
    }
    
    if (!args.message.trim()) {
      throw new Error("Message is required");
    }

    // Add the message to the founder messages
    const messageId = await ctx.db.insert("founderMessages", {
      name: args.name.trim(),
      email: args.email.toLowerCase().trim(),
      company: args.company?.trim() || undefined,
      message: args.message.trim(),
      timestamp: Date.now(),
      userAgent: args.userAgent,
      referrer: args.referrer,
      status: "new",
    });

    return messageId;
  },
});

// Get total founder messages count
export const getFounderMessagesCount = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query("founderMessages").collect();
    return messages.length;
  },
});

// Get all founder messages (for admin use)
export const getAllFounderMessages = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db
      .query("founderMessages")
      .withIndex("by_timestamp")
      .order("desc")
      .collect();
    
    return messages.map((msg) => ({
      id: msg._id,
      name: msg.name,
      email: msg.email,
      company: msg.company,
      message: msg.message,
      timestamp: msg.timestamp,
      status: msg.status,
      userAgent: msg.userAgent,
      referrer: msg.referrer,
      createdAt: new Date(msg.timestamp).toISOString(),
    }));
  },
});

// Get unread founder messages count
export const getUnreadFounderMessagesCount = query({
  args: {},
  handler: async (ctx) => {
    const unreadMessages = await ctx.db
      .query("founderMessages")
      .withIndex("by_status", (q) => q.eq("status", "new"))
      .collect();
    
    return unreadMessages.length;
  },
});

// Mark a founder message as read (for admin use)
export const markFounderMessageAsRead = mutation({
  args: {
    messageId: v.id("founderMessages"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, {
      status: "read",
    });
  },
});