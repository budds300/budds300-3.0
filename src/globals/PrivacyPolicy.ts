import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { GlobalConfig } from "payload";

export const PrivacyPolicy: GlobalConfig = {
  slug: "privacy-policy",
  label: "Privacy Policy",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Privacy Policy",
    },
    {
      name: "lastUpdated",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayOnly" },
        description: "Shown on the page as \"Last updated\".",
      },
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor(),
      required: true,
    },
  ],
};
