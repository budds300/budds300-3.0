import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "clientName",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "clientName",
      type: "text",
      required: true,
    },
    {
      name: "roleCompany",
      type: "text",
      required: true,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "quote",
      type: "textarea",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: "platform",
      type: "select",
      required: true,
      defaultValue: "Upwork",
      options: [
        { label: "Upwork", value: "Upwork" },
        { label: "LinkedIn", value: "LinkedIn" },
        { label: "Google", value: "Google" },
        { label: "Direct", value: "Direct" },
      ],
    },
  ],
};
