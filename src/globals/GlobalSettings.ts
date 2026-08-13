import type { GlobalConfig } from "payload";

export const GlobalSettings: GlobalConfig = {
  slug: "global-settings",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "headline",
      type: "text",
      required: true,
      defaultValue: "Full-Stack / Software Engineer",
    },
    {
      name: "bio",
      type: "textarea",
      required: true,
    },
    {
      name: "profileImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Portrait shown in the hero section.",
      },
    },
    {
      name: "aboutImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Photo shown in the About / Why Work With Me section.",
      },
    },
    {
      name: "resumePDF",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "contactDetails",
      type: "group",
      fields: [
        {
          name: "email",
          type: "email",
        },
        {
          name: "phone",
          type: "text",
        },
        {
          name: "linkedin",
          type: "text",
        },
        {
          name: "github",
          type: "text",
        },
        {
          name: "twitter",
          type: "text",
        },
      ],
    },
  ],
};
