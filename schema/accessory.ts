import { defineField, defineType } from "sanity";

export default defineType({
  name: "accessory",
  title: "Accessories",
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
      name: "discountPrice",
      title: "Discount Price",
      type: "number",
      initialValue: 0.0,
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "weight",
      title: "Shipping Weight",
      description: "Weight in grams",
      type: "number",
      initialValue: 0.0,
      hidden: true,
    }),
    defineField({
      name: "excerpt",
      title: "Short description",
      description:
        "To appear in SEO search results. Keep it short and use keywords.",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Describe the product. Use for product page.",
      type: "string",
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
    },
    prepare(selection) {
      const { description } = selection;
      return { ...selection, subtitle: description };
    },
  },
});
