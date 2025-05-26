const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Customize the config here if needed
config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    invariant: require.resolve('invariant'),
  },
  assetExts: [...config.resolver.assetExts, 'png', 'jpg', 'jpeg', 'gif'],
};

module.exports = config; 