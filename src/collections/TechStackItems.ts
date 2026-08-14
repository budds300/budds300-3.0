import type { CollectionConfig } from "payload";

export const TechStackItems: CollectionConfig = {
  slug: "tech-stack-items",
  labels: { singular: "Tech Stack Item", plural: "Tech Stack Items" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "icon",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Optional. Upload the tool's logo (square works best). Falls back to the tool's initial if left blank.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers appear first." },
    },
  ],
};
