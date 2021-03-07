var path = require("path");

module.exports = {
  webpackFinal: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@components': path.resolve(__dirname, "../src"),
        "@types": path.resolve(__dirname, "../../../types")
      },
    },
  }),
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
};
