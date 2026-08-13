import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "tierName",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "tierName",
      type: "text",
      required: true,
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "billingInterval",
      type: "select",
      required: true,
      options: [
        { label: "One-Time", value: "one-time" },
        { label: "Monthly", value: "monthly" },
        { label: "Hourly", value: "hourly" },
      ],
    },
    {
      name: "features",
      type: "array",
      labels: { singular: "Feature", plural: "Included Features" },
      fields: [
        {
          name: "feature",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "ctaLink",
      type: "text",
      required: true,
    },
  ],
};
