import isRemote from 'is-remote';
import sharp from 'sharp';
import getBufferRemote from './getBufferRemote';
import getBufferLocal from './getBufferLocal';

export default async path => {
  if (await isRemote(path)) {
    return sharp(await getBufferRemote(path));
  }

  return sharp(getBufferLocal(path));
};
