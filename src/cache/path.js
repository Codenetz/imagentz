import crypto from 'crypto';
import extensions from '../extensions';

export default (filename, options = []) => {
  if (typeof filename !== 'string')
    throw TypeError('Filename must be a string');

  const signature = JSON.stringify(options);
  const cacheHash = crypto
    .createHash('sha1')
    .update(filename + signature)
    .digest('hex');

  const extension = extensions.getValid(filename.split('.').pop());

  let path = [];
  for (let i = 0; i < 5; i++) {
    path.push(cacheHash.charAt(i));
  }

  return path.join('/') + '/' + cacheHash + '.' + extension;
};
