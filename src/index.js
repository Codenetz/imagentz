import Resource from './image/resource';
import Manipulator from './manipulators/manipulator';
import CachePath from './cache/path';
import CacheExists from './cache/exists';
import ChangeExtension from './file/changeExtension';
import { Process, Save } from './manipulators/processor';
import SaveConfig from './manipulators/saveConfig';
import Concat from './file/concat';

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
    this._manipulators.push(cb(new Manipulator()));
    return this;
  };

  _getResource = async () => {
    let resource = null;

    try {
      resource = await this._resource;
    } catch (e) {
      this.resource(this._config.fallback);
      resource = await this._resource;
    }

    return resource;
  };

  output = () => {
    return new Promise(async resolve => {
      let resource = await this._getResource();
      let images = [];

      this._manipulators.forEach(manipulator => {
        /** Creates cache pathname */
        const cachePathName = CachePath(
          ChangeExtension(this._resource_path, manipulator.getFormat()),
          [manipulator]
        );

        /** Full pathname of cache path */
        const fullCachePath = Concat([this._config.output_dir, cachePathName]);

        if (CacheExists(fullCachePath)) {
          images.push({
            path: cachePathName,
            manipulator
          });
          return;
        }

        const processedResource = Process(resource, manipulator);
        Save(processedResource, new SaveConfig().local(fullCachePath));

        images.push({
          path: cachePathName,
          manipulator
        });
      });

      return resolve(this);
    });
  };
}
