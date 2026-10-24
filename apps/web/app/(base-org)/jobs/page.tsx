import ErrorsProvider from 'apps/web/contexts/Errors';
import Container from 'apps/web/src/components/base-org/Container';
import { JobType } from 'apps/web/src/components/Jobs/Job';
import JobsList from 'apps/web/src/components/Jobs/JobsList';
import { Hero } from 'apps/web/src/components/Jobs/Redesign/Hero';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://haneul.io'),
  title: `Haneul | Jobs`,
  openGraph: {
    title: `Haneul | Jobs`,
    url: `/jobs`,
  },
};

async function getJobs() {
  // Job board integration pending; returns an empty list until a board is connected.
  return [] as JobType[];
}

export default async function Jobs() {
  const jobs = await getJobs();

  return (
    <ErrorsProvider context="base_landing_page">
      <div id="webgl-canvas-jobs" className="overflow-hidden absolute top-0 left-0 w-full h-full">
        <div className="w-full h-full -z-1">
          <WebGLCanvas />
        </div>
      </div>
      <Container className="lg:pt-0">
        <div className="flex flex-col col-span-full gap-12">
          <Hero />
          <JobsList jobs={jobs} />
        </div>
      </Container>
    </ErrorsProvider>
  );
}
