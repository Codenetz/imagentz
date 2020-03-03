const redis = require('redis');

export default config => {
  return {
    config,
    client: redis.createClient(config.config)
  };
};
