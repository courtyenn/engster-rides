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
      type: "markdown",
    }),
    defineField({
      name: "test",
      title: "Test Content",
      type: "blockContent",
    }),
    defineField({
      name: "image",
      title: "Banner image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "title",
      content: "content[0].children[0].text",
    },
    prepare(selection) {
      const { content } = selection;
      return { ...selection, subtitle: content };
    },
  },
});
