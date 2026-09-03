import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: undefined,
        formatOptions: { format: "webp", options: { quality: 80 } },
      },
      {
        name: "card",
        width: 800,
        height: undefined,
        formatOptions: { format: "webp", options: { quality: 80 } },
      },
      {
        name: "hero",
        width: 1600,
        height: undefined,
        formatOptions: { format: "webp", options: { quality: 82 } },
      },
    ],
  },
};
