import { FaCar } from 'react-icons/fa'

export const structure = (S: any) =>
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
        (listItem: any) =>
          !["shirtVariant", "shirtColor"].includes(listItem.getId()),
      ),
    ]);

export const CustomStructure = () => ({
  name: "shop",
  title: "Shop",
  icon: FaCar,
  structure: (S: any) => S.documentTypeListItems().filter(
      (listItem: any) =>
        !["shirtVariant", "shirtColor"].includes(listItem.getId()),
    )
})