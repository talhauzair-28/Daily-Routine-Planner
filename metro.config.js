const { getDefaultConfig } = require('expo/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = getDefaultConfig(__dirname);

// Add custom alias support
config.resolver.alias = {
  '@': './src',
};

// Add source extensions
config.resolver.sourceExts.push('cjs');

module.exports = config;