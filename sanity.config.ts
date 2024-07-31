// Different environments use different variables
const projectId =
  import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID! ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID!;
const dataset =
  import.meta.env.PUBLIC_SANITY_STUDIO_DATASET! ||
  import.meta.env.PUBLIC_SANITY_DATASET!;

// Feel free to remove this check if you don't need it
if (!projectId || !dataset) {
  throw new Error(
    `Missing environment variable(s). Check if named correctly in .env file.\n\nShould be:\nPUBLIC_SANITY_STUDIO_PROJECT_ID=${projectId}\nPUBLIC_SANITY_STUDIO_DATASET=${dataset}\n\nAvailable environment variables:\n${JSON.stringify(
      import.meta.env,
      null,
      2,
    )}`,
  );
}

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schema";
import { colorInput } from "@sanity/color-input";
import { MyCustomActions } from "./documentActions/pageAction";
import { CustomStructure } from "./src/structure";
import { markdownSchema } from "sanity-plugin-markdown";
import { FaCar, FaTshirt, FaGavel, FaPage4 } from "react-icons/fa";

export default defineConfig({
  name: "engsta-rides",
  title: "Engsta Rides",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S, context) => {
        //console.log(context); // returns { currentUser, dataset, projectId, schema, getClient, documentStore }
        return S.list()
          .title("Shop")
          .items([
            S.documentTypeListItem("shirt").title("Shirts").icon(FaTshirt),
            S.documentTypeListItem("accessory").title("Swag").icon(FaCar),
            S.documentTypeListItem("auction").title("Auctions").icon(FaGavel),
            S.divider(),
            S.documentTypeListItem("blog").title("Blog").icon(FaPage4),
          ]);
      },
    }),
    visionTool(),
    colorInput(),
    markdownSchema(),
  ],
  document: {
    actions: MyCustomActions,
  },
  schema: {
    types: schemaTypes,
  },
  output: "server",
});
