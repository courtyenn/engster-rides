import { defineField, defineType } from "sanity"

export default defineType({
  name: "shirtColor",
  title: "Shirt Color",
  type: "document",
  fields: [
    defineField({
      name: "colorName",
      title: "Color Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "color",
      options: {
        disableAlpha: true,
      }
    }),
  ],
  preview: {
    select: {
      title: "colorName",
    },
    prepare(selection) {
      return { ...selection}
    },
  },
})
