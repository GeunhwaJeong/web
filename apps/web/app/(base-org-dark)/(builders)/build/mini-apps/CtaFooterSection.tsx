'use client';

import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'apps/web/src/components/Link';
import { useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import cx from 'classnames';

const copyTextMinikit = 'npx create-onchain@latest --mini';
const miniDocsUrl = 'https://docs.base.org/mini-apps/quickstart/migrate-existing-apps';

export function ExploreDocsButton({
  ctaLabel = 'Start building',
  url,
}: {
  ctaLabel?: string;
  url?: string;
}) {
  return (
    <Button
      variant={ButtonVariants.Primary}
      asChild
      className="w-full px-6 leading-none md:w-auto md:min-w-[280px]"
      size={ButtonSizes.Small}
    >
      <Link href={url ?? miniDocsUrl} target="_blank" rel="noopener noreferrer">
        {ctaLabel}
      </Link>
    </Button>
  );
}

export function CtaActions() {
  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isCopied) {
      timerRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }

    return () => clearTimeout(timerRef.current);
  }, [isCopied]);

  return (
    <div className="flex flex-col gap-2">
      {/** @ts-expect-error - CopyToClipboard is not a valid JSX element */}
      <CopyToClipboard text={copyTextMinikit} onCopy={() => setIsCopied(true)}>
        <Button
          variant={ButtonVariants.Secondary}
          size={ButtonSizes.Small}
          className={cx('w-full px-6 leading-none md:w-auto md:min-w-[310px]')}
        >
          {copyTextMinikit}
          <Icon name={isCopied ? 'checkmark' : 'copy'} width={16} height={16} />
        </Button>
      </CopyToClipboard>
      <ExploreDocsButton />
    </div>
  );
}

export function CtaFooterSection() {
  return (
    <div className="flex flex-col gap-9 md:flex-row md:items-end md:gap-[140px]">
      <div className="flex max-w-[450px] flex-col gap-6">
        <div className="text-7xl leading-none tracking-[-2.56px]">What will you build?</div>
        <div className="text-2xl leading-[1.116] tracking-[-0.72px]">
          To start building, run the command in your terminal or explore documentation.
        </div>
      </div>
      <CtaActions />
    </div>
  );
}
