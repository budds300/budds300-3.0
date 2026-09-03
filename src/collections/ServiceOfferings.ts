import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const ServiceOfferings: CollectionConfig = {
  slug: "service-offerings",
  labels: { singular: "Service Offering", plural: "Service Offerings" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "icon"],
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
      unique: true,
      admin: {
        description:
          "Optional. Set this to give the offering its own /services/[slug] detail page.",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "detail",
      type: "richText",
      editor: lexicalEditor(),
      admin: {
        description: "Optional expanded body for the /services/[slug] page.",
      },
    },
    {
      name: "icon",
      type: "select",
      required: true,
      defaultValue: "web",
      options: [
        { label: "Web Development", value: "web" },
        { label: "Automation & Workflows", value: "automation" },
        { label: "Web Design", value: "design" },
        { label: "E-Commerce", value: "ecommerce" },
        { label: "CMS", value: "cms" },
        { label: "Deployment & DevOps", value: "devops" },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers appear first." },
    },
  ],
};
