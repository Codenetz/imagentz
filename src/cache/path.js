import crypto from 'crypto';
import extensions from '../extensions';

export default (filename, options = []) => {
  if (typeof filename !== 'string')
    throw TypeError('Filename must be a string');

  const signature = JSON.stringify(options);
  const cache_hash = crypto
    .createHash('sha1')
    .update(filename + signature)
    .digest('hex');

  const extension = extensions.getValid(filename.split('.').pop());

  let path = [];
  for (let i = 0; i < 5; i++) {
    path.push(cache_hash.charAt(i));
  }

  return '/cache/' + path.join('/') + '/' + cache_hash + '.' + extension;
};
