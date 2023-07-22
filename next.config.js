// eslint-disable-next-line no-undef
module.exports = {
  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // home to swap page redirect
      {
        source: '/',
        destination: '/swap',
        permanent: true,
      },
    ];
  },
};
