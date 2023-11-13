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
    }),
    defineField({
      name: "excerpt",
      title: "Short description",
      description: "Describe the accessory in a few words",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Long description",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
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
