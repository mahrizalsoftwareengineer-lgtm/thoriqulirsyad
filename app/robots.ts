import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin-ponpesno1/",
          "/api/admin-ponpesno1/",
        ],
      },
    ],
    sitemap: "https://ppthoriqulirsyad.com/sitemap.xml",
  };
}
