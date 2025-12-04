import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BNL Banque - Votre banque en ligne",
  description: "BNL Banque - La banque d'un monde qui change. Gérez vos comptes, effectuez vos virements et suivez vos opérations en toute sécurité.",
  
  // OpenGraph
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://bnl-banque.vercel.app",
    title: "BNL Banque - Votre banque en ligne",
    description: "La banque d'un monde qui change. Gérez vos finances en toute sécurité.",
    siteName: "BNL Banque",
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "BNL Banque - Votre banque en ligne",
    description: "La banque d'un monde qui change",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}