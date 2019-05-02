export default class {
  constructor() {
    this.config = {
      s3: {
        key: null,
        bucket: null
      },
      local: {
        path: null
      }
    };
  }

  s3 = (key, bucket) => {
    this.config.s3.key = key;
    this.config.s3.bucket = bucket;
    return this;
  };

  isS3Enabled() {
    return this.config.s3.key !== null && this.config.s3.bucket !== null;
  }

  isLocalEnabled() {
    return this.config.local.path !== null;
  }

  local = path => {
    this.config.local.path = path;
    return this;
  };

  getLocal = () => {
    return this.config.local;
  };
}
