// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import { defineConfig } from "astro/config";

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;
import sanity from "@sanity/astro";
import react from "@astrojs/react";

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter
import vercel from "@astrojs/vercel/serverless";
import vue from "@astrojs/vue";
import compress from "astro-compress";

import prefetch from "@astrojs/prefetch";
import { astroImageTools } from "astro-imagetools";
import tailwindIntegration from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Hybrid+adapter is required to support embedded Sanity Studio
  output: "hybrid",
  adapter: vercel(),
  site: "https://engstarides.com",
  vite: {
    build: {
      assetsDir: "_astro"
    },
    ssr: {
      noExternal: ["oh-vue-icons"],
    },
  },
  integrations: [
    sanity({
      projectId,
      dataset,
      studioBasePath: "/admin",
      useCdn: false, // `false` if you want to ensure fresh data
      apiVersion: "2023-03-20", // Set to date of setup to use the latest API version
    }),
    react(), // Required for Sanity Studio
    vue({
      appEntrypoint: "/src/pages/_app",
    }),
    sitemap(),
    tailwindIntegration(),
    astroImageTools,
    prefetch(),
    compress({
      CSS: true,
      HTML: {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: false,
        collapseWhitespace: true,
        conservativeCollapse: false,
        continueOnParseError: false,
        customAttrAssign: [],
        customAttrCollapse: "",
        customAttrSurround: [],
        customEventAttributes: [/^on[a-z]{3,}$/],
        decodeEntities: false,
        html5: true,
        ignoreCustomComments: [],
        ignoreCustomFragments: [],
        includeAutoGeneratedTags: true,
        keepClosingSlash: true,
        maxLineLength: null,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: false,
        preserveLineBreaks: false,
        preventAttributesEscaping: false,
        processConditionalComments: true,
        processScripts: ["module"],
        quoteCharacter: "",
        removeAttributeQuotes: true,
        removeComments: false,
        removeEmptyAttributes: false,
        removeEmptyElements: false,
        removeOptionalTags: false,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeTagWhitespace: true,
        sortAttributes: true,
        sortClassName: true,
        trimCustomFragments: false,
        useShortDoctype: false,
      },
      Image: false,
      JavaScript: true,
      SVG: true,
    }),
  ], // compress must be last for best optimization
});
