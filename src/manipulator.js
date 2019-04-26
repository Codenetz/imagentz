export default class {
  constructor(resource_key) {
    this._key = resource_key;
    this._quality = null;
    this._transparent = null;
    this._resize = null;
  }

  quality = value => {
    this._quality = value;
    return this;
  };

  transparent = value => {
    this._transparent = value;
    return this;
  };

  resize = (width, height) => {
    this._resize = {
      width,
      height
    };
    return this;
  };
}
