import * as IMAGE_FORMATS from './../constants/extensions';

export default class {
  constructor() {
    this._key = null;
    this._quality = null;
    this._format_options = {};
    this._resize = null;
    this._format = IMAGE_FORMATS.JPEG;
  }

  key = value => {
    this._key = value;
    return this;
  };

  quality = value => {
    this._quality = value;
    return this;
  };

  formatOptions = options => {
    this._format_options = options;
    return this;
  };

  resize = options => {
    this._resize = options;
    return this;
  };

  useWEBP = () => {
    return this.format(IMAGE_FORMATS.WEBP);
  };

  usePNG = () => {
    return this.format(IMAGE_FORMATS.PNG);
  };

  useJPEG = () => {
    return this.format(IMAGE_FORMATS.JPEG);
  };

  format = format => {
    if (Object.values(IMAGE_FORMATS).indexOf(format) < 0) {
      throw new Error('Unsupported format');
    }

    this._format = format;
    return this;
  };

  getMime = () => 'image/' + this.getFormat();
  getKey = () => this._key;
  getResize = () => this._resize;
  getQuality = () => this._quality;
  getFormat = () => this._format;
  getFormatOptions = () => this._format_options;
}
