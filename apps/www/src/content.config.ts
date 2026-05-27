import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const imageSchema = z.object({
  src: z.union([z.url(), z.string().startsWith("/")]),
  alt: z.string(),
});

const shops = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/shops" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    image: imageSchema,
    featured: z.boolean().default(false),
    equipment: z.array(z.string()).default([]),
    access: z.string(),
    training: z.array(z.string()).default([]),
    relatedClasses: z.array(z.string()).default([]),
  }),
});

const classes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/classes" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    level: z.string(),
    schedule: z.string(),
    pricing: z.string(),
    eventbriteUrl: z.url(),
    image: imageSchema,
    shop: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/faqs" }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string(),
    order: z.number(),
  }),
});

const support = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/support" }),
  schema: z.object({
    title: z.string(),
    type: z.enum(["money", "material", "volunteer", "sponsorship"]),
    summary: z.string(),
    ctaLabel: z.string(),
    ctaUrl: z.string(),
    order: z.number(),
  }),
});

const equipment = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/equipment" }),
  schema: z.object({
    name: z.string(),
    shop: z.string(),
    category: z.string(),
    summary: z.string(),
    keywords: z.array(z.string()).default([]),
    manufacturer: z.string().optional(),
    model: z.string().optional(),
    quantity: z.string().default("Ask on tour"),
    status: z.enum(["available", "limited", "training-required", "ask-on-tour"]).default("ask-on-tour"),
    access: z.string(),
    trainingRequired: z.boolean().default(false),
    training: z.array(z.string()).default([]),
    relatedClasses: z.array(z.string()).default([]),
    lastVerified: z.string().optional(),
    publicNotes: z.string().optional(),
  }),
});

export const collections = {
  shops,
  classes,
  faqs,
  support,
  equipment,
};
