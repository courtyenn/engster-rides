import { defineField, defineType } from "sanity";

export default defineType({
  name: "shirt",
  title: "Shirts",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      description: "Call the shirt something memorable",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variants",
      title: "Shirt Variants",
      type: "array",
      of: [{ type: "reference", to: [{ type: "shirtVariant" }] }],
    }),
    defineField({
      name: "excerpt",
      title: "Short description",
      description: "Describe the shirt in a few words",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Long description of the shirt, with markdown support",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      description: "excerpt",
      images: "variants.0.images",
    },
    prepare(selection) {
      const { description, images } = selection;
      return { ...selection, subtitle: description, media: images[0] };
    },
  },
});
