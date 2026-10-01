import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Malayalis in Croatia",
    short_name: "Malayalis in Croatia",
    description: "Learn Croatian through Malayalam",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#2563eb",
    orientation: "portrait",
    lang: "ml",
    icons: [
      {
        src: "/icons/icon.png",
        sizes: "1536x1024",
        type: "image/png",
      },
    ],
  };
}