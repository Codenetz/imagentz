import isRemote from 'is-remote';
import sharp from 'sharp';
import getBuffer from './getBuffer';

export default async path => {
  if (await isRemote(path)) {
    return sharp(await getBuffer(path));
  }

  return null;
};
