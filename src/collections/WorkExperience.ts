import type { CollectionConfig } from "payload";

export const WorkExperience: CollectionConfig = {
  slug: "work-experience",
  labels: { singular: "Work Experience", plural: "Work Experience" },
  admin: {
    useAsTitle: "roleTitle",
    defaultColumns: ["roleTitle", "company"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "roleTitle",
      type: "text",
      required: true,
    },
    {
      name: "company",
      type: "text",
      required: true,
    },
    {
      name: "dateRange",
      type: "group",
      fields: [
        {
          name: "start",
          type: "date",
          required: true,
        },
        {
          name: "end",
          type: "date",
        },
        {
          name: "current",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },
    {
      name: "achievements",
      type: "array",
      labels: { singular: "Achievement", plural: "Key Achievements" },
      fields: [
        {
          name: "achievement",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
