import type { CollectionConfig } from "payload";

export const Messages: CollectionConfig = {
  slug: "messages",
  labels: { singular: "Message", plural: "Messages" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "budget", "createdAt"],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "budget",
      type: "text",
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
  ],
};
