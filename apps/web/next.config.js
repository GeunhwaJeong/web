const MillionLint = require('@million/lint');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProdEnv = process.env.NODE_ENV === 'production';

// Can't import this from apps/web/src/utils/images.ts for some reason
const allowedImageRemoteDomains = ['zku9gdedgba48lmr.public.blob.vercel-storage.com'];

const baseConfig = {
  // Enable advanced features
  compiler: {
    reactRemoveProperties: true,
    removeConsole: isProdEnv,
    styledComponents: true,
  },

  // Always enable compression
  compress: true,

  // We have our own linting infrastructure, so avoid Next's
  eslint: {
    ignoreDuringBuilds: true,
  },

  // This conflicts with how we use project refs and aliases
  typescript: {
    ignoreBuildErrors: true,
  },

  // Do not broadcast that we're using Next
  poweredByHeader: false,

  // Generate source maps for production builds
  productionBrowserSourceMaps: false,

  // Enable strict mode in development
  reactStrictMode: !isProdEnv,
};

function extendBaseConfig(customConfig = {}, plugins = []) {
  const defaultConfig = {
    ...baseConfig,
    ...customConfig,
    webpack: (webpack, options) => {
      if (customConfig.webpack) {
        return customConfig.webpack(webpack, options);
      }

      return webpack;
    },
  };

  return plugins.reduce((acc, plugin) => plugin(acc), defaultConfig);
}

// csp headers
const isLocalDevelopment = process.env.NODE_ENV === 'development';
const isE2ETest = process.env.E2E_TEST === 'true';
const greenhouseDomains = 'https://boards.greenhouse.io https://boards-api.greenhouse.io';

const contentSecurityPolicy = {
  'default-src': [
    "'self'",
    "'unsafe-inline'", // NextJS requires 'unsafe-inline'
    "'wasm-unsafe-eval'", // wasm requires 'unsafe-eval'
    isLocalDevelopment ? "'unsafe-eval'" : '',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com/',
  ],
  'worker-src': ["'self'", 'blob:'],
  'connect-src': [
    "'self'",
    'blob:',
    'https://blob.vercel-storage.com', // Vercel File storage
    'https://zku9gdedgba48lmr.public.blob.vercel-storage.com', // Vercel File storage
    greenhouseDomains,
    isLocalDevelopment ? 'ws://localhost:3000/' : '',
    isLocalDevelopment ? 'http://localhost:3000/' : '',
    'https://translate.googleapis.com', // Let user translate our website
    'https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.33.0/dist/dotlottie-player.wasm', // lottie player
    'https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.31.1/dist/dotlottie-player.wasm', // lottie player
    'https://unpkg.com/@lottiefiles/dotlottie-web@0.31.1/dist/dotlottie-player.wasm', // lottie player
    'https://unpkg.com/@lottiefiles/dotlottie-web@0.33.0/dist/dotlottie-player.wasm', // lottie player
  ],
  'frame-src': ["'self'"],
  'frame-ancestors': ["'self'"],
  'form-action': ["'self'"],
  'img-src': [
    "'self'",
    'blob:',
    'data:',
    'https://haneul.io',
    'https://*.haneul.io',
    'https://res.cloudinary.com',
  ],
};

const cspObjectToString = Object.entries(contentSecurityPolicy).reduce((acc, [key, value]) => {
  return `${acc}${key} ${value.join(' ')};`;
}, '');

const securityHeaders = [
  {
    key: 'cache-control',
    value: 'no-cache',
  },
  {
    key: 'content-security-policy',
    value: cspObjectToString,
  },
  {
    key: 'cross-origin-opener-policy',
    value: 'same-origin-allow-popups',
  },
  {
    key: 'referrer-policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'strict-transport-security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'x-content-type-options',
    value: 'nosniff',
  },
  {
    key: 'x-frame-options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'x-xss-protection',
    value: '1; mode=block',
  },
];

const millionEnabled = process.env.MILLION_LINT === 'true';

module.exports = MillionLint.next({
  enabled: millionEnabled,
  rsc: true,
})(
  extendBaseConfig(
    {
      transpilePackages: ['base-ui'],
      i18n: {
        locales: ['en'],
        defaultLocale: 'en',
      },
      webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        config.module.rules.push({
          test: /\.webm/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name][hash].[ext]',
                outputPath: 'static/assets/webm/',
                publicPath: '/_next/static/assets/webm/',
              },
            },
          ],
        });
        config.module.rules.push({
          test: /\.mp4$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name][hash].[ext]',
                outputPath: 'static/assets/mp4/',
                publicPath: '/_next/static/assets/mp4/',
              },
            },
          ],
        });
        config.module.rules.push({
          test: /\.gltf/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name][hash].[ext]',
                outputPath: 'static/assets/gltf/',
                publicPath: '/_next/static/assets/gltf/',
              },
            },
          ],
        });
        config.module.rules.push({
          test: /\.glb/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name][hash].[ext]',
                outputPath: 'static/assets/glb/',
                publicPath: '/_next/static/assets/glb/',
              },
            },
          ],
        });

        config.externals.push('pino-pretty');
        config.experiments = { ...config.experiments, asyncWebAssembly: true };

        return config;
      },
      images: {
        remotePatterns: allowedImageRemoteDomains.map((hostname) => {
          return {
            protocol: 'https',
            hostname,
          };
        }),
      },
      async headers() {
        if (millionEnabled) {
          return [];
        }

        return [
          {
            source: '/:path*',
            basePath: false,
            headers: securityHeaders,
          },
        ];
      },
      async rewrites() {
        return [];
      },
      async redirects() {
        return [
          {
            source: '/builders',
            destination: '/build',
            permanent: true,
          },
          {
            source: '/careers',
            destination: '/jobs',
            permanent: true,
          },
          {
            source: '/buildersummer',
            destination: '/onchainsummer',
            permanent: true,
          },
          {
            source: '/onchainsummer',
            destination: '/build',
            permanent: true,
          },
          {
            source: '/getstarted',
            destination: '/build',
            permanent: true,
          },
          {
            source: '/build/minikit',
            destination: '/build/mini-apps',
            permanent: true,
          },
          {
            source: '/builders/minikit',
            destination: '/build/mini-apps',
            permanent: true,
          },
          {
            source: '/builders/:path',
            destination: '/build/:path',
            permanent: true,
          },
          {
            source: '/500',
            destination: '/',
            permanent: false,
          },
        ];
      },
    },
    [withBundleAnalyzer],
  ),
);
