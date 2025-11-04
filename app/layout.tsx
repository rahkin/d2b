import type { Metadata } from 'next';
import { Inter, Poppins, Dancing_Script } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing-script',
});

export const metadata: Metadata = {
  title: 'Design2Build.Pro - Design-Focused Project Management & Marketplace',
  description: 'Connect designers, clients, contractors, and vendors in the Philippines and beyond. AI-powered design tools, project management, and marketplace solutions.',
  keywords: 'design, project management, marketplace, Philippines, contractors, vendors, AI design tools',
  authors: [{ name: 'Design2Build.Pro Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Design2Build.Pro',
    description: 'Design-Focused Project Management & Marketplace',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${dancingScript.variable}`}>
      <body className="font-sans antialiased bg-neutral-50">
        <Providers>
          {/* Layout is handled by individual pages - splash/welcome/auth pages have their own layout */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
