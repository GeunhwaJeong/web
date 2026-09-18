import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://haneulfoundation.org'),
  title: `Haneul | Stats`,
  description: 'Live stats for the Haneul network',
};

export default async function Page() {
  return <div className="h-full w-full" />;
}
