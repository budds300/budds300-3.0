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
      name: "currency",
      type: "select",
      required: true,
      defaultValue: "KES",
      options: [
        { label: "Kenyan Shilling (KES)", value: "KES" },
        { label: "US Dollar (USD)", value: "USD" },
        { label: "Euro (EUR)", value: "EUR" },
        { label: "British Pound (GBP)", value: "GBP" },
      ],
      admin: {
        description: "Currency used to display this service price.",
      },
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
