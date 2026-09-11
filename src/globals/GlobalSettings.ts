import type { GlobalConfig } from "payload";

export const GlobalSettings: GlobalConfig = {
  slug: "global-settings",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "metaTitle",
      label: "Metadata Title (SEO & Browser Tab)",
      type: "text",
      admin: {
        description:
          "Title used for the browser tab, search engine results, and social share previews. Falls back to Hero Headline if left blank.",
      },
    },
    {
      name: "metaDescription",
      label: "Metadata Description (SEO)",
      type: "textarea",
      admin: {
        description:
          "Description used for search engine results and social share previews. Falls back to Hero Bio if left blank.",
      },
    },
    {
      name: "headline",
      label: "Hero Headline",
      type: "text",
      required: true,
      defaultValue: "Full-Stack / Software Engineer",
      admin: {
        description: "Primary headline displayed in the hero section on the homepage.",
      },
    },
    {
      name: "bio",
      label: "Hero Bio",
      type: "textarea",
      required: true,
      admin: {
        description: "Introductory bio displayed in the hero section.",
      },
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
          name: "secondaryEmail",
          type: "email",
          admin: {
            description:
              "Optional second contact email (e.g. info@...), shown alongside the primary email.",
          },
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
