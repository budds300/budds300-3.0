import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "featured", "liveUrl"],
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
      admin: { description: "Used in the /projects/[slug] URL." },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "caseStudy",
      type: "richText",
      editor: lexicalEditor(),
      admin: {
        description:
          "Optional problem/solution narrative shown on the /projects/[slug] case-study page.",
      },
    },
    {
      name: "techStack",
      type: "array",
      labels: { singular: "Tag", plural: "Tech Stack Tags" },
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "liveUrl",
      type: "text",
    },
    {
      name: "githubUrl",
      type: "text",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
