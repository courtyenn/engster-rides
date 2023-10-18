import React from "react"
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
      },
    }),
  ],
  preview: {
    select: {
      title: "colorName",
      color: "color",
    },
    prepare(selection) {
      return {
        ...selection,
        media: React.createElement("div", {
          style: {
            backgroundColor: selection.color.hex,
            width: 20,
            height: 20,
          },
        }),
      }
    },
  },
})
