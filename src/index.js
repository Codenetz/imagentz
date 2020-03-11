import '@babel/polyfill';
import crypto from 'crypto';
import Manipulator from './manipulators/manipulator';
import CachePath from './cache/path';
import ChangeExtension from './file/changeExtension';
import Process from './manipulators/processor';
import Concat from './file/concat';
import {
  client as RedisClient,
  fetch as RedisFetch,
  save as RedisSave
} from './redis/index';
import { saveFS, resource as Resource, getSize } from './image';
import { save as saveS3, client as AWSClient } from './aws';

export default class Index {
  constructor(config) {
    this._manipulators = [];
    this._resource_path = null;
    this._resource_buffer = null;
    this._resource_cache_key = null;

    /** Randomly generates a cache key */
    this.resourceCacheKey(
      Date.now() + '-' + Math.floor(Math.random() * Math.floor(99999999))
    );

    this._config = Object.assign(
      {
        output: [],
        fallback: null
      },
      config
    );
  }

  resourceBuffer = buffer => {
    this._resource_buffer = buffer;
    return this;
  };

  resourcePath = path => {
    this._resource_path = path;
    return this;
  };

  resourceCacheKey = key => {
    this._resource_cache_key = crypto
      .createHash('sha1')
      .update(key)
      .digest('hex');
    return this;
  };

  useRedis = (prefix, config) => {
    this._config = {
      ...this._config,
      redis: {
        prefix,
        config
      }
    };
    return this;
  };

  isRedisEnabled = () => {
    return Boolean(this._config.redis);
  };

  getRedisClient = () => {
    return RedisClient(this._config.redis);
  };

  useS3 = config => {
    this._config = { ...this._config, aws: config };
    return this;
  };

  getAWSClient = () => {
    return AWSClient(this._config.aws);
  };

  isS3Enabled = () => {
    return Boolean(this._config.aws);
  };

  addManipulator = cb => {
    this._manipulators.push(cb(new Manipulator()));
    return this;
  };

  getResource = async () => {
    if (this._resource_buffer) {
      return this._resource_buffer;
    }

    let resource = await Resource(this._resource_path);

    if (resource === null) {
      this.resourcePath(this._config.fallback);
      resource = await Resource(this._resource_path);
    }

    if (resource === null) {
      throw new Error('Fallback image is not found');
    }

    return resource;
  };

  output = () => {
    return new Promise(async resolve => {
      let resource = await this.getResource(),
        images = {};

      const s3Client = this.isS3Enabled() ? this.getAWSClient() : null,
        redisClient = this.isRedisEnabled() ? this.getRedisClient() : null;

      for (const manipulator of this._manipulators) {
        /** Creates cache pathname */
        const cachePathName = CachePath(
          this._resource_cache_key + '.' + manipulator.getFormat(),
          [manipulator]
        );

        /** Full pathname of cache path */
        const fullCachePath = Concat([this._config.output_dir, cachePathName]);

        /** Get image props from redis */
        if (this.isRedisEnabled()) {
          const imageFromRedis = await RedisFetch(redisClient, fullCachePath);
          if (imageFromRedis) {
            Object.assign(images, imageFromRedis);
            continue;
          }
        }

        const processedResource = Process(resource, manipulator);
        const processedResourceBuffer = await processedResource.toBuffer();

        this.isS3Enabled()
          ? await saveS3(
            s3Client,
            this._config.aws,
            fullCachePath,
            manipulator.getMime(),
            processedResourceBuffer
          )
          : await saveFS(processedResource, fullCachePath);

        const image = {
          [manipulator.getKey()]: {
            path: cachePathName,
            size: getSize(processedResourceBuffer)
          }
        };

        if (this.isRedisEnabled()) {
          await RedisSave(redisClient, fullCachePath, image);
        }

        Object.assign(images, image);
      }

      return resolve(images);
    });
  };
}
