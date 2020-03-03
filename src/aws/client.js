const AWS = require('aws-sdk');

export default config => {
  const { accessKeyId, secretAccessKey, region } = config;

  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region
  });
  return AWS;
};
