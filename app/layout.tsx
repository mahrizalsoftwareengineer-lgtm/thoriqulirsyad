import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://ppthoriqulirsyad.com";

export const metadata: Metadata = {
  title: "Pondok Al Quran Wonosobo — Pondok Kitab Kuning Wonosobo | Thoriqul Irsyad",
  description:
    "Pondok Al Quran Wonosobo Pondok Kitab Kuning Wonosobo — Pondok Pesantren Thoriqul Irsyad membentuk generasi Qur'ani yang berakhlak mulia, berilmu luas, dan siap mengabdi di Wonosobo.",
  keywords: [
    "Pondok Al Quran Wonosobo",
    "Pondok Kitab Kuning Wonosobo",
    "Pondok Pesantren Wonosobo",
    "Tahfidz Al Quran Wonosobo",
    "Kitab Kuning Wonosobo",
    "Pondok Tahfidz Wonosobo",
    "Pondok Pesantren Tahfidz",
    "Pesantren Kitab Kuning",
    "Pendidikan Islam Wonosobo",
  ],
  authors: [{ name: "Pondok Pesantren Thoriqul Irsyad" }],
  openGraph: {
    title: "Pondok Al Quran Wonosobo — Pondok Kitab Kuning Wonosobo | Thoriqul Irsyad",
    description:
      "Pondok Al Quran Wonosobo Pondok Kitab Kuning Wonosobo — Pondok Pesantren Thoriqul Irsyad menyediakan pendidikan tahfidz dan kitab kuning berkualitas di Wonosobo.",
    url: siteUrl,
    siteName: "Pondok Pesantren Thoriqul Irsyad",
    images: ["/images/logo.jpeg"],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pondok Al Quran Wonosobo — Pondok Kitab Kuning Wonosobo | Thoriqul Irsyad",
    description:
      "Pondok Al Quran Wonosobo Pondok Kitab Kuning Wonosobo — Pondok Pesantren Thoriqul Irsyad menyediakan pendidikan tahfidz dan kitab kuning berkualitas di Wonosobo.",
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
        "Pondok Al Quran Wonosobo dan Pondok Kitab Kuning Wonosobo yang membimbing santri dalam tahfidz Al Quran dan pengajian kitab kuning.",
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
