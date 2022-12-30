/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['@recipes/ui']);

const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
