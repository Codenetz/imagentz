import '@babel/polyfill';
import Resource from './image/resource';
import Manipulator from './manipulators/manipulator';
import CachePath from './cache/path';
import CacheExists from './cache/exists';
import ChangeExtension from './file/changeExtension';
import { Process, Save } from './manipulators/processor';
import SaveConfig from './manipulators/saveConfig';
import getSize from './image/getSize';
import Concat from './file/concat';

export default class Index {
  constructor(config) {
    this._manipulators = [];
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
    return this;
  };

  useCache = config => {
    return this;
  };

  useS3 = config => {
    return this;
  };

  addManipulator = cb => {
    this._manipulators.push(cb(new Manipulator()));
    return this;
  };

  _getResource = async () => {
    try {
      return await Resource(this._resource_path);
    } catch (e) {
      try {
        this.resource(this._config.fallback);
        return await Resource(this._resource_path);
      } catch (e) {
        throw new Error('Fallback image is not found');
      }
    }
  };

  output = () => {
    return new Promise(async resolve => {
      let resource = await this._getResource();
      let images = {};

      for (const manipulator of this._manipulators) {
        /** Creates cache pathname */
        const cachePathName = CachePath(
          ChangeExtension(this._resource_path, manipulator.getFormat()),
          [manipulator]
        );

        /** Full pathname of cache path */
        const fullCachePath = Concat([this._config.output_dir, cachePathName]);

        if (CacheExists(fullCachePath)) {
          /** TODO Cache results */

          Object.assign(images, {
            [manipulator.getKey()]: {
              path: cachePathName,
              size: getSize(fullCachePath)
            }
          });
          continue;
        }

        const processedResource = Process(resource, manipulator);
        await Save(processedResource, new SaveConfig().local(fullCachePath));

        Object.assign(images, {
          [manipulator.getKey()]: {
            path: cachePathName,
            size: getSize(fullCachePath)
          }
        });
      }

      return resolve(images);
    });
  };
}
