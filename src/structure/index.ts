export const structure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      // S.listItem()
      //   .title("Pages")
      //   .child(
      //     S.editor()
      //       .id("page")
      //       .schemaType("page")
      //       .documentId("page")
      //       .title("Page"),
      //   ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["shirtVariant", "shirtColor"].includes(listItem.getId()),
      ),
    ]);
