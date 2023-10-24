<script setup lang="ts">
import { defineProps, h } from "vue";
import { PortableText } from "@portabletext/vue";

const props = defineProps<any>();
const components = {
  block: {
    h1: (_, { slots }) =>
      h("h1", { class: "text-4xl font-accent font-light" }, slots.default?.()),
    h2: (_, { slots }) => h("h2", { class: "text-2xl" }, slots.default?.()),
    h3: (_, { slots }) => h("h3", { class: "text-xl" }, slots.default?.()),
    h4: (_, { slots }) => h("h4", { class: "text-lg" }, slots.default?.()),
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: (_, { slots }) => h("ul", { class: "pl-5" }, slots.default?.()),
    number: (_, { slots }) => h("ol", { class: "pl-5" }, slots.default?.()),

    // Ex. 2: rendering custom lists
    checkmarks: (_, { slots }) =>
      h("ol", { class: "m-auto text-lg" }, slots.default?.()),
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: (_, { slots }) =>
      h("li", { class: "list-disc" }, slots.default?.()),
    number: (_, { slots }) =>
      h("li", { class: "list-decimal" }, slots.default?.()),

    // Ex. 2: rendering custom list items
    checkmarks: (_, { slots }) => h("li", ["✅", slots.default?.()]),
  },
  marks: {
    em: (_, { slots }) =>
      h("em", { class: "text-gray-600 font-semibold" }, slots.default?.()),
    link: (_, { slots }) =>
      h(
        "a",
        {
          class:
            "cursor-pointer text-accent hover:text-gray-400 decoration-solid underline",
        },
        slots.default?.(),
      ),
  },
};
</script>

<template>
  <PortableText
    :value="props.value"
    :components="components"
  />
</template>
