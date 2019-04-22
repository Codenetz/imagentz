import * as extensions from './constants/extensions';

export default class {
  static isSupported(ext) {
    return Boolean(this._get(ext));
  }
  static getValid(ext, defaultExtension = extensions.JPEG) {
    return this.isSupported(ext) ? this._get(ext) : defaultExtension;
  }

  static _get(ext) {
    return extensions[ext.toUpperCase()];
  }
}
