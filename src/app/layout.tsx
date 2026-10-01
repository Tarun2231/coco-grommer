import './globals.css';
import type { Metadata } from 'next';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileStickyBookingBar from '@/components/layout/MobileStickyBookingBar';

export const metadata: Metadata = {
  title: 'Petite Paws Grooming Studio | Exclusively for Small Breeds & Puppies',
  description: 'Specialized gentle grooming for puppies and small-breed dogs under 12kg in Bandra West, Mumbai. Shih Tzu, Toy Poodle, Maltese, Pomeranian, Yorkie grooming specialists.',
  keywords: [
    'Small breed dog grooming',
    'Puppy grooming Mumbai',
    'Shih Tzu haircut',
    'Pomeranian deshedding',
    'Toy Poodle teddy bear cut',
    'Small dog grooming salon near me'
  ],
  openGraph: {
    title: 'Petite Paws - Small Breed & Puppy Grooming Studio',
    description: 'Premium grooming, made exclusively for small breeds.',
    url: 'https://petitepawsgrooming.com',
    siteName: 'Petite Paws',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Petite Paws Small Breed Grooming Studio'
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured Schema JSON-LD for Local Business & SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'GroomingShop',
              name: 'Petite Paws Grooming Studio',
              image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
              telephone: '+919876543210',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '74 Blooming Petale Avenue, Bandra West',
                addressLocality: 'Mumbai',
                postalCode: '400050',
                addressCountry: 'IN'
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '09:00',
                  closes: '19:00'
                }
              ],
              priceRange: '₹399 - ₹1499'
            })
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-cream-100 text-slate-900 selection:bg-brand-500 selection:text-white">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileStickyBookingBar />
        </AppProvider>
      </body>
    </html>
  );
}
