import type { CollectionConfig } from "payload";

export const Clients: CollectionConfig = {
  slug: "clients",
  labels: { singular: "Client", plural: "Clients" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "website", "order"],
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
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Optional. If empty, the client name is shown instead.",
      },
    },
    {
      name: "website",
      type: "text",
      admin: {
        description: "Optional URL used when the client item is clicked.",
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
