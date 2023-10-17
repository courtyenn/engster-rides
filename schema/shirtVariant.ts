import { defineField, defineType } from "sanity"

export default defineType({
  name: "shirtVariant",
  title: "Shirt Variant",
  type: "document",
  fields: [
    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      initialValue: "M",
      options: {
        list: ["XS", "S", "M", "L", "XL", "XXL"],
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
      name: "images",
      title: "Images",
      type: "array",
      of: [{type: "image"}]
    }),
  ],
  preview: {
    select: {
      title: "name",
      description: "excerpt",
      images: "images",
    },
    prepare(selection) {
      const { description, images } = selection
      return { ...selection, subtitle: description, media: images[0] }
    },
  },
})
