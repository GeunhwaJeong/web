import type { Metadata } from 'next';

export const metadata: Metadata = {
    metadataBase: new URL('https://haneul.io'),
    title: `Base`,
    description:
        'Live network statistics for Haneul.',
    openGraph: {
        type: 'website',
        title: `Base`,
        description:
            'Live network statistics for Haneul.',
        url: `/`,
        images: ['/images/base-open-graph.png'],
    },
    twitter: {
        card: 'summary_large_image',
    },
};

export default async function StatsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="h-screen w-screen">
          {children}
      </div>
  );
}
