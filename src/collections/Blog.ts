import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Blog: CollectionConfig = {
  slug: "blog-posts",
  labels: { singular: "Blog Post", plural: "Blog Posts" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedDate", "draft"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "Used in the /blog/[slug] URL." },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "category",
      type: "text",
      required: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
    },
    {
      name: "body",
      type: "richText",
      editor: lexicalEditor(),
      required: true,
    },
    {
      name: "author",
      type: "text",
      required: true,
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
    },
    {
      name: "draft",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Draft posts are excluded from /blog and /blog/[slug].",
      },
    },
  ],
};
