import { defineField, defineType } from "sanity";

export default defineType({
  name: "auction",
  title: "Auctions",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      initialValue: 0.0,
    }),
    defineField({
      name: "sold",
      title: "Sold",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "excerpt",
      title: "Short description",
      description:
        "To appear in SEO search results. Keep it short and use keywords.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "checkoutUrl",
      title: "Checkout URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      description: "excerpt",
      images: "images",
    },
    prepare(selection) {
      const { description, images } = selection;
      return { ...selection, subtitle: description, media: images[0] };
    },
  },
});
