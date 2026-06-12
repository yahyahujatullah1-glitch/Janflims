import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Providers } from '@/components/layout/Providers';

export const metadata: Metadata = {
  title:       'JanFlims — Stream Anything',
  description: 'A self-hosted, Netflix-style streaming platform. Browse movies and series, watch with any stream link.',
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  openGraph: {
    siteName: 'JanFlims',
    type:     'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
