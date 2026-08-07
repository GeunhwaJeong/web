import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import CoreContributors from 'apps/web/src/components/CoreContributors/CoreContributors';

export default async function BuildingBase() {
  return (
    <Container>
      <section className="flex w-full flex-col gap-24 pb-10 lg:flex-row lg:gap-16 lg:pb-40">
        <Title level={TitleLevel.Display1}>Building Haneul</Title>
        <div className="flex w-full flex-col font-display text-lg text-white" />
      </section>
    </Container>
  );
}
