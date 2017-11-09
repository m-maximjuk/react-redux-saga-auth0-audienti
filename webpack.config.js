/* eslint no-console: "off" */
const dotenv = require('dotenv');
const webpackConfigs = require('./config/webpack');

const defaultConfig = 'dev';

module.exports = configName => {
  // If there was no configuration given, assume default
  const requestedConfig = configName || defaultConfig;

  // Return a new instance of the webpack config
  // or the default one if it cannot be found.

  let LoadedConfig = defaultConfig;

  if (webpackConfigs[requestedConfig] !== undefined) {
    LoadedConfig = webpackConfigs[requestedConfig];
  } else {
    console.warn(`
      Provided environment "${configName}" was not found.
      Please use one of the following ones:
      ${Object.keys(webpackConfigs).join(' ')}
    `);
  }

  const loadedInstance = new LoadedConfig();

  // Load the environment variables
  if (loadedInstance.env === 'production') {
    dotenv.config({ path: '.env.prod' });
  }
  dotenv.load();

  // Set the global environment
  process.env.NODE_ENV = loadedInstance.env;

  return loadedInstance.config;
};
