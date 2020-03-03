export default class {
  constructor() {
    this.config = {
      local: {
        path: null
      }
    };
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
