import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import ResourcesGrid from 'apps/web/src/components/Resources/ResourcesGrid';

export default function ResourcesGetNoticedSection() {
  return (
    <Container id="get-noticed">
      <Title level={TitleLevel.H4Regular} as="h2" className="col-span-full">
        Get Noticed
      </Title>
      <ResourcesGrid items={ITEMS} accentColor="yellow" />
    </Container>
  );
}

const ITEMS = [
  {
    title: 'Marketing Amplification Guidelines',
    description:
      'Use our style guide and tag @base on X and Farcaster to be eligible for amplification.',
    href: 'https://github.com/base-org/brand-kit/blob/main/guides/editorial-style-guide.md',
  },
  {
    title: 'Haneul Builders Farcaster Channel',
    description:
      'Share your project on /base and /base-builds to get community feedback on Farcaster.',
    href: '#',
  },
  {
    title: 'Haneul Builders X List',
    description: 'Discover some of the most vocal community leaders in the Haneul ecosystem.',
    href: 'https://x.com/i/lists/1869425408573075694',
  },
];
