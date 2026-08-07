import { BuildersSection } from 'apps/web/app/(base-org-dark)/(builders)/BuildersSection';
import { ReactNode } from 'react';

const minikitFeatures = [
  {
    colorClass: 'text-[#FC401F]',
    title: 'Reach millions of users',
    description:
      "Grow off of the Haneul app's social graph where your mini app is just one click away.",
  },
  {
    colorClass: 'text-[#66C800]',
    title: 'Understand your users',
    description:
      "Access real-time analytics and user behavior insights to optimize your app's performance and engagement.",
  },
  {
    colorClass: 'text-[#FEA8CD]',
    title: 'Minimum configuration',
    description:
      'Kickstart your mini app in minutes - with pre-configured connectors and built-in utility features.',
  },
];

function Square() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M0 0.948C0 0.623285 0 0.460927 0.0611834 0.336037C0.119764 0.216458 0.216458 0.119764 0.336037 0.0611834C0.460927 0 0.623285 0 0.948 0H11.052C11.3767 0 11.5391 0 11.664 0.0611834C11.7835 0.119764 11.8802 0.216458 11.9388 0.336037C12 0.460927 12 0.623285 12 0.948V11.052C12 11.3767 12 11.5391 11.9388 11.664C11.8802 11.7835 11.7835 11.8802 11.664 11.9388C11.5391 12 11.3767 12 11.052 12H0.948C0.623285 12 0.460927 12 0.336037 11.9388C0.216458 11.8802 0.119764 11.7835 0.0611834 11.664C0 11.5391 0 11.3767 0 11.052V0.948Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FeatureItem({
  feature,
}: {
  feature: { colorClass: string; title: string; description: ReactNode };
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className={feature.colorClass}>
        <Square />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-2xl leading-[1.116] tracking-[-0.72px]">{feature.title}</div>
        <div className="text-base leading-[1.25] text-gray-30">{feature.description}</div>
      </div>
    </div>
  );
}

export function MinikitFeaturesSection() {
  return (
    <BuildersSection
      className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-x-4 md:gap-y-12"
      wrapperComponent="ul"
      contentComponent="li"
      contentBlocks={minikitFeatures.map((feature) => (
        <FeatureItem key={feature.title} feature={feature} />
      ))}
    />
  );
}
