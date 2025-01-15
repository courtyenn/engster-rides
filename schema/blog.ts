import { defineField, defineType } from "sanity";

export default defineType({
  name: "blog",
  title: "Blogs",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title of blog post",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      description: "Markdown content for the treatment page.",
      type: "blockContent",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Banner image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      content: "summary",
      image: "image",
    },
    prepare(selection) {
      const { content, image } = selection;
      return { ...selection, subtitle: content, media: image };
    },
  },
});
