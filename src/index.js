import Resource from './image/resource';
import Manipulator from './manipulator';
import CachePath from './cache/path';

export default class Index {
  constructor() {
    this._manipulators = [];
    this._resource = null;
    this._resource_path = null;
  }

  resource = path => {
    this._resource_path = path;
    this._resource = Resource(path);
    return this;
  };

  useCache = config => {
    return this;
  };

  useS3 = config => {
    return this;
  };

  addManipulator = cb => {
    this._manipulators.push(cb(new Manipulator(this._resource_path)));
    return this;
  };

  output = () => {
    return new Promise(resolve => {
      Promise.all([this._resource]).then(([resource]) => {
        this._manipulators.forEach(manipulator => {
          const cachePathName = CachePath(this._resource_path, [manipulator]);

          /** TODO
           *
           * - Check if cache exists
           * - Create sharp object
           * - Use manipulator options to process image
           * - Save cache local/s3 or both
           * - Catch exception if original file is not found and use fallback
           */

          console.log(resource, cachePathName, manipulator);
        });

        return resolve(this);
      });
    });
  };
}
