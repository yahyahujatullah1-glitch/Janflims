import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { VideoModalGlobal } from '@/components/video/VideoModalGlobal';
import { AuthModalGlobal } from '@/components/auth/AuthModalGlobal';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh' }}>
        {children}
      </main>
      <Footer />
      <VideoModalGlobal />
      <AuthModalGlobal />
    </>
  );
}
