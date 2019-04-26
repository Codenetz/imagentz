import Resource from './image/resource';
import Manipulator from './manipulator';
import CachePath from './cache/path';
import CacheExists from './cache/exists';
import sharp from 'sharp';
import mkdirp from 'mkdirp';
import path from 'path';

export default class Index {
  constructor(config) {
    this._manipulators = [];
    this._resource = null;
    this._resource_path = null;
    this._config = Object.assign(
      {
        output: [],
        fallback: null
      },
      config
    );
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
        let images = [];

        this._manipulators.forEach(manipulator => {
          const cachePathName = CachePath(this._resource_path, [manipulator]);
          const fullCachePath = String(
            this._config.output_dir + cachePathName
          ).replace(/\/\//g, '/');

          /** Creates cache folders */
          mkdirp.sync(path.dirname(fullCachePath));

          /** TODO
           *
           * - Check if cache exists
           * - Create sharp object
           * - Use manipulator options to process image
           * - Save cache local/s3 or both
           * - Catch exception if original file is not found and use fallback
           */

          if (CacheExists(fullCachePath)) {
            images.push({
              path: cachePathName,
              manipulator
            });
            return;
          }

          /** Saves local file */
          sharp(resource)
            .toFile(fullCachePath);

          images.push({
            path: cachePathName,
            manipulator
          });

          console.log(resource, cachePathName, manipulator);
        });

        return resolve(this);
      });
    });
  };
}
