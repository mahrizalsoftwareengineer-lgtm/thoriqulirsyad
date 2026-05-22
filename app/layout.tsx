import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://ppthoriqulirsyad.com";

export const metadata: Metadata = {
  title: "Pondok Al Quran & Kitab Kuning Wonosobo | Thoriqul Irsyad",
  description:
    "Mencari pondok quran wonosobo atau pondok kitab wonosobo? Ponpes Thoriqul Irsyad adalah pilihan tepat pondok alquran untuk tahfidz dan kajian kitab kuning.",
  keywords: [
    "Pondok Al Quran Wonosobo",
    "Pondok Kitab Kuning Wonosobo",
    "Pondok Quran Wonosobo",
    "Pondok Alquran Wonosobo",
    "Pondok Kitab Wonosobo",
    "Pondok Pesantren Wonosobo",
    "Tahfidz Al Quran Wonosobo",
    "Pendidikan Islam Wonosobo",
  ],
  authors: [{ name: "Pondok Pesantren Thoriqul Irsyad" }],
  openGraph: {
    title: "Pondok Al Quran & Kitab Wonosobo | Thoriqul Irsyad",
    description:
      "Mencari pondok quran wonosobo atau pondok kitab wonosobo? Ponpes Thoriqul Irsyad adalah pilihan tepat pondok alquran untuk tahfidz dan kajian kitab kuning.",
    url: siteUrl,
    siteName: "Pondok Pesantren Thoriqul Irsyad",
    images: ["/images/logo.jpeg"],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pondok Al Quran & Kitab Wonosobo | Thoriqul Irsyad",
    description:
      "Mencari pondok quran wonosobo atau pondok kitab wonosobo? Ponpes Thoriqul Irsyad adalah pilihan tepat pondok alquran untuk tahfidz dan kajian kitab kuning.",
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
  const orgSchema = JSON.stringify([
    {
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
        "Pondok Al Quran Wonosobo, Pondok Kitab Kuning Wonosobo, Pondok Pesantren Wonosobo, Tahfidz Al Quran Wonosobo, Kitab Kuning Wonosobo, Pendidikan Islam Wonosobo",
    },
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Pondok Pesantren Thoriqul Irsyad",
      url: siteUrl,
      logo: `${siteUrl}/images/logo.jpeg`,
      description:
        "Thoriqul Irsyad adalah pondok alquran wonosobo dan pondok kitab wonosobo yang unggul dalam tahfidz dan pengajian kitab kuning.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jogoyitnan",
        addressLocality: "Wonosobo",
        addressRegion: "Jawa Tengah",
        addressCountry: "ID",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: "+62 812-3456-7890",
          email: "info@ppthoriqulirsyad.com",
          areaServed: "ID",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Beranda",
          item: "https://ppthoriqulirsyad.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pendaftaran",
          item: "https://ppthoriqulirsyad.com/pendaftaran",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Kontak",
          item: "https://ppthoriqulirsyad.com/kontak",
        },
      ],
    },
  ]);

  return (
    <html lang="id">
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: orgSchema }} />
        {children}
      </body>
    </html>
  );
}
