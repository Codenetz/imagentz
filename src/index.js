import Resource from './image/resource';

export default class {
  resource = path => {
    this._resource = Resource(path);
    return this;
  };

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

  useCache = config => {
    return this;
  };

  useS3 = config => {
    return this;
  };

  output = () => {
    return new Promise(resolve => {
      Promise.all([this._resource]).then(([resource]) => {
        console.log('resource', resource);
        return resolve(this);
      });
    });
  };
}
