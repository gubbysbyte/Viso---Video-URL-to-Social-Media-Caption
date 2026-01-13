import { pgTable, text, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core';

// 1. Users Table (Standard for Auth)
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 2. Generated Content Table (The "Memory" of your app)
export const generatedContent = pgTable('generated_content', {
  id: uuid('id').defaultRandom().primaryKey(),
  originalUrl: text('original_url').notNull(),
  videoTitle: text('video_title'),
  // We store the structured AI output (Twitter/LinkedIn/Insta) as a JSON object
  content: jsonb('content').notNull(), 
  createdAt: timestamp('created_at').defaultNow().notNull(),
});