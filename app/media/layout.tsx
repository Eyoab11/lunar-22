import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media - Lunar 22 Entertainment',
  description: 'Explore our corporate materials, presentations, and video content showcasing our work and vision.',
  keywords: 'media, brochures, presentations, videos, corporate materials, Lunar 22',
  openGraph: {
    title: 'Media - Lunar 22 Entertainment',
    description: 'Explore our corporate materials, presentations, and video content showcasing our work and vision.',
    type: 'website',
  },
};

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}