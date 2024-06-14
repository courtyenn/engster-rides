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
// import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schema";
import { colorInput } from "@sanity/color-input";
import { MyCustomActions } from "./documentActions/pageAction";
import { structure } from "./src/structure";
import { markdownSchema } from "sanity-plugin-markdown";

export default defineConfig({
  name: "engsta-rides",
  title: "Engsta Rides",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool(), colorInput(), markdownSchema()],
  document: {
    actions: MyCustomActions,
  },
  schema: {
    types: schemaTypes,
  },
  output: "server",
});
