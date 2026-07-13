import type { Metadata } from "next";

import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = "https://ppthoriqulirsyad.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pondok Pesantren Al Quran & Kitab Wonosobo | Thoriqul Irsyad",
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
    title: "Pondok Pesantren Al Quran & Kitab Wonosobo | Thoriqul Irsyad",
    description:
      "Mencari pondok quran wonosobo atau pondok kitab wonosobo? Ponpes Thoriqul Irsyad adalah pilihan tepat pondok alquran untuk tahfidz dan kajian kitab kuning.",
    url: "/",
    siteName: "Pondok Pesantren Thoriqul Irsyad",
    images: ["/images/logo.jpeg"],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pondok Pesantren Al Quran & Kitab Wonosobo | Thoriqul Irsyad",
    description:
      "Mencari pondok quran wonosobo atau pondok kitab wonosobo? Ponpes Thoriqul Irsyad adalah pilihan tepat pondok alquran untuk tahfidz dan kajian kitab kuning.",
    images: ["/images/logo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "H-NQ4ZqQUtCZxyVro3G5sBRwcg8o92-LokSji0-WrB8",
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
          name: "Tentang",
          item: "https://ppthoriqulirsyad.com/tentang/profil-pesantren",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Pendidikan",
          item: "https://ppthoriqulirsyad.com/pendidikan/program",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Media",
          item: "https://ppthoriqulirsyad.com/media/galeri",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Pendaftaran",
          item: "https://ppthoriqulirsyad.com/pendaftaran",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Kontak",
          item: "https://ppthoriqulirsyad.com/kontak",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Pondok Pesantren Thoriqul Irsyad",
      image: `${siteUrl}/images/logo.jpeg`,
      "@id": `${siteUrl}`,
      url: siteUrl,
      telephone: "+62 812-3456-7890",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jogoyitnan",
        addressLocality: "Wonosobo",
        addressRegion: "Jawa Tengah",
        addressCountry: "ID",
      },
    },
  ]);

  return (
    <html lang="id">
      <head>
        {/* Preconnect ke origin eksternal yang dipakai di first paint */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* Supabase preconnect — hanya di-render jika env var tersedia */}
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <>
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
            <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
          </>
        )}
      </head>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: orgSchema }} />
        {children}
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GMYBE4KZYG"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GMYBE4KZYG');
          `}
        </Script>
      </body>
    </html>
  );
}
