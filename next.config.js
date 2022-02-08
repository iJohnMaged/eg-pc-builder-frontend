module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
    });
    return config;
  },
  images: {
    domains: [
      "www.egprices.com",
      "maximumhardware.store",
      "www.compuartstore.com",
      "www.sigma-computer.com",
      "cdn.elbadrgroupeg.store",
      "highendstore.net",
    ],
  },
};
