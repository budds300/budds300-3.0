import type { CollectionConfig } from "payload";

export const ServiceOfferings: CollectionConfig = {
  slug: "service-offerings",
  labels: { singular: "Service Offering", plural: "Service Offerings" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "icon"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "icon",
      type: "select",
      required: true,
      defaultValue: "web",
      options: [
        { label: "Web Development", value: "web" },
        { label: "Automation & Workflows", value: "automation" },
        { label: "Web Design", value: "design" },
        { label: "E-Commerce", value: "ecommerce" },
        { label: "CMS", value: "cms" },
        { label: "Deployment & DevOps", value: "devops" },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Lower numbers appear first." },
    },
  ],
};
