import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Sivaguru",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FFFAFA",
    theme_color: "#F47920",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
