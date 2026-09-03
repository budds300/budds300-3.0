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
      name: "logo",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Logo shown in the header navigation. Falls back to the initials badge if left blank.",
      },
    },
    {
      name: "favicon",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Browser tab icon. Square image recommended (e.g. 512x512 PNG).",
      },
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
          name: "whatsapp",
          type: "text",
          admin: {
            description:
              "Number used for the \"Chat on WhatsApp\" button, in international format (e.g. +254701048045). Falls back to Phone if left blank.",
          },
        },
        {
          name: "whatsappMessage",
          type: "textarea",
          admin: {
            description:
              "Pre-filled message that opens in the WhatsApp chat when a visitor taps \"Chat on WhatsApp\".",
          },
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
