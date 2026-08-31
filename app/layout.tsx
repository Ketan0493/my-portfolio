import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ketan Sharma | Senior Platform, DevOps & SRE Engineer',
  description:
    'Ketan Sharma is a Senior Platform, DevOps and SRE Engineer with 10+ years of experience across AWS, Amazon EKS, Terraform, GitOps, reliability and technical leadership.',
  keywords: ['Ketan Sharma', 'Platform Engineer', 'DevOps Engineer', 'Site Reliability Engineer', 'SRE', 'AWS', 'Amazon EKS', 'Kubernetes', 'Terraform', 'GitOps'],
  authors: [{ name: 'Ketan Sharma' }],
  openGraph: {
    type: 'profile',
    title: 'Ketan Sharma | Senior Platform, DevOps & SRE Engineer',
    description: '10+ years building and operating resilient AWS and Kubernetes platforms at enterprise scale.',
  },
  twitter: {
    card: 'summary',
    title: 'Ketan Sharma | Senior Platform, DevOps & SRE Engineer',
    description: 'AWS · Amazon EKS · Terraform · GitOps · SRE · Technical Leadership',
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ketan Sharma',
  jobTitle: 'Senior Platform / DevOps / Site Reliability Engineer',
  email: 'mailto:ketansharma040293@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Gurgaon', addressCountry: 'IN' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'SRM University' },
  sameAs: ['https://www.linkedin.com/in/ketan-sharma-17b5aa102'],
  knowsAbout: ['AWS', 'Amazon EKS', 'Kubernetes', 'Terraform', 'GitOps', 'Site Reliability Engineering', 'Platform Engineering'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        {children}
      </body>
    </html>
  );
}
