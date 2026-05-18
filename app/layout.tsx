import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://ppthoriqulirsyad.com";

export const metadata: Metadata = {
  title: "Pondok Pesantren Thoriqul Irsyad — Pondok Al Quran Wonosobo | Pondok Kitab Kuning Wonosobo",
  description:
    "Pondok Pesantren Thoriqul Irsyad — Pondok Al Quran Wonosobo dan Pondok Kitab Kuning Wonosobo. Membentuk generasi Qur'ani yang berakhlak mulia, berilmu luas, dan siap mengabdi.",
  keywords: [
    "Pondok Al Quran Wonosobo",
    "Pondok Kitab Kuning Wonosobo",
    "Pondok Pesantren Wonosobo",
    "Tahfidz Qur'an Wonosobo",
  ],
  authors: [{ name: "Pondok Pesantren Thoriqul Irsyad" }],
  openGraph: {
    title: "Pondok Pesantren Thoriqul Irsyad",
    description:
      "Pondok Al Quran Wonosobo dan Pondok Kitab Kuning Wonosobo — membentuk generasi Qur'ani yang berakhlak mulia.",
    url: siteUrl,
    siteName: "Pondok Pesantren Thoriqul Irsyad",
    images: ["/images/logo.jpeg"],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pondok Pesantren Thoriqul Irsyad",
    description:
      "Pondok Al Quran Wonosobo dan Pondok Kitab Kuning Wonosobo — membentuk generasi Qur'ani yang berakhlak mulia.",
    images: ["/images/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pondok Pesantren Thoriqul Irsyad",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.jpeg`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+62 812-3456-7890",
        email: "info@ppthoriqulirsyad.com",
        areaServed: "ID",
      },
    ],
    keywords:
      "Pondok Al Quran Wonosobo, Pondok Kitab Kuning Wonosobo, Pondok Pesantren Wonosobo",
  });

  return (
    <html lang="id">
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: orgSchema }} />
        {children}
      </body>
    </html>
  );
}
