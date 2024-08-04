import { defineConfig } from "astro-imagetools/config";

export default defineConfig({
  format: ["webp", "png"],
  placeholder: "blurred",
  formatOptions: {
    jpg: {
      quality: 80,
    },
    png: {
      quality: 80,
    },
    webp: {
      quality: 50,
    },
  },
});
