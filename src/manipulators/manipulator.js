import * as IMAGE_FORMATS from './../constants/extensions';

export default class {
  constructor() {
    this._quality = null;
    this._format_options = {};
    this._resize = null;
    this._format = IMAGE_FORMATS.JPEG;
  }

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

  getResize = () => this._resize;
  getQuality = () => this._quality;
  getFormat = () => this._format;
  getFormatOptions = () => this._format_options;
}
