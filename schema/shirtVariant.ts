import { defineField, defineType } from "sanity";

export default defineType({
  name: "shirtVariant",
  title: "Shirt Variant",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
      description: "This needs to be unique from other variants",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "checkoutUrl",
      title: "Checkout URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      initialValue: "M",
      options: {
        list: ["XS", "SM", "M", "LG", "XL", "XXL"],
      },
    }),
    defineField({
      name: "fit",
      title: "Fit",
      type: "string",
      initialValue: "Unisex",
      options: {
        list: ["Men", "Women", "Unisex"],
      },
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "reference",
      to: [{ type: "shirtColor" }],
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
      images: "images",
      color: "color",
    },
    prepare(selection) {
      const { images } = selection;
      return {
        ...selection,
        media: images[0],
      };
    },
  },
});
