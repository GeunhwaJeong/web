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
  disabled?: boolean;
  items?: DefaultRouteItem[];
  appendix?: DefaultRouteItem[];
};

export const DEFAULT_ROUTES: DefaultRoute[] = [
  {
    label: 'Haneul App',
    href: '/app',
    disabled: true,
  },
  {
    label: 'Haneul Build',
    href: '/build',
    items: [
      {
        icon: 'code',
        label: 'Haneul Build',
        href: '/build',
      },
      {
        icon: 'rocket',
        label: 'Mini Apps',
        href: '/build/mini-apps',
      },
    ],
    appendix: [
      { label: 'Docs', href: 'https://docs.haneulfoundation.org/', newTab: true },
      { label: 'GitHub', href: 'https://github.com/GeunhwaJeong/haneul', newTab: true },
    ],
  },
  {
    label: 'Haneul Pay',
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
    ],
  },
];

