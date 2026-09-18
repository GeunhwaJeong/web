export const nodeEnv = process.env.NODE_ENV;
export const docsUrl = process.env.DOCS_URL ?? 'https://docs.haneulfoundation.org';
export const bridgeUrl = process.env.BRIDGE_URL ?? 'https://haneulfoundation.org';
export const greenhouseApiUrl =
  process.env.GREENHOUSE_HTTPS ?? 'https://boards-api.greenhouse.io/v1';
export const mainnetLaunchBlogPostURL =
  process.env.MAINNET_LAUNCH_BLOG_POST_URL ?? 'https://haneulfoundation.org';
export const mainnetLaunchFlag = process.env.MAINNET_LAUNCH_FLAG ?? 'false';
export const isDevelopment = nodeEnv === 'development';
