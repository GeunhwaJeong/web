type DefaultRouteItem = {
  icon?: string;
  label: string;
  href?: string;
  newTab?: boolean;
  isSubheader?: boolean;
  isDivider?: boolean;
};

type DefaultRoute = {
  label: string;
  href: string;
  newTab?: boolean;
  items?: DefaultRouteItem[];
  appendix?: DefaultRouteItem[];
};

export const DEFAULT_ROUTES: DefaultRoute[] = [
  {
    label: 'Base App',
    href: 'https://base.app',
    newTab: true,
  },
  {
    label: 'Base Build',
    href: '/build',
    items: [
      {
        icon: 'code',
        label: 'Base Build',
        href: '/build',
      },
      {
        icon: 'dashboard',
        label: 'Dashboard',
        href: 'https://base.dev/',
        newTab: true,
      },
      {
        icon: 'rocket',
        label: 'Mini Apps',
        href: '/build/mini-apps',
      },
      {
        icon: 'docs',
        label: 'Spindl',
        href: 'https://spindl.xyz/',
        newTab: true,
      },
    ],
    appendix: [
      { label: 'Docs', href: 'https://docs.base.org/', newTab: true },
      { label: 'Status Page', href: 'https://status.base.org/', newTab: true },
      { label: 'Block Explorer', href: 'https://basescan.org/', newTab: true },
      { label: 'GitHub', href: 'https://github.com/base', newTab: true },
      { label: 'Engineering Blog', href: 'https://www.base.dev/blog', newTab: true },
      { label: 'Base Stats', href: '/stats', newTab: true },
      { label: 'Bug Bounty', href: 'https://hackerone.com/coinbase', newTab: true },
    ],
  },
  {
    label: 'Base Pay',
    href: '/pay',
  },
  {
    label: 'Community',
    href: '/community',
    items: [
      {
        icon: 'book',
        label: 'Resources',
        href: '/resources',
      },
      {
        icon: 'rocket',
        label: 'Batches',
        href: 'https://www.basebatches.xyz/',
        newTab: true,
      },
      {
        icon: 'briefcase',
        label: 'Events',
        href: 'https://luma.com/BaseEvents',
        newTab: true,
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
    items: [
      {
        icon: 'rocket',
        label: 'Vision',
        href: '/about/vision',
      },
      {
        icon: 'media',
        label: 'Brand Kit',
        href: 'https://base.org/brand',
      },
      {
        icon: 'openBook',
        label: 'Blog',
        href: 'https://blog.base.org',
        newTab: true,
      },
      {
        icon: 'briefcaseAlt',
        label: 'Jobs',
        href: '/jobs',
      },
      {
        icon: 'docs',
        label: 'Base App Help',
        href: 'https://help.coinbase.com/en/base',
        newTab: true,
      },
      {
        icon: 'questionCircle',
        label: 'Base App FAQs',
        href: '/about/faqs',
      },
    ],
  },
];

export const APP_LINKS = [
  {
    label: 'Sign up',
    href: '/sign-up',
  },
  {
    label: 'Coinbase Wallet',
    href: '/wallet',
  },
  {
    label: 'Coinbase Wallet',
    href: '/wallet-2',
  },
  {
    label: 'Phantom',
    href: '/phantom',
  },
  {
    label: 'Rabby',
    href: '/rabby',
  },
  {
    label: 'Trust Wallet',
    href: '/trust-wallet',
  },
];
